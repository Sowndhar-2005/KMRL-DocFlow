import { documentRepository } from '../repositories/documentRepository.js';
import { BadRequestError } from '../errors/index.js';

export class DatabaseAdminController {
  async getDatabaseStats(req, res) {
    const stats = await documentRepository.getEngine().getDatabaseObservabilityStats();
    res.json(stats);
  }

  async createBackup(req, res) {
    const label = req.body?.label || 'MANUAL';
    const snapshot = await documentRepository.getEngine().backupManager.createSnapshot(label);
    res.status(201).json({
      success: true,
      message: `Snapshot backup created successfully: ${snapshot.filename}`,
      backup: snapshot
    });
  }

  async listBackups(req, res) {
    const backups = await documentRepository.getEngine().backupManager.listSnapshots();
    res.json({ backups });
  }

  async restoreBackup(req, res) {
    const { filename } = req.body;
    if (!filename) {
      throw new BadRequestError('Backup filename is required for restore.');
    }
    const result = await documentRepository.getEngine().backupManager.restoreSnapshot(filename);
    res.json(result);
  }

  async verifyIntegrity(req, res) {
    const auditResult = documentRepository.getEngine().verifyIntegrity();
    res.json(auditResult);
  }

  async explainQuery(req, res) {
    const filters = req.body?.filters || {};
    const plan = documentRepository.getEngine().queryOptimizer.planQuery('documents', filters);
    res.json({ explainPlan: plan });
  }
}

export const databaseAdminController = new DatabaseAdminController();
