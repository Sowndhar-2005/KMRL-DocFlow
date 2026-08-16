export function requestLogger(req, res, next) {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    const status = res.statusCode;
    
    // Status color logging
    const statusFormatted = status >= 500 ? `\x1b[31m${status}\x1b[0m`
      : status >= 400 ? `\x1b[33m${status}\x1b[0m`
      : status >= 300 ? `\x1b[36m${status}\x1b[0m`
      : `\x1b[32m${status}\x1b[0m`;

    if (process.env.NODE_ENV !== 'test') {
      console.log(`[${new Date().toISOString()}] [${req.id}] ${req.method} ${req.originalUrl} ${statusFormatted} - ${timeInMs}ms`);
    }
  });

  next();
}
