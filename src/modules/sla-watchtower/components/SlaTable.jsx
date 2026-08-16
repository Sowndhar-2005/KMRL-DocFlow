import React from 'react';
import { Bell } from 'lucide-react';

export function SlaTable({ documents, onEscalateAlert }) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Doc Ref</th>
            <th>Document Subject</th>
            <th>Department</th>
            <th>Statutory Mandate</th>
            <th>Compliance Deadline</th>
            <th>Days Left</th>
            <th>Escalation Level</th>
            <th>Simulate Dispatch</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td className="mono" style={{ color: 'var(--rail-steel-900)', fontWeight: 800 }}>{doc.id}</td>
              <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{doc.title}</td>
              <td>{doc.dept}</td>
              <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.sanctionRef}</td>
              <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{doc.deadline}</td>
              <td>
                <span style={{
                  fontWeight: 800,
                  color: (doc.daysLeft || 0) <= 5 ? 'var(--signal-red-text)' : (doc.daysLeft || 0) <= 15 ? 'var(--signal-amber-text)' : 'var(--signal-green-text)'
                }}>
                  {doc.daysLeft || 0} Days
                </span>
              </td>
              <td>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: (doc.daysLeft || 0) <= 5 ? 'var(--signal-red-bg)' : 'var(--kmrl-teal-light)',
                  border: `1px solid ${(doc.daysLeft || 0) <= 5 ? 'var(--signal-red-border)' : 'var(--kmrl-teal-border)'}`,
                  color: (doc.daysLeft || 0) <= 5 ? 'var(--signal-red-text)' : 'var(--kmrl-teal-text)'
                }}>
                  {(doc.daysLeft || 0) <= 5 ? 'L3 Director Alert' : 'L1 Routine Track'}
                </span>
              </td>
              <td>
                <button
                  className="btn-secondary"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                  onClick={() => onEscalateAlert(doc.id)}
                >
                  <Bell size={12} /> Send Alert
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
