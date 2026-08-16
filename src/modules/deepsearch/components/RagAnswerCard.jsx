import React from 'react';
import { Sparkles, FileText } from 'lucide-react';

export function RagAnswerCard({ ragResult }) {
  if (!ragResult || !ragResult.answer) return null;

  return (
    <div className="glass-panel" style={{ padding: '1.4rem', border: '1.5px solid var(--kmrl-emerald-border)', background: 'var(--kmrl-emerald-light)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <Sparkles size={18} color="#059669" />
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--kmrl-emerald-text)' }}>
          KMRL AI-Synthesized Intelligence Answer (with Direct Citations)
        </h3>
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.65, marginBottom: '1rem', fontWeight: 500 }}>
        {ragResult.answer}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {ragResult.citations && ragResult.citations.map((cit, idx) => (
          <div key={idx} style={{
            background: '#ffffff',
            border: '1px solid var(--kmrl-emerald-border)',
            padding: '0.45rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-primary)'
          }}>
            <FileText size={14} color="#059669" />
            <span>Citation: <strong style={{ color: 'var(--kmrl-emerald-text)' }}>{cit.docId}</strong> ({cit.clause})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
