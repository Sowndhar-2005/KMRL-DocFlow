import React from 'react';

export function RedundancyAlert({ onMergeDuplicate }) {
  return (
    <div style={{
      background: 'var(--signal-amber-bg)',
      border: '1px solid var(--signal-amber-border)',
      borderRadius: 'var(--radius-md)',
      padding: '1rem 1.25rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ fontWeight: 800, color: 'var(--signal-amber-text)', fontSize: '0.9rem' }}>
          94% Semantic Redundancy Detected: DOC-2025-0199 vs DOC-2025-0145
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
          Newly submitted Station Cleaning Circular contains 94% identical clauses to the already approved Master SOP.
        </div>
      </div>
      <button className="btn-emerald" onClick={onMergeDuplicate}>
        Merge & Archive Duplicate
      </button>
    </div>
  );
}
