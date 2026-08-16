import React from 'react';

export function WorkflowQueueTable({ documents, onSelectDoc, onApproveDoc }) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ minWidth: '130px' }}>Doc ID</th>
            <th style={{ minWidth: '240px' }}>Title</th>
            <th style={{ minWidth: '170px' }}>Dept & Lead</th>
            <th style={{ minWidth: '150px' }}>Workflow Progress</th>
            <th style={{ minWidth: '140px' }}>Digital Signature</th>
            <th style={{ minWidth: '100px' }}>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id} onClick={() => onSelectDoc(doc.id)} style={{ cursor: 'pointer' }}>
              <td className="mono" style={{ color: 'var(--rail-steel-900)', fontWeight: 800, whiteSpace: 'nowrap' }}>{doc.id}</td>
              <td style={{ minWidth: '240px', maxWidth: '340px' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {doc.title}
                </div>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{doc.dept}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.assignee}</div>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '120px' }}>
                  <div style={{ flex: 1, height: '6px', background: 'var(--border-medium)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${((doc.workflowStep || 3) / 5) * 100}%`, height: '100%', background: doc.workflowStep === 5 ? 'var(--signal-green)' : 'var(--kmrl-emerald)' }}></div>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: doc.workflowStep === 5 ? 'var(--signal-green-text)' : 'var(--kmrl-emerald-text)' }}>
                    {doc.workflowStep || 3}/5
                  </span>
                </div>
              </td>
              <td className="mono" style={{ fontSize: '0.7rem', color: doc.signedBy ? 'var(--signal-green-text)' : 'var(--text-muted)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {doc.signedBy ? `Signed by ${doc.signedBy.split(' ')[0]}` : 'Awaiting Sign'}
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                {doc.status !== 'Approved' ? (
                  <button
                    className="btn-emerald"
                    style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onApproveDoc(doc.id);
                    }}
                  >
                    Approve
                  </button>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: 'var(--signal-green-text)', fontWeight: 800 }}>✓ Sealed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
