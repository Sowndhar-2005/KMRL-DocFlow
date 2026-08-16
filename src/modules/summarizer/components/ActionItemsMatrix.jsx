import React from 'react';
import { FileCheck } from 'lucide-react';

export function ActionItemsMatrix({ actionItems = [] }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <FileCheck size={16} color="#059669" /> Actionable Directives & Assignee Checklist
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {actionItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: item.status === 'Done' ? 'var(--signal-green)' : 'var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.status === 'Done' ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>
                {item.status === 'Done' ? '✓' : idx + 1}
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.task}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Assigned to: <span style={{ color: 'var(--kmrl-teal-text)', fontWeight: 600 }}>{item.assignee}</span></div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                background: item.status === 'Done' ? 'var(--signal-green-bg)' : 'var(--signal-amber-bg)',
                border: `1px solid ${item.status === 'Done' ? 'var(--signal-green-border)' : 'var(--signal-amber-border)'}`,
                color: item.status === 'Done' ? 'var(--signal-green-text)' : 'var(--signal-amber-text)'
              }}>
                {item.status}
              </span>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Due: {item.due}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
