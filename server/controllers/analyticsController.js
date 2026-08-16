import { analyticsService } from '../services/analyticsService.js';
import { auditService } from '../services/auditService.js';

export class AnalyticsController {
  async getApiIndex(req, res) {
    res.json({
      name: 'KMRL DocFlow Intelligence API',
      version: '2.5.0-SIH25080',
      organization: 'Kochi Metro Rail Limited (KMRL), Government of Kerala',
      status: 'OPERATIONAL',
      uptimeSeconds: Math.floor(process.uptime()),
      endpoints: {
        root: 'GET /api',
        health: 'GET /api/health',
        stats: 'GET /api/stats',
        documents: {
          list: 'GET /api/documents (supports ?dept=&priority=&status=&q=)',
          getById: 'GET /api/documents/:id',
          upload: 'POST /api/documents/upload (multipart or json rawText)',
          approve: 'POST /api/documents/:id/approve',
          reroute: 'POST /api/documents/:id/reroute',
          escalate: 'POST /api/documents/:id/escalate',
          resetSeed: 'POST /api/documents/seed/reset'
        },
        search: {
          ragSemantic: 'POST /api/search (body: { query: string })'
        },
        database: {
          observabilityStats: 'GET /api/database/stats',
          createBackup: 'POST /api/database/backup',
          listBackups: 'GET /api/database/backups',
          restoreBackup: 'POST /api/database/restore (body: { filename: string })',
          integrityCheck: 'GET /api/database/integrity',
          explainQuery: 'POST /api/database/explain (body: { filters: object })'
        },
        auditLogs: 'GET /api/audit-logs',
        departments: 'GET /api/departments',
        seed: 'POST /api/seed'
      },
      timestamp: new Date().toISOString()
    });
  }

  async getHealth(req, res) {
    res.json({
      status: 'ok',
      system: 'KMRL DocFlow Intelligence Backend',
      version: '2.5.0-SIH25080',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  }

  async getStats(req, res) {
    const stats = await analyticsService.getOperationalStats();
    res.json(stats);
  }

  async getAuditLogs(req, res) {
    const auditLogs = await auditService.getAuditLogs();
    res.json({ auditLogs });
  }

  async getDepartments(req, res) {
    const departments = await analyticsService.getDepartments();
    res.json({ departments });
  }
}

export const analyticsController = new AnalyticsController();
