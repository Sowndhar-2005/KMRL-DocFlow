import { AppError } from '../errors/index.js';
import { config } from '../config/index.js';

export function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to Express default handler
  if (res.headersSent) {
    return next(err);
  }

  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : (err.statusCode || 500);
  const errorCode = isAppError ? err.errorCode : 'INTERNAL_SERVER_ERROR';
  const message = isAppError ? err.message : (statusCode === 500 && config.env === 'production' ? 'An unexpected internal error occurred' : err.message || 'Internal Server Error');
  const details = isAppError ? err.details : null;

  // Log error with context
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[ERROR] [${req.id || 'NO-ID'}] ${req.method} ${req.originalUrl}:`, {
      statusCode,
      errorCode,
      message: err.message,
      stack: err.stack,
      details
    });
  }

  const responseBody = {
    success: false,
    error: {
      code: errorCode,
      message: message,
      ...(details ? { details } : {}),
      ...(config.env !== 'production' && statusCode === 500 ? { stack: err.stack } : {}),
      timestamp: new Date().toISOString(),
      requestId: req.id
    }
  };

  res.status(statusCode).json(responseBody);
}

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl} - Endpoint does not exist`,
      timestamp: new Date().toISOString(),
      requestId: req.id
    }
  });
}
