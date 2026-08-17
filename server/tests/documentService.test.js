import test from 'node:test';
import assert from 'node:assert';
import { aiService } from '../services/aiService.js';
import { auditService } from '../services/auditService.js';

test('AI Intelligence & Triage Engine', async (t) => {
  await t.test('classifies CMRS safety directives into Safety & Operations with P1 priority', () => {
    const text = 'Urgent CMRS safety notice regarding emergency temporary speed restriction at Pier 412';
    const result = aiService.predictDepartmentAndAssignee(text);
    assert.strictEqual(result.dept, 'Safety & Operations');
    assert.strictEqual(result.priority, 'P1');
    assert.ok(result.assignee.includes('Ramesh Menon'));
  });

  await t.test('classifies Water Metro battery tenders into Water Metro Division', () => {
    const text = 'Procurement of 450kWh LTO Lithium marine boat battery modules for Water Metro';
    const result = aiService.predictDepartmentAndAssignee(text);
    assert.strictEqual(result.dept, 'Water Metro Division');
    assert.strictEqual(result.priority, 'P2');
    assert.ok(result.assignee.includes('Anjali Nair'));
  });

  await t.test('detects Malayalam script accurately', () => {
    const malayalam = 'കൊച്ചി മെട്രോ റെയിൽ പദ്ധതി - ഘട്ടം 2 പിങ്ക് ലൈൻ';
    const english = 'Kochi Metro Rail Project - Phase 2 Pink Line';
    assert.strictEqual(aiService.isMalayalamText(malayalam), true);
    assert.strictEqual(aiService.isMalayalamText(english), false);
  });

  await t.test('extracts entities: Sanction Reference and Amounts', () => {
    const sample = 'GO(MS) No. 42/2025/TRANS Dated 10-Feb-2025. Sanctions deposit of ₹18,50,00,000 to Tahsildar at Muttom Depot under LARR Act 2013.';
    const entities = aiService.extractEntities(sample);
    assert.ok(entities['Sanction Reference'], 'Should extract reference');
    assert.ok(entities['Sanctioned Amount'], 'Should extract sanctioned amount');
    assert.ok(entities['Operational Location'], 'Should extract location');
  });

  await t.test('generates valid cryptographic SHA-256 HMAC digital signatures', () => {
    const sig1 = auditService.generateDigitalSignature('DOC-2025-0891', 'Managing Director (MD)', '2025-02-14T09:00:00.000Z');
    assert.ok(sig1.startsWith('KMRL-SHA256-'));
    assert.strictEqual(sig1.length, 28);
  });
});
