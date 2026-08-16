import React from 'react';
import { DocumentSelector } from './components/DocumentSelector';
import { ExecutiveBriefCard } from './components/ExecutiveBriefCard';
import { ActionItemsMatrix } from './components/ActionItemsMatrix';
import { ComplianceRiskRadar } from './components/ComplianceRiskRadar';

export function SummarizerPage({
  documents,
  selectedDocId,
  onSelectDoc,
  isSpeaking,
  onAudioBrief,
  onApproveDoc
}) {
  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0] || {};

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
      {/* Left: Document Picker */}
      <DocumentSelector
        documents={documents}
        selectedDocId={selectedDocId}
        onSelectDoc={onSelectDoc}
      />

      {/* Right: 3-Tier Adaptive Summary Panel */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--rail-steel-900)', fontWeight: 800 }}>
              {selectedDoc.id} • {selectedDoc.sanctionRef || 'KMRL OFFICIAL DIRECTIVE'}
            </span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {selectedDoc.title}
            </h2>
          </div>
        </div>

        {/* Tier 1: 30-Second Executive Brief */}
        <ExecutiveBriefCard
          selectedDoc={selectedDoc}
          isSpeaking={isSpeaking}
          onAudioBrief={onAudioBrief}
        />

        {/* Tier 2: Action Items Matrix */}
        <ActionItemsMatrix
          actionItems={selectedDoc.actionItems || []}
        />

        {/* Tier 3: Regulatory Risk Radar */}
        <ComplianceRiskRadar
          complianceRisk={selectedDoc.complianceRisk}
          onApproveDoc={onApproveDoc}
          docId={selectedDoc.id}
        />
      </div>
    </div>
  );
}
