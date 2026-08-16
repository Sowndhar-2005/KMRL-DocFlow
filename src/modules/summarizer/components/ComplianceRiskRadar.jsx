import React from 'react';
import { Check, ShieldAlert } from 'lucide-react';

export function ComplianceRiskRadar({ complianceRisk, onApproveDoc, docId }) {
  return (
    <div style={{
      background: 'var(--signal-red-bg)',
      border: '1px solid var(--signal-red-border)',
      borderRadius: 'var(--radius-md)',
      padding: '0.9rem 1.1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldAlert size={18} color="#dc2626" />
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--signal-red-text)', textTransform: 'uppercase' }}>
            Compliance & Statutory Risk Assessment
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.15rem', fontWeight: 600 }}>
            {complianceRisk}
          </div>
        </div>
      </div>
      <button
        className="btn-primary"
        onClick={() => onApproveDoc(docId)}
      >
        <Check size={14} /> E-Sign & Approve
      </button>
    </div>
  );
}
