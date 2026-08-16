import React from 'react';

export function EscalationLadder() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
      <div className="stat-card" style={{ padding: '1rem', '--card-accent': '#0284c7' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>LEVEL 1 ESCALATION</div>
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.92rem', marginTop: '0.2rem' }}>Section Engineer</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--kmrl-teal-text)', marginTop: '0.2rem', fontWeight: 600 }}>Trigger: 7 Days Remaining</div>
      </div>
      <div className="stat-card" style={{ padding: '1rem', '--card-accent': '#d97706' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>LEVEL 2 ESCALATION</div>
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.92rem', marginTop: '0.2rem' }}>Chief Engineer / HoD</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--signal-amber-text)', marginTop: '0.2rem', fontWeight: 600 }}>Trigger: 3 Days Remaining</div>
      </div>
      <div className="stat-card" style={{ padding: '1rem', '--card-accent': '#dc2626' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>LEVEL 3 ESCALATION</div>
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.92rem', marginTop: '0.2rem' }}>Director (Operations)</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--signal-red-text)', marginTop: '0.2rem', fontWeight: 600 }}>Trigger: 24 Hours Remaining</div>
      </div>
      <div className="stat-card" style={{ padding: '1rem', '--card-accent': '#7e22ce' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>LEVEL 4 ESCALATION</div>
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.92rem', marginTop: '0.2rem' }}>Managing Director (MD)</div>
        <div style={{ fontSize: '0.72rem', color: '#7e22ce', marginTop: '0.2rem', fontWeight: 600 }}>Trigger: Overdue Breach</div>
      </div>
    </div>
  );
}
