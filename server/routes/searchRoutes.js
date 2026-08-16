import { Router } from 'express';
import { searchController } from '../controllers/searchController.js';
import { asyncHandler } from '../middlewares/index.js';

const router = Router();

router.post('/', asyncHandler((req, res) => searchController.searchDocuments(req, res)));

export default router;
