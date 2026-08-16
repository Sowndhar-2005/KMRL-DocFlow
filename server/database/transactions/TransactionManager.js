import crypto from 'crypto';

export class Transaction {
  constructor(engine, transactionId) {
    this.engine = engine;
    this.id = transactionId;
    this.status = 'ACTIVE'; // ACTIVE | COMMITTED | ROLLED_BACK
    this.snapshot = JSON.parse(JSON.stringify(engine.getState()));
    this.workingState = JSON.parse(JSON.stringify(this.snapshot));
    this.operationsCount = 0;
  }

  insert(tableName, record) {
    if (this.status !== 'ACTIVE') throw new Error(`Transaction ${this.id} is already ${this.status}`);
    if (!this.workingState[tableName]) this.workingState[tableName] = [];
    this.workingState[tableName].unshift(record);
    this.operationsCount++;
    return record;
  }

  update(tableName, predicate, updates) {
    if (this.status !== 'ACTIVE') throw new Error(`Transaction ${this.id} is already ${this.status}`);
    if (!this.workingState[tableName]) return null;
    const idx = this.workingState[tableName].findIndex(predicate);
    if (idx !== -1) {
      this.workingState[tableName][idx] = {
        ...this.workingState[tableName][idx],
        ...updates
      };
      this.operationsCount++;
      return this.workingState[tableName][idx];
    }
    return null;
  }

  async commit() {
    if (this.status !== 'ACTIVE') throw new Error(`Transaction ${this.id} is already ${this.status}`);
    this.status = 'COMMITTED';
    await this.engine.applyCommittedState(this.workingState);
    return { transactionId: this.id, status: 'COMMITTED', operationsCount: this.operationsCount };
  }

  rollback() {
    if (this.status !== 'ACTIVE') throw new Error(`Transaction ${this.id} is already ${this.status}`);
    this.status = 'ROLLED_BACK';
    this.workingState = null;
    return { transactionId: this.id, status: 'ROLLED_BACK' };
  }
}

export class TransactionManager {
  constructor(engine) {
    this.engine = engine;
    this.activeTransactions = new Map();
  }

  beginTransaction() {
    const txId = `TX-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;
    const tx = new Transaction(this.engine, txId);
    this.activeTransactions.set(txId, tx);
    return tx;
  }

  async runTransaction(callback) {
    const tx = this.beginTransaction();
    try {
      const result = await callback(tx);
      await tx.commit();
      this.activeTransactions.delete(tx.id);
      return result;
    } catch (err) {
      tx.rollback();
      this.activeTransactions.delete(tx.id);
      throw err;
    }
  }

  getActiveTransactionsCount() {
    return this.activeTransactions.size;
  }
}
