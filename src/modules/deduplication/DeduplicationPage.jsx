import React from 'react';
import { Share2 } from 'lucide-react';
import { RedundancyAlert } from './components/RedundancyAlert';
import { SideBySideDiff } from './components/SideBySideDiff';

export function DeduplicationPage({ duplicateCount, onMergeDuplicate }) {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 size={20} color="#7e22ce" /> Deduplication Engine & Smart Visual Diff
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Cosine similarity detection identifies redundant paperwork and compares version modifications side-by-side
          </p>
        </div>
        <span className="badge-p1">
          ⚠️ {duplicateCount || 1} Duplicate Circulars Flagged in Database
        </span>
      </div>

      <RedundancyAlert onMergeDuplicate={onMergeDuplicate} />
      <SideBySideDiff />
    </div>
  );
}
