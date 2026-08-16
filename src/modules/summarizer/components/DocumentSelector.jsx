import React from 'react';

export function DocumentSelector({ documents, selectedDocId, onSelectDoc }) {
  return (
    <div className="glass-panel" style={{ padding: '1.2rem', maxHeight: '78vh', overflowY: 'auto' }}>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
        Select Document ({documents.length})
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {documents.map(doc => (
          <div
            key={doc.id}
            onClick={() => onSelectDoc(doc.id)}
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: selectedDocId === doc.id ? 'var(--bg-secondary)' : '#ffffff',
              border: selectedDocId === doc.id ? '1.5px solid var(--rail-steel-900)' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--rail-steel-900)', fontWeight: 800 }}>{doc.id}</span>
              <span className={doc.priority === 'P1' ? 'badge-p1' : 'badge-p2'}>{doc.priority}</span>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {doc.title}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{doc.dept}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
