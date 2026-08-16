import React from 'react';
import { Lock, X } from 'lucide-react';

export function AuditLogsModal({ auditLogs, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <span className="badge-dept" style={{ color: 'var(--kmrl-emerald-text)', borderColor: 'var(--kmrl-emerald-border)' }}>
              <Lock size={12} /> SHA-256 Audit Trail
            </span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Cryptographic Non-Repudiation Event Log
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        <div className="data-table-wrapper" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Doc Ref</th>
                <th>Signatory / Persona</th>
                <th>Action</th>
                <th>Cryptographic Signature Hash</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, idx) => (
                <tr key={log.id || idx}>
                  <td className="mono" style={{ color: 'var(--kmrl-emerald-text)', fontSize: '0.75rem', fontWeight: 800 }}>{log.id}</td>
                  <td className="mono" style={{ color: 'var(--rail-steel-900)', fontSize: '0.75rem', fontWeight: 800 }}>{log.docId}</td>
                  <td style={{ color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 600 }}>{log.userRole}</td>
                  <td>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: log.action.includes('APPROVED') ? 'var(--signal-green-bg)' : 'var(--kmrl-teal-light)',
                      border: `1px solid ${log.action.includes('APPROVED') ? 'var(--signal-green-border)' : 'var(--kmrl-teal-border)'}`,
                      color: log.action.includes('APPROVED') ? 'var(--signal-green-text)' : 'var(--kmrl-teal-text)'
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {log.signatureHash}
                  </td>
                  <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
          onClick={onClose}
        >
          Close Audit Log View
        </button>
      </div>
    </div>
  );
}
