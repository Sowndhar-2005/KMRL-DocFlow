import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ searchQuery, setSearchQuery, onSelectQuery }) {
  const suggestedQueries = [
    "What is the temporary speed restriction at Pier 412?",
    "Show Water Metro lithium battery tender estimate",
    "Pink line Phase 2 land acquisition sanction amount",
    "Alstom TS-07 warranty defect liability status",
    "CAG audit query farebox variance amount"
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div className="search-bar-wrap" style={{ marginBottom: '0.85rem' }}>
        <Search size={20} className="search-icon-left" />
        <input
          type="text"
          className="search-input-field"
          placeholder="Ask KMRL AI or search across 10,000+ indexed documents, drawings, Malayalam GOs & CMRS circulars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Suggested Queries Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
          Suggested Queries:
        </span>
        {suggestedQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuery(q)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer'
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
