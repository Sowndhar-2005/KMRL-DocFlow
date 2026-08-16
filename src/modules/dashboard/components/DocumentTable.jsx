import React from 'react';
import { Anchor, Building2, Brain } from 'lucide-react';

export function DocumentTable({ documents, selectedDocId, onSelectDoc, onOpenSummary }) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ minWidth: '130px' }}>Doc Ref / ID</th>
            <th style={{ minWidth: '240px' }}>Subject / Title</th>
            <th style={{ minWidth: '160px' }}>Department</th>
            <th style={{ minWidth: '80px' }}>Priority</th>
            <th style={{ minWidth: '110px' }}>Deadline</th>
            <th style={{ minWidth: '100px' }}>Status</th>
            <th style={{ minWidth: '95px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.slice(0, 8).map(doc => (
            <tr
              key={doc.id}
              style={{
                cursor: 'pointer',
                background: selectedDocId === doc.id ? 'var(--bg-secondary)' : '#ffffff'
              }}
              onClick={() => onSelectDoc(doc.id)}
            >
              <td className="mono" style={{ fontWeight: 800, color: 'var(--rail-steel-900)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                {doc.id}
              </td>
              <td style={{ minWidth: '240px', maxWidth: '340px' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {doc.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {doc.issuingAuth}
                </div>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <span className="badge-dept">
                  {doc.dept?.includes('Water') ? <Anchor size={12} color="#0284c7" /> : <Building2 size={12} color="#059669" />}
                  {doc.dept}
                </span>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <span className={doc.priority === 'P1' ? 'badge-p1' : doc.priority === 'P2' ? 'badge-p2' : 'badge-p3'}>
                  {doc.priority}
                </span>
              </td>
              <td style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                <div style={{ color: (doc.daysLeft || 0) <= 5 ? 'var(--signal-red-text)' : 'var(--text-primary)', fontWeight: 700 }}>
                  {doc.deadline}
                </div>
                <div style={{ fontSize: '0.68rem', color: (doc.daysLeft || 0) <= 5 ? 'var(--signal-red)' : 'var(--text-muted)' }}>
                  {(doc.daysLeft || 0) > 0 ? `${doc.daysLeft} days left` : 'Archived'}
                </div>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: doc.status === 'Approved' ? 'var(--signal-green-text)' : doc.status === 'Under Review' ? 'var(--signal-amber-text)' : 'var(--kmrl-teal-text)'
                }}>
                  {doc.status}
                </span>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDoc(doc.id);
                    onOpenSummary();
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.72rem' }}
                >
                  <Brain size={12} /> AI Brief
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
