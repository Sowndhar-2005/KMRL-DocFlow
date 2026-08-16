import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController.js';
import { documentController } from '../controllers/documentController.js';
import { asyncHandler } from '../middlewares/index.js';

const router = Router();

// API Catalog / Index at GET /api
router.get('/', asyncHandler((req, res) => analyticsController.getApiIndex(req, res)));
router.get('/health', asyncHandler((req, res) => analyticsController.getHealth(req, res)));
router.get('/stats', asyncHandler((req, res) => analyticsController.getStats(req, res)));
router.get('/audit-logs', asyncHandler((req, res) => analyticsController.getAuditLogs(req, res)));
router.get('/departments', asyncHandler((req, res) => analyticsController.getDepartments(req, res)));
router.post('/seed', asyncHandler((req, res) => documentController.resetSeed(req, res)));

export default router;
