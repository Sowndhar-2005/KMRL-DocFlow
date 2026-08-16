import React from 'react';
import { FileText, Zap, ShieldAlert, GitMerge, FileCheck, Sparkles, Upload } from 'lucide-react';
import { DocumentTable } from './components/DocumentTable';
import { QuickIntelligenceDrawer } from './components/QuickIntelligenceDrawer';
import { MetroRouteMap } from '../../shared/components/MetroRouteMap';

export function DashboardPage({
  documents,
  selectedDocId,
  onSelectDoc,
  selectedRole,
  isSpeaking,
  onAudioBrief,
  onApproveDoc,
  onSimulateUpload,
  onNavigateTab,
  onViewSeal
}) {
  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0] || {};
  const p1Count = documents.filter(d => d.priority === 'P1').length;
  const duplicatesCount = documents.filter(d => (d.similarity || 0) > 70).length;

  return (
    <div>
      {/* Interactive Metro Route & Real Life Rail Track Map */}
      <MetroRouteMap
        documents={documents}
        selectedDocId={selectedDocId}
        onSelectDoc={onSelectDoc}
      />

      {/* Clean White Railway Stat Cards Grid */}
      <div className="stat-grid-4">
        <div className="stat-card" style={{ '--card-accent': '#0284c7' }}>
          <div className="stat-header">
            <span>Daily Intake Volume</span>
            <FileText size={18} color="#0284c7" />
          </div>
          <div className="stat-value">
            {1482 + documents.length - 7}
            <span className="stat-delta positive">Live DB</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Auto-triaged by AI with 98.6% classification accuracy
          </div>
        </div>

        <div className="stat-card" style={{ '--card-accent': '#059669' }}>
          <div className="stat-header">
            <span>Avg Triage Latency</span>
            <Zap size={18} color="#059669" />
          </div>
          <div className="stat-value">
            18 sec
            <span className="stat-delta positive">93% reduction</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Down from previous manual handling of 4.2 hours/doc
          </div>
        </div>

        <div className="stat-card" style={{ '--card-accent': '#dc2626' }}>
          <div className="stat-header">
            <span>CMRS & Safety P1 Flags</span>
            <ShieldAlert size={18} color="#dc2626" />
          </div>
          <div className="stat-value">
            {p1Count} Active
            <span className="stat-delta alert">Zero Delays</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Instant routing to Chief Safety Officer & MD desk
          </div>
        </div>

        <div className="stat-card" style={{ '--card-accent': '#7e22ce' }}>
          <div className="stat-header">
            <span>Redundancy Flagged</span>
            <GitMerge size={18} color="#7e22ce" />
          </div>
          <div className="stat-value">
            {duplicatesCount} Circulars
            <span className="stat-delta positive">Saved</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Eliminating duplicate paper circular review
          </div>
        </div>
      </div>

      {/* Responsive 2-Column / Stacked Dashboard Layout */}
      <div className="dashboard-layout-grid">
        {/* Left Column: Active Document Queue */}
        <div className="glass-panel dashboard-table-card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCheck size={18} color="#059669" /> Active Document Ingestion & Approval Matrix
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Showing live priority-sorted records across all KMRL operating units
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={() => onSimulateUpload('cmrs')}
              >
                <Sparkles size={14} color="#0284c7" /> Simulate CMRS
              </button>
              <button
                className="btn-primary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                onClick={() => onNavigateTab('ocr')}
              >
                <Upload size={14} /> New Ingest
              </button>
            </div>
          </div>

          <DocumentTable
            documents={documents}
            selectedDocId={selectedDocId}
            onSelectDoc={onSelectDoc}
            onOpenSummary={() => onNavigateTab('summary')}
          />
        </div>

        {/* Right Column: Instant AI Intelligence Drawer */}
        <div className="dashboard-drawer-wrapper">
          <QuickIntelligenceDrawer
            selectedDoc={selectedDoc}
            selectedRole={selectedRole}
            isSpeaking={isSpeaking}
            onAudioBrief={onAudioBrief}
            onApproveDoc={onApproveDoc}
            onViewWorkflow={() => onNavigateTab('workflow')}
            onInspectOcr={() => onNavigateTab('ocr')}
            onViewSeal={onViewSeal}
          />
        </div>
      </div>
    </div>
  );
}
