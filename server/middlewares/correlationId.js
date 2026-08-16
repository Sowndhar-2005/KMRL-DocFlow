import crypto from 'crypto';

export function correlationId(req, res, next) {
  const reqId = req.headers['x-request-id'] || `kmrl-req-${crypto.randomUUID()}`;
  req.id = reqId;
  res.setHeader('X-Request-ID', reqId);
  next();
}
