import React from 'react';

export function AudioWaveform({ isPlaying }) {
  if (!isPlaying) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '18px', padding: '0 4px' }}>
      {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3, 0.8, 0.5, 0.9, 0.4].map((heightScale, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: '3px',
            height: '100%',
            background: 'linear-gradient(to top, #00b4d8, #00e5a3)',
            borderRadius: '2px',
            transform: `scaleY(${isPlaying ? heightScale : 0.2})`,
            animation: `wave-anim 0.8s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.08}s`
          }}
        />
      ))}
      <style>{`
        @keyframes wave-anim {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.0); }
        }
      `}</style>
    </div>
  );
}
