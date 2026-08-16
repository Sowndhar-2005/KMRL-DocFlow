import React from 'react';
import { CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';

export function ApprovalActions({ selectedDoc, selectedRole, onApproveDoc, onReroute, onEscalate }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '1.2rem', border: '1px solid var(--kmrl-emerald-border)' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--kmrl-emerald-text)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCircle2 size={16} /> 1-Click Approval & Digital Seal
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
          Approve and append tamper-proof SHA-256 cryptographic audit timestamp.
        </p>
        <button
          className="btn-emerald"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => onApproveDoc(selectedDoc.id)}
        >
          Approve as {selectedRole.split(' ')[0]}
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.2rem', border: '1px solid var(--kmrl-teal-border)' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--kmrl-teal-text)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} /> AI Re-Route & Delegate
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
          Re-assign document to cross-functional departments (e.g. Water Metro, Finance).
        </p>
        <button
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => onReroute(selectedDoc.id, "Water Metro Division", "Smt. Anjali Nair")}
        >
          Re-Route to Water Metro
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.2rem', border: '1px solid var(--signal-red-border)' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--signal-red-text)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <AlertTriangle size={16} /> Urgent Escalation Trigger
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
          Trigger high-priority alert to MD Executive Desk and send SMS dispatch.
        </p>
        <button
          className="btn-danger"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => onEscalate(selectedDoc.id)}
        >
          Escalate to MD Desk
        </button>
      </div>
    </div>
  );
}
