import test from 'node:test';
import assert from 'node:assert';
import { DatabaseEngine } from '../database/engine.js';
import { SchemaValidator } from '../database/schema/validator.js';
import { ValidationError } from '../errors/index.js';

const mockSeed = {
  documents: [
    {
      id: "DOC-2025-1001",
      title: "Test Safety Circular",
      type: "Safety Directive",
      dept: "Safety & Operations",
      priority: "P1",
      status: "Under Review",
      date: "2025-02-14",
      deadline: "2025-02-21",
      daysLeft: 7,
      amount: "₹1,00,000",
      sanctionRef: "KMRL/TEST/01",
      issuingAuth: "Safety Directorate",
      assignee: "Shri. Ramesh Menon",
      workflowStep: 1,
      language: "English",
      executiveSummary: "Ultrasonic testing of metro track joints.",
      complianceRisk: "Critical",
      createdAt: new Date().toISOString()
    }
  ],
  departments: [
    { id: "dept-1", name: "Safety & Operations", head: "Shri. Ramesh Menon", email: "safety@kmrl.co.in", activeDocs: 1 }
  ],
  auditLogs: [],
  slaEscalations: []
};

test('KMRL Database Engine & Schema Tests', async (t) => {
  let engine;

  t.before(async () => {
    engine = new DatabaseEngine({ inMemory: true });
    await engine.init(mockSeed, true);
  });

  await t.test('SchemaValidator enforces required fields and enum values', () => {
    // Missing required field 'title'
    assert.throws(() => {
      SchemaValidator.validate('documents', { id: 'DOC-2025-9999', type: 'Safety Directive' }, false);
    }, ValidationError);

    // Invalid enum priority
    assert.throws(() => {
      SchemaValidator.validate('documents', {
        id: 'DOC-2025-9999',
        title: 'Valid Title',
        type: 'Safety Directive',
        dept: 'Safety & Operations',
        priority: 'INVALID_PRIORITY',
        status: 'Under Review',
        date: '2025-02-14',
        deadline: '2025-02-21',
        daysLeft: 7,
        sanctionRef: 'REF',
        issuingAuth: 'Auth',
        assignee: 'Assignee',
        workflowStep: 1,
        language: 'English',
        executiveSummary: 'Summary',
        complianceRisk: 'Low',
        createdAt: new Date().toISOString()
      }, false);
    }, ValidationError);
  });

  await t.test('IndexEngine supports Composite (dept, priority) fast lookups', async () => {
    const docs = await engine.queryDocuments({ dept: 'Safety & Operations', priority: 'P1' });
    assert.strictEqual(docs.length, 1);
    assert.strictEqual(docs[0].id, 'DOC-2025-1001');
  });

  await t.test('IndexEngine Inverted Full-Text search finds document tokens', async () => {
    const docs = await engine.queryDocuments({ q: 'ultrasonic' });
    assert.strictEqual(docs.length, 1);
    assert.strictEqual(docs[0].id, 'DOC-2025-1001');
  });

  await t.test('TransactionManager commits atomic mutations', async () => {
    await engine.transactionManager.runTransaction(async (tx) => {
      tx.insert('documents', {
        id: "DOC-2025-1002",
        title: "Committed Transaction Circular",
        type: "Operational Circular",
        dept: "Station Operations",
        priority: "P3",
        status: "Ingested",
        date: "2025-02-15",
        deadline: "2025-02-28",
        daysLeft: 13,
        sanctionRef: "KMRL/OPS/02",
        issuingAuth: "OCC",
        assignee: "Station Director",
        workflowStep: 1,
        language: "English",
        executiveSummary: "Transactional housekeeping memo.",
        complianceRisk: "Low",
        createdAt: new Date().toISOString()
      });
    });

    const doc = await engine.getDocumentById('DOC-2025-1002');
    assert.ok(doc, 'Document should exist after commit');
    assert.strictEqual(doc.title, 'Committed Transaction Circular');
  });

  await t.test('TransactionManager rolls back staged mutations on failure without side-effects', async () => {
    const beforeCount = (await engine.queryDocuments()).length;

    try {
      await engine.transactionManager.runTransaction(async (tx) => {
        tx.insert('documents', {
          id: "DOC-2025-FAIL",
          title: "This should roll back"
        });
        throw new Error('Simulated failure during business logic');
      });
    } catch (e) {
      assert.strictEqual(e.message, 'Simulated failure during business logic');
    }

    const afterCount = (await engine.queryDocuments()).length;
    assert.strictEqual(afterCount, beforeCount, 'Record count should remain unchanged after rollback');
    const doc = await engine.getDocumentById('DOC-2025-FAIL');
    assert.strictEqual(doc, null, 'Rolled-back document should not exist in database');
  });
});
