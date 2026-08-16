import React from 'react';
import { Clock, Bell } from 'lucide-react';
import { EscalationLadder } from './components/EscalationLadder';
import { SlaTable } from './components/SlaTable';

export function SlaWatchtowerPage({ documents, onDispatchAllAlerts, onEscalateAlert }) {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="#d97706" /> Statutory SLA & Compliance Watchtower
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Automated countdown, non-compliance risk scoring, and 4-tier escalation hierarchy
          </p>
        </div>
        <button className="btn-emerald" onClick={onDispatchAllAlerts}>
          <Bell size={14} /> Dispatch Escalation Alerts
        </button>
      </div>

      <EscalationLadder />

      <SlaTable
        documents={documents}
        onEscalateAlert={onEscalateAlert}
      />
    </div>
  );
}
