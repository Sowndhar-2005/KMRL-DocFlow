// Entry Point - Re-exports & Boots Server
export * from './config/index.js';
export * from './errors/index.js';
export * from './repositories/documentRepository.js';
export * from './services/aiService.js';
export * from './services/auditService.js';
export * from './services/documentService.js';
export * from './services/searchService.js';
export * from './services/analyticsService.js';
export { createApp } from './app.js';

import './server.js';
