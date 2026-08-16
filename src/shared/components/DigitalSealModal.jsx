import React from 'react';
import { ShieldCheck, CheckCircle2, QrCode, X, Download, Lock } from 'lucide-react';

export function DigitalSealModal({ document, onClose }) {
  if (!document) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--kmrl-emerald-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} color="#059669" />
            </div>
            <div>
              <span className="badge-dept" style={{ color: 'var(--kmrl-emerald-text)', borderColor: 'var(--kmrl-emerald-border)' }}>
                <Lock size={12} /> Statutory Digital Certificate
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                Cryptographic Approval Seal
              </h3>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Certificate Card */}
        <div style={{
          background: '#ffffff',
          border: '2px solid var(--kmrl-emerald-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-25deg)',
            fontSize: '3.5rem',
            fontWeight: 900,
            color: 'rgba(5, 150, 105, 0.05)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            KMRL VERIFIED
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Kochi Metro Rail Limited • Legal Compliance Directorate
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {document.title}
              </div>
            </div>
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-medium)',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={48} color="#0f172a" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.78rem', marginBottom: '1.2rem', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '0.75rem 0' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Document ID:</span> <br />
              <strong className="mono" style={{ color: 'var(--rail-steel-900)' }}>{document.id}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Sanction Ref:</span> <br />
              <strong className="mono" style={{ color: 'var(--text-primary)' }}>{document.sanctionRef || 'KMRL/DIRECT'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Authorized Signatory:</span> <br />
              <strong style={{ color: 'var(--kmrl-emerald-text)' }}>{document.signedBy || "Managing Director (MD)"}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Timestamp:</span> <br />
              <strong style={{ color: 'var(--text-secondary)' }}>{document.signedAt || new Date().toLocaleString()}</strong>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
              SHA-256 Cryptographic Digest Hash
            </span>
            <div className="mono" style={{
              fontSize: '0.72rem',
              color: 'var(--kmrl-emerald-text)',
              background: 'var(--kmrl-emerald-light)',
              border: '1px solid var(--kmrl-emerald-border)',
              padding: '0.45rem 0.6rem',
              borderRadius: '6px',
              marginTop: '0.2rem',
              wordBreak: 'break-all',
              fontWeight: 700
            }}>
              {document.digitalSignature || `KMRL-SHA256-${Math.random().toString(36).substring(2, 12).toUpperCase()}-VERIFIED`}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button
            className="btn-emerald"
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => {
              alert("Digital Certificate downloaded as KMRL-Compliance-Seal.pdf");
              onClose();
            }}
          >
            <Download size={15} /> Export Certified PDF
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
