import { config } from '../config/index.js';

const ipRequestMap = new Map();

export function rateLimiter(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  const windowMs = config.rateLimit.windowMs;
  const maxRequests = config.rateLimit.maxRequests;

  let requestLog = ipRequestMap.get(ip);
  if (!requestLog) {
    requestLog = [];
    ipRequestMap.set(ip, requestLog);
  }

  // Filter requests within the window
  const windowStart = now - windowMs;
  const validRequests = requestLog.filter(timestamp => timestamp > windowStart);
  
  if (validRequests.length >= maxRequests) {
    res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
    return res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests, please slow down and try again shortly.',
        retryAfterSeconds: Math.ceil(windowMs / 1000)
      }
    });
  }

  validRequests.push(now);
  ipRequestMap.set(ip, validRequests);
  
  // Clean up old entries periodically
  if (ipRequestMap.size > 5000) {
    for (const [key, timestamps] of ipRequestMap.entries()) {
      if (timestamps.every(t => t <= windowStart)) {
        ipRequestMap.delete(key);
      }
    }
  }

  next();
}
