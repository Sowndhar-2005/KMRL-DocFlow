import React from 'react';
import { GitMerge } from 'lucide-react';
import { WorkflowStepper } from './components/WorkflowStepper';
import { ApprovalActions } from './components/ApprovalActions';
import { WorkflowQueueTable } from './components/WorkflowQueueTable';

export function WorkflowPage({
  documents,
  selectedDocId,
  onSelectDoc,
  selectedRole,
  onApproveDoc,
  onReroute,
  onEscalate
}) {
  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0] || {};

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GitMerge size={20} color="#059669" /> KMRL 5-Stage Automated Workflow Lifecycle
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Role-based routing, cross-departmental concurrence, and cryptographic audit trail
          </p>
        </div>
        <div className="badge-dept">
          Active Approver: <strong style={{ color: 'var(--kmrl-emerald-text)' }}>{selectedRole}</strong>
        </div>
      </div>

      <WorkflowStepper selectedDoc={selectedDoc} />

      <ApprovalActions
        selectedDoc={selectedDoc}
        selectedRole={selectedRole}
        onApproveDoc={onApproveDoc}
        onReroute={onReroute}
        onEscalate={onEscalate}
      />

      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        All Department Workflows in Progress
      </h3>

      <WorkflowQueueTable
        documents={documents}
        onSelectDoc={onSelectDoc}
        onApproveDoc={onApproveDoc}
      />
    </div>
  );
}
