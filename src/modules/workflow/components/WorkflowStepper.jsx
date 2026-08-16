import React from 'react';
import { Check } from 'lucide-react';

export function WorkflowStepper({ selectedDoc }) {
  const currentStep = selectedDoc?.workflowStep || 3;

  const STEPS = [
    { step: 1, label: 'Ingested & Scanned', desc: 'Multer Upload' },
    { step: 2, label: 'Bilingual OCR', desc: 'Tamil / English' },
    { step: 3, label: 'AI Triaged & Routed', desc: 'NLP Routing' },
    { step: 4, label: 'HoD Dept Review', desc: 'Concurrence' },
    { step: 5, label: 'Final E-Sign & Seal', desc: 'SHA-256 Stamp' }
  ];

  return (
    <div style={{ background: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--rail-steel-900)', fontWeight: 800, background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-medium)' }}>
            {selectedDoc.id}
          </span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
            {selectedDoc.title}
          </strong>
        </div>
        <span className={selectedDoc.status === 'Approved' ? 'badge-p3' : 'badge-p2'}>
          Current Stage: Step {currentStep} of 5 ({selectedDoc.status})
        </span>
      </div>

      {/* Modern Stepper Track */}
      <div className="stepper-horizontal-track">
        {STEPS.map((s, idx) => {
          const isDone = currentStep > s.step || (currentStep === 5 && s.step === 5 && selectedDoc.status === 'Approved');
          const isCurrent = currentStep === s.step && selectedDoc.status !== 'Approved';
          
          return (
            <div key={s.step} className={`stepper-step-item ${isDone ? 'step-done' : isCurrent ? 'step-current' : 'step-pending'}`}>
              <div className="stepper-node-wrap">
                <div className="stepper-bubble">
                  {isDone ? <Check size={14} strokeWidth={3} /> : s.step}
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`stepper-connector-line ${isDone ? 'line-done' : ''}`}></div>
                )}
              </div>
              <div className="stepper-meta-wrap">
                <div className="stepper-step-title">{s.label}</div>
                <div className="stepper-step-desc">{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
