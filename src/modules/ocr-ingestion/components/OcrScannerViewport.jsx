import React from 'react';
import { Sparkles } from 'lucide-react';

export function OcrScannerViewport({
  selectedDoc,
  isScanning,
  isTamilView,
  setIsTamilView
}) {
  return (
    <div className="scanner-viewport">
      {isScanning && <div className="scanner-laser"></div>}

      <div style={{
        padding: '0.75rem 1rem',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-medium)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--rail-steel-900)', fontWeight: 800 }}>
          LIVE OCR STREAM: {selectedDoc.id || 'SCAN-ACTIVE'} (Confidence: {selectedDoc.ocrConfidence || '99.2%'})
        </span>
        {selectedDoc.language === 'Tamil' && (
          <span style={{ background: 'var(--signal-amber-bg)', border: '1px solid var(--signal-amber-border)', color: 'var(--signal-amber-text)', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
            TAMIL SCRIPT DETECTED
          </span>
        )}
      </div>

      <div style={{ padding: '1.5rem', position: 'relative', flex: 1, overflowY: 'auto', background: '#ffffff' }}>
        <pre style={{
          color: 'var(--text-primary)',
          fontSize: '0.82rem',
          lineHeight: 1.65,
          whiteSpace: 'pre-wrap',
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          {selectedDoc.language === 'Tamil' && isTamilView
            ? selectedDoc.tamilTranslation
            : selectedDoc.ocrSnippet || selectedDoc.executiveSummary}
        </pre>

        {/* Visual Bounding Boxes */}
        <div className="ocr-box" style={{ top: '35px', left: '20px', width: '280px', height: '30px' }}>
          <span className="ocr-tag">Entity: Issuing Authority (99.4%)</span>
        </div>
        <div className="ocr-box" style={{ top: '80px', left: '20px', width: '220px', height: '24px' }}>
          <span className="ocr-tag">Entity: Sanction Ref (98.9%)</span>
        </div>
      </div>

      {selectedDoc.language === 'Tamil' && (
        <div style={{
          padding: '0.75rem 1rem',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-medium)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Bilingual Tamil / English Alignment:
          </span>
          <button
            className="btn-emerald"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.72rem' }}
            onClick={() => setIsTamilView(!isTamilView)}
          >
            <Sparkles size={12} /> {isTamilView ? 'Show Tamil Script' : 'Translate to English'}
          </button>
        </div>
      )}
    </div>
  );
}
