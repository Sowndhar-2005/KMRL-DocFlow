import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_ROOT = path.resolve(__dirname, '..');

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  apiPrefix: '/api',
  uploadsDir: path.join(SERVER_ROOT, 'uploads'),
  dataDir: path.join(SERVER_ROOT, 'data'),
  dbFile: path.join(SERVER_ROOT, 'data', 'kmrl_db.json'),
  maxUploadSizeBytes: 50 * 1024 * 1024, // 50MB
  allowedUploadMimeTypes: [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ],
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200 // Max requests per window per IP
  },
  crypto: {
    secretKey: process.env.KMRL_SECRET_KEY || 'kmrl-sih25080-secure-digital-seal-secret'
  }
};
