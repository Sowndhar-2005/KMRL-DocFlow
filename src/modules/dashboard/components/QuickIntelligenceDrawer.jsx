import React from 'react';
import { Brain, Volume2, VolumeX, CheckCircle2, Check, GitMerge, Eye, ShieldCheck } from 'lucide-react';
import { AudioWaveform } from '../../../shared/components/AudioWaveform';

export function QuickIntelligenceDrawer({
  selectedDoc,
  selectedRole,
  isSpeaking,
  onAudioBrief,
  onApproveDoc,
  onViewWorkflow,
  onInspectOcr,
  onViewSeal
}) {
  if (!selectedDoc || !selectedDoc.id) {
    return (
      <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Select a document from the queue to view AI intelligence briefing
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={18} color="#059669" />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Instant AI Brief</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <AudioWaveform isPlaying={isSpeaking} />
          <button
            onClick={() => onAudioBrief(selectedDoc.executiveSummary || "")}
            className="btn-secondary"
            style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', gap: '0.3rem' }}
          >
            {isSpeaking ? <VolumeX size={13} color="#dc2626" /> : <Volume2 size={13} color="#059669" />}
            {isSpeaking ? 'Stop' : 'Audio Brief'}
          </button>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--rail-steel-900)', fontWeight: 800 }}>
            {selectedDoc.id}
          </span>
          <span className={selectedDoc.priority === 'P1' ? 'badge-p1' : 'badge-p2'}>
            {selectedDoc.priority} Urgent
          </span>
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
          {selectedDoc.title}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
          {selectedDoc.executiveSummary}
        </div>

        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '0.75rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Extracted Intelligence & Routing
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Sanction Ref:</span> <br />
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.75rem' }}>{selectedDoc.sanctionRef || 'N/A'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Assigned HoD:</span> <br />
              <strong style={{ color: 'var(--kmrl-emerald-text)', fontSize: '0.75rem' }}>{selectedDoc.assignee}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Approval / Action Trigger */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {selectedDoc.status === 'Approved' ? (
          <div style={{
            background: 'var(--signal-green-bg)',
            border: '1px solid var(--signal-green-border)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--signal-green-text)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Digitally Signed & Sealed
              </div>
              <button
                onClick={() => onViewSeal(selectedDoc)}
                style={{ background: 'transparent', border: 'none', color: 'var(--kmrl-teal-text)', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700 }}
              >
                <ShieldCheck size={13} /> View Seal
              </button>
            </div>
            <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Hash: {selectedDoc.digitalSignature || "KMRL-SHA256-AUTHENTICATED"}
            </div>
          </div>
        ) : (
          <button
            className="btn-emerald"
            style={{ justifyContent: 'center', width: '100%' }}
            onClick={() => onApproveDoc(selectedDoc.id)}
          >
            <Check size={16} /> 1-Click Approve as {selectedRole.split(' ')[0]}
          </button>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            className="btn-secondary"
            style={{ justifyContent: 'center', fontSize: '0.75rem' }}
            onClick={onViewWorkflow}
          >
            <GitMerge size={13} /> View Workflow
          </button>
          <button
            className="btn-secondary"
            style={{ justifyContent: 'center', fontSize: '0.75rem' }}
            onClick={onInspectOcr}
          >
            <Eye size={13} /> Inspect OCR
          </button>
        </div>
      </div>
    </div>
  );
}
