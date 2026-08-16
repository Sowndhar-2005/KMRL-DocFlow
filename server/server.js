import { createApp } from './app.js';
import { config } from './config/index.js';
import { documentRepository } from './repositories/documentRepository.js';

async function startServer() {
  // Ensure database repository is initialized
  await documentRepository.init();

  const app = createApp();
  const server = app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`🚀 KMRL DocFlow Backend (Production Pattern Architecture)`);
    console.log(`📡 URL: http://localhost:${config.port}${config.apiPrefix}`);
    console.log(`⚡ Mode: ${config.env.toUpperCase()} | Port: ${config.port}`);
    console.log(`🛡️  Security Headers & Rate Limiting Enabled`);
    console.log(`📂 Uploads Directory: ${config.uploadsDir}`);
    console.log(`=======================================================`);
  });

  // Graceful Shutdown
  const gracefulShutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}. Initiating graceful shutdown...`);
    server.close(() => {
      console.log('✅ HTTP server closed. Flushing pending database operations.');
      process.exit(0);
    });

    // Force exit if shutdown hangs beyond 10 seconds
    setTimeout(() => {
      console.error('⚠️  Graceful shutdown timed out. Forcing termination.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Global uncaught exception and unhandled rejection guards
  process.on('uncaughtException', (err) => {
    console.error('💥 UNCAUGHT EXCEPTION:', err);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 UNHANDLED REJECTION at:', promise, 'reason:', reason);
  });

  return server;
}

startServer().catch(err => {
  console.error('Fatal error starting KMRL backend:', err);
  process.exit(1);
});
