import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { config } from '../config/index.js';
import { SchemaValidator } from './schema/validator.js';
import { IndexEngine } from './index/IndexEngine.js';
import { QueryOptimizer } from './index/QueryOptimizer.js';
import { TransactionManager } from './transactions/TransactionManager.js';
import { BackupManager } from './backup/BackupManager.js';

export class DatabaseEngine {
  constructor(options = {}) {
    this.dbFile = options.dbFile || config.dbFile;
    this.dataDir = options.dataDir || path.dirname(this.dbFile);
    this.inMemory = options.inMemory || false;
    this.state = null;
    this.isWriting = false;
    this.pendingWrite = false;

    this.indexEngine = new IndexEngine();
    this.queryOptimizer = new QueryOptimizer(this.indexEngine);
    this.transactionManager = new TransactionManager(this);
    this.backupManager = new BackupManager(this);
  }

  async init(seedData = null, forceSeed = false) {
    if (this.inMemory) {
      this.state = JSON.parse(JSON.stringify(seedData || { documents: [], departments: [], auditLogs: [], slaEscalations: [] }));
      this._rebuildAllIndexes();
      return;
    }

    await fsPromises.mkdir(this.dataDir, { recursive: true });
    try {
      if (!forceSeed && fs.existsSync(this.dbFile)) {
        const content = await fsPromises.readFile(this.dbFile, 'utf-8');
        this.state = JSON.parse(content);
      } else if (seedData) {
        this.state = JSON.parse(JSON.stringify(seedData));
        await this._persistAtomic();
      }
    } catch (err) {
      console.warn('[DatabaseEngine] Error reading DB file, fallback to seed:', err);
      if (seedData) {
        this.state = JSON.parse(JSON.stringify(seedData));
        await this._persistAtomic();
      }
    }

    this._rebuildAllIndexes();
    await this.backupManager.init();
  }

  _rebuildAllIndexes() {
    if (!this.state) return;
    for (const [table, records] of Object.entries(this.state)) {
      if (Array.isArray(records)) {
        this.indexEngine.buildIndexes(table, records);
      }
    }
  }

  async _persistAtomic() {
    if (this.inMemory) return;

    if (this.isWriting) {
      this.pendingWrite = true;
      return;
    }

    this.isWriting = true;
    try {
      const tempFile = `${this.dbFile}.tmp-${Date.now()}`;
      const payload = JSON.stringify(this.state, null, 2);
      await fsPromises.writeFile(tempFile, payload, 'utf-8');
      await fsPromises.rename(tempFile, this.dbFile);
    } catch (err) {
      console.error('[DatabaseEngine] Atomic persistence error:', err);
    } finally {
      this.isWriting = false;
      if (this.pendingWrite) {
        this.pendingWrite = false;
        await this._persistAtomic();
      }
    }
  }

  getState() {
    return this.state;
  }

  async applyCommittedState(newState) {
    this.state = JSON.parse(JSON.stringify(newState));
    this._rebuildAllIndexes();
    await this._persistAtomic();
  }

  /**
   * Optimized Document Query using IndexEngine
   */
  async queryDocuments(filters = {}) {
    const { dept, priority, status, q } = filters;
    let candidates = null;

    // 1. Inverted Search Index for text queries
    if (q && q.trim().length > 0) {
      const matchedIds = this.indexEngine.searchFullText(q);
      const matchedDocs = matchedIds.map(id => this.indexEngine.getByPrimaryKey('documents', id)).filter(Boolean);
      candidates = matchedDocs;
    }

    // 2. Composite Index for (dept, priority)
    if (!candidates && dept && dept !== 'All' && priority && priority !== 'All') {
      const matchedIds = this.indexEngine.findIdsByDeptAndPriority(dept, priority);
      if (matchedIds) {
        candidates = matchedIds.map(id => this.indexEngine.getByPrimaryKey('documents', id)).filter(Boolean);
      }
    }

    // Fallback: full table
    if (!candidates) {
      candidates = [...(this.state.documents || [])];
    }

    // Filter remaining constraints
    let result = candidates;
    if (dept && dept !== 'All') {
      result = result.filter(d => d.dept === dept);
    }
    if (priority && priority !== 'All') {
      result = result.filter(d => d.priority === priority);
    }
    if (status && status !== 'All') {
      result = result.filter(d => d.status === status);
    }

    return result;
  }

  async getDocumentById(id) {
    return this.indexEngine.getByPrimaryKey('documents', id) || null;
  }

  async insertDocument(doc) {
    const newDoc = {
      id: doc.id || `DOC-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      ...doc
    };

    // Schema Validation
    SchemaValidator.validate('documents', newDoc, false);

    if (!this.state.documents) this.state.documents = [];
    this.state.documents.unshift(newDoc);
    this._rebuildAllIndexes();
    await this._persistAtomic();
    return newDoc;
  }

  async updateDocument(id, updates) {
    const idx = this.state.documents.findIndex(d => d.id === id);
    if (idx === -1) return null;

    const merged = {
      ...this.state.documents[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Validate update
    SchemaValidator.validate('documents', merged, true);

    this.state.documents[idx] = merged;
    this._rebuildAllIndexes();
    await this._persistAtomic();
    return merged;
  }

  async getAuditLogs() {
    return [...(this.state.auditLogs || [])];
  }

  async insertAuditLog(log) {
    const newLog = {
      id: log.id || `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      ...log
    };

    SchemaValidator.validate('audit_logs', newLog, false);
    SchemaValidator.validateForeignKeys('audit_logs', newLog, this.state);

    if (!this.state.auditLogs) this.state.auditLogs = [];
    this.state.auditLogs.unshift(newLog);
    this._rebuildAllIndexes();
    await this._persistAtomic();
    return newLog;
  }

  async getDepartments() {
    return [...(this.state.departments || [])];
  }

  async insertEscalation(esc) {
    const escalation = {
      id: esc.id || `ESC-${Date.now().toString().slice(-4)}`,
      sentAt: new Date().toISOString(),
      status: 'Dispatched',
      ...esc
    };

    SchemaValidator.validate('sla_escalations', escalation, false);
    if (!this.state.slaEscalations) this.state.slaEscalations = [];
    this.state.slaEscalations.unshift(escalation);
    await this._persistAtomic();
    return escalation;
  }

  /**
   * Run Database Integrity Audit
   */
  verifyIntegrity() {
    const results = {
      status: 'HEALTHY',
      issues: [],
      tablesChecked: Object.keys(this.state || {}),
      totalRecords: 0
    };

    for (const [table, records] of Object.entries(this.state || {})) {
      if (Array.isArray(records)) {
        results.totalRecords += records.length;
        for (const r of records) {
          try {
            SchemaValidator.validateForeignKeys(table, r, this.state);
          } catch (e) {
            results.status = 'DEGRADED';
            results.issues.push(`Foreign key error in table ${table}: ${e.message}`);
          }
        }
      }
    }

    return results;
  }

  /**
   * Complete Database Observability Metrics
   */
  async getDatabaseObservabilityStats() {
    const indexStats = this.indexEngine.getStats();
    const snapshots = await this.backupManager.listSnapshots();
    const diskStat = fs.existsSync(this.dbFile) ? fs.statSync(this.dbFile) : { size: 0 };

    return {
      engine: 'KMRL Enterprise Storage Engine v3.0 (ACID Relational-Document)',
      uptimeSeconds: Math.floor(process.uptime()),
      databaseSizeBytes: diskStat.size,
      tables: {
        documents: this.state?.documents?.length || 0,
        departments: this.state?.departments?.length || 0,
        auditLogs: this.state?.auditLogs?.length || 0,
        slaEscalations: this.state?.slaEscalations?.length || 0
      },
      indexes: indexStats,
      transactions: {
        activeCount: this.transactionManager.getActiveTransactionsCount(),
        mode: 'SNAPSHOT_ISOLATION_ACID'
      },
      backups: {
        snapshotsAvailable: snapshots.length,
        latestBackup: snapshots[0] || null
      },
      integrity: this.verifyIntegrity()
    };
  }
}
