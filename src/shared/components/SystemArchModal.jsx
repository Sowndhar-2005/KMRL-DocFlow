import React from 'react';
import { X } from 'lucide-react';

export function SystemArchModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span className="sih-tag">SIH25080 Solution Architecture</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              KMRL DocFlow — Technical Architecture & Component Tree
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', fontSize: '0.82rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--kmrl-emerald-text)', fontWeight: 800, marginBottom: '0.5rem' }}>Frontend Architecture (Port 5173)</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              React 18 + Vite with modular vertical feature slices (Dashboard, OCR, Summarizer, Workflow, DeepSearch, SLA, Dedupe, Pitch). Clean White Railway Design System, Web Speech API audio synthesizers, and SVG real-life rail tracks.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--kmrl-teal-text)', fontWeight: 800, marginBottom: '0.5rem' }}>Express Backend (Port 5000)</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Node.js + Express REST API server with Multer multipart file upload handling, TF-IDF cosine similarity deduplication, and bilingual OCR NLP pipelines.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: '#7e22ce', fontWeight: 800, marginBottom: '0.5rem' }}>Enterprise RAG & Search Engine</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Vector-based semantic Q&A and RAG engine that searches across tokenized KMRL records with clause-level citations and relevance scoring.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--signal-amber-text)', fontWeight: 800, marginBottom: '0.5rem' }}>Persistent Database Layer</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              ACID transactional database persisting all document mutations, status transitions, SLA escalation dispatches, and SHA-256 cryptographic audit stamps.
            </p>
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
          onClick={onClose}
        >
          Close Architecture View
        </button>
      </div>
    </div>
  );
}
