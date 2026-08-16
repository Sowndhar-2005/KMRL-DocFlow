import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { documentController } from '../controllers/documentController.js';
import { asyncHandler, validateParam } from '../middlewares/index.js';
import { config } from '../config/index.js';
import { BadRequestError } from '../errors/index.js';

const router = Router();

// Ensure upload directory exists
if (!fs.existsSync(config.uploadsDir)) {
  fs.mkdirSync(config.uploadsDir, { recursive: true });
}

// Multer storage with sanitized filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, config.uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `KMRL-${Date.now()}-${sanitizedBase.substring(0, 30)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.txt', '.docx', '.doc'];
  
  if (allowedExtensions.includes(ext) || config.allowedUploadMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`File type '${ext}' is not supported. Allowed formats: PDF, PNG, JPG, DOCX, TXT`), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: config.maxUploadSizeBytes },
  fileFilter
});

// Document Endpoints
router.get('/', asyncHandler((req, res) => documentController.listDocuments(req, res)));
router.get('/:id', validateParam('id'), asyncHandler((req, res) => documentController.getDocumentById(req, res)));
router.post('/upload', upload.single('file'), asyncHandler((req, res) => documentController.uploadDocument(req, res)));
router.post('/:id/approve', validateParam('id'), asyncHandler((req, res) => documentController.approveDocument(req, res)));
router.post('/:id/reroute', validateParam('id'), asyncHandler((req, res) => documentController.rerouteDocument(req, res)));
router.post('/:id/escalate', validateParam('id'), asyncHandler((req, res) => documentController.escalateDocument(req, res)));
router.post('/seed/reset', asyncHandler((req, res) => documentController.resetSeed(req, res)));

export default router;
