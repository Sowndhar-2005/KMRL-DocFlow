import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

export function ScenarioBar({
  onRunScenario1,
  onRunScenario2,
  onRunScenario3,
  onRunScenario4,
  onResetDb
}) {
  return (
    <div className="glass-panel" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--rail-steel-900)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--kmrl-emerald-text)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            SIH25080 EVALUATOR CONSOLE
          </span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
            Kochi Metro Document Overload — 1-Click Live Test Scenarios
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={onRunScenario1}>
            <Sparkles size={13} color="#dc2626" /> Scenario 1: CMRS Safety Directive
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={onRunScenario2}>
            <Sparkles size={13} color="#059669" /> Scenario 2: Tamil Land Sanction GO
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={onRunScenario3}>
            <Sparkles size={13} color="#0284c7" /> Scenario 3: ₹4.2 Cr Battery Tender
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={onRunScenario4}>
            <Sparkles size={13} color="#d97706" /> Scenario 4: Deduplication Trigger
          </button>
          <button
            className="btn-danger"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            onClick={onResetDb}
          >
            <RefreshCw size={13} /> Reset Demo DB
          </button>
        </div>
      </div>
    </div>
  );
}
