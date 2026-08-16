import test from 'node:test';
import assert from 'node:assert';
import { aiService } from '../services/aiService.js';

test('Deduplication Engine - TF-IDF Cosine Similarity', async (t) => {
  await t.test('returns 100% similarity for identical texts', () => {
    const text = 'KMRL safety circular regarding track maintenance at Muttom Depot';
    const score = aiService.calculateCosineSimilarity(text, text);
    assert.strictEqual(score, 100);
  });

  await t.test('returns 0% for completely disjoint texts', () => {
    const text1 = 'marine boat battery charging infrastructure';
    const text2 = 'farebox accounting discrepancy audit report';
    const score = aiService.calculateCosineSimilarity(text1, text2);
    assert.strictEqual(score, 0);
  });

  await t.test('returns high similarity (>80%) for paraphrased circulars', () => {
    const orig = 'Deep cleaning shall be carried out at all 25 stations between 01:00 hrs and 04:30 hrs. Escalator comb plates must be sanitized daily.';
    const duplicate = 'Deep cleaning shall be carried out at all 25 stations between 01:00 hrs and 04:30 hrs. Escalator comb plates must be sanitized daily. Extra citrus fragrance added.';
    const score = aiService.calculateCosineSimilarity(orig, duplicate);
    assert.ok(score >= 80, `Expected score >= 80, got ${score}`);
  });

  await t.test('handles empty and null inputs safely', () => {
    assert.strictEqual(aiService.calculateCosineSimilarity('', ''), 0);
    assert.strictEqual(aiService.calculateCosineSimilarity(null, 'text'), 0);
    assert.strictEqual(aiService.calculateCosineSimilarity('text', null), 0);
  });
});
