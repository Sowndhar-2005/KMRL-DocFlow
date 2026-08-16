import React from 'react';
import { Brain } from 'lucide-react';

export function ExtractedEntitiesForm({ selectedDoc, onProceedToSummary }) {
  if (!selectedDoc || !selectedDoc.id) return null;

  return (
    <div className="glass-panel" style={{ padding: '1.4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={18} color="#059669" /> Extracted Knowledge Graph
        </h3>
        <span className="badge-dept">
          {selectedDoc.language || 'English'} OCR
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            Document Title / Subject
          </label>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {selectedDoc.title}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
              Sanction Reference
            </label>
            <div className="mono" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--rail-steel-900)', marginTop: '0.2rem' }}>
              {selectedDoc.sanctionRef || 'KMRL/NIL'}
            </div>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
              Financial Sanction
            </label>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--kmrl-emerald)', marginTop: '0.2rem' }}>
              {selectedDoc.amount || 'N/A'}
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            AI-Detected Named Entities
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
            {selectedDoc.extractedEntities && Object.entries(selectedDoc.extractedEntities).map(([k, v]) => (
              <div key={k} style={{
                background: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: '6px',
                padding: '0.3rem 0.6rem',
                fontSize: '0.75rem'
              }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{k}:</span> <strong style={{ color: 'var(--text-primary)' }}>{v}</strong>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            Automated Department Routing
          </label>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{selectedDoc.dept}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--kmrl-teal-text)', fontWeight: 600 }}>Assignee: {selectedDoc.assignee}</div>
            </div>
            <span style={{ background: 'var(--signal-green-bg)', border: '1px solid var(--signal-green-border)', color: 'var(--signal-green-text)', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Auto-Routed
            </span>
          </div>
        </div>

        <button
          className="btn-emerald"
          style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          onClick={onProceedToSummary}
        >
          <Brain size={16} /> Proceed to Contextual Summarizer
        </button>
      </div>
    </div>
  );
}
