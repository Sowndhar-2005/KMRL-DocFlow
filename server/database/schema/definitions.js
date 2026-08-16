// KMRL Relational Schema Definitions & Entity Models (SIH25080)

export const SCHEMAS = {
  documents: {
    tableName: 'documents',
    primaryKey: 'id',
    fields: {
      id: { type: 'string', required: true, pattern: /^DOC-\d{4}-\d{4}$/ },
      title: { type: 'string', required: true, minLength: 3 },
      type: { type: 'string', required: true, enum: ['Safety Directive', 'Procurement Tender', 'Government Order', 'Vendor Notice', 'Audit Query', 'Operational Circular'] },
      dept: { type: 'string', required: true },
      priority: { type: 'string', required: true, enum: ['P1', 'P2', 'P3'] },
      status: { type: 'string', required: true, enum: ['Ingested', 'Under Review', 'Routed', 'Approved', 'Escalated', 'Archived'] },
      date: { type: 'string', required: true },
      deadline: { type: 'string', required: true },
      daysLeft: { type: 'number', required: true },
      amount: { type: 'string', required: false, default: '₹0' },
      sanctionRef: { type: 'string', required: true },
      issuingAuth: { type: 'string', required: true },
      assignee: { type: 'string', required: true },
      workflowStep: { type: 'number', required: true, min: 1, max: 5, default: 1 },
      language: { type: 'string', required: true, enum: ['English', 'Malayalam', 'Bilingual'] },
      similarity: { type: 'number', required: false, default: 0 },
      duplicateOf: { type: 'string', required: false, default: null },
      executiveSummary: { type: 'string', required: true },
      complianceRisk: { type: 'string', required: true },
      ocrConfidence: { type: 'string', required: false, default: '98.5%' },
      ocrSnippet: { type: 'string', required: false },
      signedBy: { type: 'string', required: false, default: null },
      digitalSignature: { type: 'string', required: false, default: null },
      signedAt: { type: 'string', required: false, default: null },
      createdAt: { type: 'string', required: true },
      updatedAt: { type: 'string', required: false }
    }
  },

  departments: {
    tableName: 'departments',
    primaryKey: 'id',
    fields: {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true, unique: true },
      head: { type: 'string', required: true },
      email: { type: 'string', required: true, pattern: /.+@kmrl\.co\.in$/ },
      activeDocs: { type: 'number', required: false, default: 0 }
    }
  },

  action_items: {
    tableName: 'action_items',
    primaryKey: 'id',
    foreignKeys: {
      docId: { targetTable: 'documents', targetField: 'id', onDelete: 'CASCADE' }
    },
    fields: {
      id: { type: 'string', required: true },
      docId: { type: 'string', required: true },
      task: { type: 'string', required: true },
      assignee: { type: 'string', required: true },
      status: { type: 'string', required: true, enum: ['Pending', 'In Progress', 'Done'] },
      due: { type: 'string', required: true }
    }
  },

  audit_logs: {
    tableName: 'audit_logs',
    primaryKey: 'id',
    foreignKeys: {
      docId: { targetTable: 'documents', targetField: 'id', onDelete: 'SET_NULL' }
    },
    fields: {
      id: { type: 'string', required: true },
      docId: { type: 'string', required: false },
      userRole: { type: 'string', required: true },
      action: { type: 'string', required: true },
      signatureHash: { type: 'string', required: true },
      timestamp: { type: 'string', required: true },
      details: { type: 'string', required: true }
    }
  },

  sla_escalations: {
    tableName: 'sla_escalations',
    primaryKey: 'id',
    foreignKeys: {
      docId: { targetTable: 'documents', targetField: 'id', onDelete: 'CASCADE' }
    },
    fields: {
      id: { type: 'string', required: true },
      docId: { type: 'string', required: true },
      level: { type: 'string', required: true },
      alertType: { type: 'string', required: true },
      recipient: { type: 'string', required: true },
      sentAt: { type: 'string', required: true },
      status: { type: 'string', required: true, default: 'Dispatched' }
    }
  }
};
