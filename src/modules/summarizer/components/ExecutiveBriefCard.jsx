import React from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { AudioWaveform } from '../../../shared/components/AudioWaveform';

export function ExecutiveBriefCard({ selectedDoc, isSpeaking, onAudioBrief }) {
  return (
    <div style={{
      background: 'var(--kmrl-emerald-light)',
      border: '1px solid var(--kmrl-emerald-border)',
      borderRadius: 'var(--radius-md)',
      padding: '1.2rem',
      marginBottom: '1.2rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#059669" />
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--kmrl-emerald-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            30-Second Executive Brief (For MD & HoDs)
          </h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AudioWaveform isPlaying={isSpeaking} />
          <button
            className="btn-secondary"
            onClick={() => onAudioBrief(selectedDoc.executiveSummary || "")}
            style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', gap: '0.3rem' }}
          >
            {isSpeaking ? <VolumeX size={13} color="#dc2626" /> : <Volume2 size={13} color="#059669" />}
            {isSpeaking ? 'Stop Audio' : 'Audio Brief'}
          </button>
        </div>
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
        {selectedDoc.executiveSummary}
      </p>
    </div>
  );
}
