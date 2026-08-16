import React from 'react';

export function SideBySideDiff() {
  return (
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        Side-by-Side Clause Comparison
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1rem', background: '#ffffff', border: '1px solid var(--border-medium)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--signal-green-text)', fontWeight: 800 }}>
              APPROVED ORIGINAL (DOC-2025-0145)
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Rev 1.1</span>
          </div>
          <pre style={{
            fontSize: '0.8rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            {`1. Deep cleaning shall be carried out at all 25 stations between 01:00 hrs and 04:30 hrs.
2. Escalator comb plates must be inspected and sanitized daily.
3. Bio-waste disposal to adhere to Kerala State Pollution Control Board guidelines.`}
          </pre>
        </div>

        <div className="glass-panel" style={{ padding: '1rem', background: '#ffffff', border: '1.5px solid var(--signal-amber-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--signal-amber-text)', fontWeight: 800 }}>
              NEW SUBMISSION (DOC-2025-0199)
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--signal-red-text)', fontWeight: 700 }}>94% Duplicate</span>
          </div>
          <pre style={{
            fontSize: '0.8rem',
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            background: 'var(--signal-amber-bg)',
            padding: '1rem',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            {`1. Deep cleaning shall be carried out at all 25 stations between 01:00 hrs and 04:30 hrs.
2. Escalator comb plates must be inspected and sanitized daily.
3. [ADDED]: Special eco-friendly citrus disinfectant to be used at Edappally and MG Road.`}
          </pre>
        </div>
      </div>
    </div>
  );
}
