import React, { useRef } from 'react';
import { FileUp, Sparkles } from 'lucide-react';

export function UploadZone({
  onFileUpload,
  onTextUpload,
  uploadTitle,
  setUploadTitle,
  uploadText,
  setUploadText,
  onSimulateMalayalam
}) {
  const fileInputRef = useRef(null);

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onFileUpload}
        accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
      />
      <div
        style={{
          border: '2px dashed var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          textAlign: 'center',
          background: 'var(--bg-secondary)',
          marginBottom: '1rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <FileUp size={32} color="#0284c7" style={{ margin: '0 auto 0.5rem' }} />
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
          Drag & Drop PDF / Engineering Drawing or Click to Browse
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Auto-persisted to database and OCR indexed via Express API (Port 5000)
        </div>
      </div>

      {/* Direct Text Ingestion & Triage */}
      <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
            Or Paste Document Excerpt for Instant AI Ingestion:
          </div>
          <button
            className="btn-secondary"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
            onClick={onSimulateMalayalam}
          >
            Load Malayalam Order Excerpt
          </button>
        </div>

        <input
          type="text"
          placeholder="Document Title (e.g. CMRS Siding Speed Restriction Order)"
          value={uploadTitle}
          onChange={(e) => setUploadTitle(e.target.value)}
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            marginBottom: '0.5rem',
            outline: 'none'
          }}
        />
        <textarea
          rows={3}
          placeholder="Paste document text, CMRS clause, or Malayalam GO excerpt..."
          value={uploadText}
          onChange={(e) => setUploadText(e.target.value)}
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            marginBottom: '0.5rem',
            outline: 'none',
            resize: 'vertical'
          }}
        />
        <button
          className="btn-emerald"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
          onClick={onTextUpload}
          disabled={!uploadText.trim()}
        >
          <Sparkles size={13} /> Run AI OCR & Triage
        </button>
      </div>
    </div>
  );
}
