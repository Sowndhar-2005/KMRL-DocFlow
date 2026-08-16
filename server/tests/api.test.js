import test from 'node:test';
import assert from 'node:assert';
import http from 'http';
import { createApp } from '../app.js';
import { documentRepository } from '../repositories/documentRepository.js';

test('KMRL REST API Integration Tests', async (t) => {
  let server;
  let baseUrl;

  t.before(async () => {
    await documentRepository.init();
    const app = createApp();
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    baseUrl = `http://localhost:${port}/api`;
  });

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  await t.test('GET /api returns API Discovery Index catalog', async () => {
    const res = await fetch(`${baseUrl}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.name, 'KMRL DocFlow Intelligence API');
    assert.strictEqual(data.status, 'OPERATIONAL');
    assert.ok(data.endpoints.documents);
    assert.ok(data.endpoints.database);
  });

  await t.test('GET /api/health returns status 200 and system details', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.system, 'KMRL DocFlow Intelligence Backend');
  });

  await t.test('GET /api/stats returns real-time metrics', async () => {
    const res = await fetch(`${baseUrl}/stats`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.totalDocuments >= 5);
    assert.strictEqual(data.triageAccuracy, '98.6%');
  });

  await t.test('GET /api/database/stats returns storage engine metrics and integrity', async () => {
    const res = await fetch(`${baseUrl}/database/stats`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.engine.includes('KMRL Enterprise Storage Engine'));
    assert.strictEqual(data.integrity.status, 'HEALTHY');
    assert.ok(data.indexes.invertedSearchTermsCount > 0);
  });

  await t.test('GET /api/documents returns array of documents', async () => {
    const res = await fetch(`${baseUrl}/documents`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.documents));
    assert.ok(data.documents.length >= 5);
  });

  await t.test('POST /api/search returns synthesized RAG answer and citations', async () => {
    const res = await fetch(`${baseUrl}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'CMRS Pier 412 speed restriction' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.answer.length > 0);
    assert.ok(Array.isArray(data.citations));
    assert.ok(data.citations.length > 0);
  });

  await t.test('POST /api/documents/:id/approve updates document status and seals signature', async () => {
    const res = await fetch(`${baseUrl}/documents/DOC-2025-0891/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userRole: 'Chief Safety Officer' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.document.status, 'Approved');
    assert.ok(data.document.digitalSignature.startsWith('KMRL-SHA256-'));
  });

  await t.test('GET /api/non-existent-route returns uniform 404 error structure', async () => {
    const res = await fetch(`${baseUrl}/non-existent-endpoint`);
    assert.strictEqual(res.status, 404);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.strictEqual(data.error.code, 'ROUTE_NOT_FOUND');
  });
});
