import test from 'node:test';
import assert from 'node:assert';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { DatabaseEngine } from '../database/engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DB_FILE = path.join(__dirname, '..', 'data', 'kmrl_test_backup_db.json');

const mockSeed = {
  documents: [
    {
      id: "DOC-2025-2001",
      title: "Snapshot Backup Test Document",
      type: "Safety Directive",
      dept: "Safety & Operations",
      priority: "P1",
      status: "Under Review",
      date: "2025-02-14",
      deadline: "2025-02-21",
      daysLeft: 7,
      amount: "₹5,00,000",
      sanctionRef: "KMRL/SNAP/01",
      issuingAuth: "Safety Cell",
      assignee: "Shri. Ramesh Menon",
      workflowStep: 1,
      language: "English",
      executiveSummary: "Snapshot testing payload.",
      complianceRisk: "Medium",
      createdAt: new Date().toISOString()
    }
  ],
  departments: [],
  auditLogs: [],
  slaEscalations: []
};

test('KMRL Automated Backup, Integrity & PITR Restore Tests', async (t) => {
  let engine;

  t.before(async () => {
    if (fs.existsSync(TEST_DB_FILE)) fs.unlinkSync(TEST_DB_FILE);
    engine = new DatabaseEngine({ dbFile: TEST_DB_FILE });
    await engine.init(mockSeed, true);
  });

  t.after(async () => {
    if (fs.existsSync(TEST_DB_FILE)) fs.unlinkSync(TEST_DB_FILE);
  });

  await t.test('BackupManager creates snapshot backup with valid SHA-256 checksum', async () => {
    const snapshot = await engine.backupManager.createSnapshot('TEST_SNAPSHOT');
    assert.ok(snapshot.filename.startsWith('kmrl_backup_TEST_SNAPSHOT_'));
    assert.strictEqual(snapshot.checksum.length, 64, 'Checksum should be 64-char hex SHA-256');
    assert.strictEqual(snapshot.documentsCount, 1);
  });

  await t.test('BackupManager lists created snapshots', async () => {
    const snapshots = await engine.backupManager.listSnapshots();
    assert.ok(snapshots.length >= 1);
    assert.ok(snapshots[0].filename);
  });

  await t.test('Point-In-Time Recovery (PITR) restores state accurately', async () => {
    // 1. Take snapshot of state with 1 document
    const snapshot = await engine.backupManager.createSnapshot('PRE_MUTATION');

    // 2. Mutate database state (insert another document)
    await engine.insertDocument({
      id: "DOC-2025-2002",
      title: "Temporary Document",
      type: "Operational Circular",
      dept: "Station Operations",
      priority: "P3",
      status: "Ingested",
      date: "2025-02-15",
      deadline: "2025-02-28",
      daysLeft: 13,
      sanctionRef: "KMRL/TMP/02",
      issuingAuth: "OCC",
      assignee: "Station Director",
      workflowStep: 1,
      language: "English",
      executiveSummary: "Temporary document to be wiped by restore.",
      complianceRisk: "Low"
    });

    let currentDocs = await engine.queryDocuments();
    assert.strictEqual(currentDocs.length, 2);

    // 3. Restore from previous snapshot
    const restoreResult = await engine.backupManager.restoreSnapshot(snapshot.filename);
    assert.strictEqual(restoreResult.success, true);
    assert.strictEqual(restoreResult.documentsRestored, 1);

    // 4. Verify state rolled back to snapshot state
    currentDocs = await engine.queryDocuments();
    assert.strictEqual(currentDocs.length, 1);
    assert.strictEqual(currentDocs[0].id, 'DOC-2025-2001');
  });

  await t.test('DatabaseEngine returns observability metrics', async () => {
    const stats = await engine.getDatabaseObservabilityStats();
    assert.ok(stats.engine.includes('KMRL Enterprise Storage Engine'));
    assert.ok(stats.tables.documents >= 1);
    assert.ok(stats.indexes.invertedSearchTermsCount > 0);
    assert.strictEqual(stats.integrity.status, 'HEALTHY');
  });
});
