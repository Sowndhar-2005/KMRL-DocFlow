import { Router } from 'express';
import { databaseAdminController } from '../controllers/databaseAdminController.js';
import { asyncHandler } from '../middlewares/index.js';

const router = Router();

router.get('/stats', asyncHandler((req, res) => databaseAdminController.getDatabaseStats(req, res)));
router.post('/backup', asyncHandler((req, res) => databaseAdminController.createBackup(req, res)));
router.get('/backups', asyncHandler((req, res) => databaseAdminController.listBackups(req, res)));
router.post('/restore', asyncHandler((req, res) => databaseAdminController.restoreBackup(req, res)));
router.get('/integrity', asyncHandler((req, res) => databaseAdminController.verifyIntegrity(req, res)));
router.post('/explain', asyncHandler((req, res) => databaseAdminController.explainQuery(req, res)));

export default router;
