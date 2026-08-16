import { documentService } from '../services/documentService.js';

export class DocumentController {
  async listDocuments(req, res) {
    const filters = {
      dept: req.query.dept,
      priority: req.query.priority,
      status: req.query.status,
      q: req.query.q
    };
    const documents = await documentService.listDocuments(filters);
    res.json({ documents });
  }

  async getDocumentById(req, res) {
    const document = await documentService.getDocumentById(req.params.id);
    res.json({ document });
  }

  async uploadDocument(req, res) {
    const { title, rawText } = req.body;
    const file = req.file;

    const document = await documentService.processAndIngestDocument({
      title,
      rawText,
      file
    });

    res.status(201).json({
      success: true,
      document
    });
  }

  async approveDocument(req, res) {
    const { userRole } = req.body;
    const document = await documentService.approveDocument(req.params.id, userRole);
    res.json({
      success: true,
      document
    });
  }

  async rerouteDocument(req, res) {
    const { newDept, newAssignee, userRole } = req.body;
    const document = await documentService.rerouteDocument(
      req.params.id,
      newDept,
      newAssignee,
      userRole
    );
    res.json({
      success: true,
      document
    });
  }

  async escalateDocument(req, res) {
    const { level, alertType, recipient } = req.body;
    const escalation = await documentService.escalateDocument(
      req.params.id,
      level,
      alertType,
      recipient
    );
    res.json({
      success: true,
      escalation
    });
  }

  async resetSeed(req, res) {
    const seed = await documentService.resetSeed();
    res.json({
      success: true,
      message: 'Database reset to initial KMRL operational state',
      seed
    });
  }
}

export const documentController = new DocumentController();
