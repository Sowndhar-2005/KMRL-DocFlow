import React from 'react';

export function SearchResultsGrid({
  documents,
  searchDeptFilter,
  setSearchDeptFilter,
  onSelectDoc
}) {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Indexed KMRL Document Matches ({documents.length})
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select
            value={searchDeptFilter}
            onChange={(e) => setSearchDeptFilter(e.target.value)}
            style={{ background: 'var(--bg-secondary)', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-medium)', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, outline: 'none' }}
          >
            <option value="All">All Departments</option>
            <option value="Safety & Operations">Safety & Operations</option>
            <option value="Water Metro Division">Water Metro Division</option>
            <option value="Rolling Stock & Traction">Rolling Stock</option>
            <option value="Finance & Accounts">Finance & Accounts</option>
            <option value="Civil & Land Acquisition">Civil & Land</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {documents.map(doc => (
          <div
            key={doc.id}
            className="stat-card"
            style={{ padding: '1rem', cursor: 'pointer', '--card-accent': '#0284c7' }}
            onClick={() => onSelectDoc(doc.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--rail-steel-900)', fontWeight: 800 }}>{doc.id}</span>
              <span className={doc.priority === 'P1' ? 'badge-p1' : 'badge-p2'}>{doc.priority}</span>
            </div>
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.88rem', marginBottom: '0.4rem', lineHeight: 1.35 }}>
              {doc.title}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.6rem' }}>
              {doc.executiveSummary?.substring(0, 110)}...
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', fontSize: '0.72rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{doc.dept}</span>
              <span style={{ color: 'var(--signal-green-text)', fontWeight: 700 }}>Due: {doc.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
