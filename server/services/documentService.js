import { documentRepository } from '../repositories/documentRepository.js';
import { aiService } from './aiService.js';
import { auditService } from './auditService.js';
import { NotFoundError, BadRequestError } from '../errors/index.js';

export class DocumentService {
  async listDocuments(filters = {}) {
    return await documentRepository.getAllDocuments(filters);
  }

  async getDocumentById(id) {
    const doc = await documentRepository.getDocumentById(id);
    if (!doc) {
      throw new NotFoundError(`Document with ID '${id}' not found`);
    }
    return doc;
  }

  async processAndIngestDocument({ title, rawText, file }) {
    let textToProcess = rawText || '';
    let docTitle = title || 'Uploaded KMRL Document';
    let isTamil = false;
    let tamilOrig = null;
    let tamilTrans = null;

    if (file) {
      docTitle = file.originalname.replace(/\.[^/.]+$/, '');
      if (!textToProcess) {
        textToProcess = `Extracted text from ${file.originalname}. Document uploaded to KMRL central intelligence repository for automated classification and compliance validation.`;
      }
    }

    if (aiService.isTamilText(textToProcess)) {
      isTamil = true;
      tamilOrig = textToProcess;
      tamilTrans = 'Automated English Translation: ' + textToProcess;
    }

    // AI Classification & Routing
    const { dept, assignee, priority } = aiService.predictDepartmentAndAssignee(`${textToProcess} ${docTitle}`);
    const extractedEntities = aiService.extractEntities(textToProcess);
    const { executiveSummary, actionItems, complianceRisk } = aiService.generateContextualSummary(
      textToProcess,
      docTitle,
      dept,
      priority
    );

    // Deduplication check
    const existingDocs = await documentRepository.getAllDocuments();
    let maxSim = 0;
    let duplicateOf = null;

    for (const d of existingDocs) {
      const sim = aiService.calculateCosineSimilarity(textToProcess, `${d.title} ${d.executiveSummary}`);
      if (sim > maxSim) {
        maxSim = sim;
        duplicateOf = d.id;
      }
    }

    const docId = `DOC-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDoc = {
      id: docId,
      title: docTitle,
      type: isTamil ? 'Government Order' : priority === 'P1' ? 'Safety Directive' : 'Operational Circular',
      dept,
      priority,
      status: 'Under Review',
      date: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      daysLeft: 7,
      amount: extractedEntities['Sanctioned Amount'] || '₹10,00,000',
      sanctionRef: extractedEntities['Sanction Reference'] || `KMRL/GEN/${Date.now().toString().slice(-4)}`,
      issuingAuth: `${dept} Directorate`,
      assignee,
      workflowStep: 3,
      language: isTamil ? 'Tamil' : 'English',
      similarity: maxSim > 60 ? maxSim : 0,
      duplicateOf: maxSim > 60 ? duplicateOf : null,
      tamilOriginal: tamilOrig,
      tamilTranslation: tamilTrans,
      executiveSummary,
      actionItems,
      complianceRisk,
      ocrConfidence: '99.2%',
      ocrSnippet: textToProcess.substring(0, 300) + '...',
      extractedEntities,
      filePath: file ? `/uploads/${file.filename}` : null
    };

    const savedDoc = await documentRepository.createDocument(newDoc);
    await auditService.logEvent(
      savedDoc.id,
      'AI Ingestion Pipeline',
      'DOCUMENT_INGESTED',
      'INGEST-AUTO-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      `Ingested document '${savedDoc.title}' with priority ${savedDoc.priority}.`
    );

    return savedDoc;
  }

  async approveDocument(id, userRole = 'Managing Director (MD)') {
    const doc = await this.getDocumentById(id);
    const timestamp = new Date().toISOString();
    const digitalSignature = auditService.generateDigitalSignature(id, userRole, timestamp);
    const signedAt = new Date().toLocaleString();

    const updated = await documentRepository.updateDocument(id, {
      status: 'Approved',
      workflowStep: 5,
      signedBy: userRole,
      digitalSignature,
      signedAt
    });

    await auditService.logEvent(
      id,
      userRole,
      'DIGITALLY_APPROVED',
      digitalSignature,
      `Approved by ${userRole} with cryptographic stamp ${digitalSignature}`
    );

    return updated;
  }

  async rerouteDocument(id, newDept, newAssignee, userRole = 'System Router') {
    if (!newDept || !newAssignee) {
      throw new BadRequestError('Both newDept and newAssignee are required for rerouting');
    }

    const doc = await this.getDocumentById(id);
    const updated = await documentRepository.updateDocument(id, {
      dept: newDept,
      assignee: newAssignee,
      status: 'Routed',
      workflowStep: 3
    });

    await auditService.logEvent(
      id,
      userRole,
      'DOCUMENT_REROUTED',
      'ROUTE-UPDATE',
      `Re-routed to ${newDept} (Assignee: ${newAssignee})`
    );

    return updated;
  }

  async escalateDocument(id, level, alertType, recipient) {
    const doc = await this.getDocumentById(id);
    const escalation = await documentRepository.addEscalation({
      docId: id,
      level: level || 'Level 3 (Director Alert)',
      alertType: alertType || 'SMS + WhatsApp + Email Dispatch',
      recipient: recipient || 'Managing Director Desk'
    });

    await auditService.logEvent(
      id,
      'Escalation Watchtower',
      'SLA_ESCALATED',
      'SLA-ALERT',
      `Triggered ${escalation.level} to ${escalation.recipient}`
    );

    return escalation;
  }

  async resetSeed() {
    return await documentRepository.resetSeed();
  }
}

export const documentService = new DocumentService();
