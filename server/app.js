import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import {
  correlationId,
  requestLogger,
  rateLimiter,
  securityHeaders,
  errorHandler,
  notFoundHandler
} from './middlewares/index.js';
import apiRouter from './routes/index.js';
import { analyticsController } from './controllers/analyticsController.js';

export function createApp() {
  const app = express();

  // 1. Security & Hygiene Middlewares
  app.use(securityHeaders);
  app.use(cors());
  app.use(correlationId);
  app.use(rateLimiter);

  // 2. Request Logging & Body Parsing
  app.use(requestLogger);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 3. Static File Serving
  app.use('/uploads', express.static(config.uploadsDir));

  // Root redirect/handler for convenience
  app.get('/', (req, res) => analyticsController.getApiIndex(req, res));

  // 4. API Routes
  app.use(config.apiPrefix, apiRouter);

  // 5. 404 & Centralized Error Handler
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp();
