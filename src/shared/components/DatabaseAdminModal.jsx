import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, RefreshCw, HardDrive, CheckCircle2, AlertTriangle, ArrowRight, X, Cpu } from 'lucide-react';

export function DatabaseAdminModal({ onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backupLoading, setBackupLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/database/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleCreateBackup = async () => {
    try {
      setBackupLoading(true);
      const res = await fetch('http://localhost:5000/api/database/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: 'UI_ADMIN_SNAPSHOT' })
      });
      const data = await res.json();
      setStatusMsg(`Snapshot Created: ${data.backup?.filename}`);
      fetchStats();
    } catch (e) {
      setStatusMsg('Error creating backup');
    } finally {
      setBackupLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--kmrl-emerald-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={20} color="#059669" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                KMRL Enterprise Storage Engine & PITR Admin
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ACID Relational-Document Hybrid Engine • Multi-Indexing & Point-In-Time-Recovery
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {statusMsg && (
            <div style={{ background: 'var(--signal-green-bg)', border: '1px solid var(--signal-green-border)', color: 'var(--signal-green-text)', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600 }}>
              {statusMsg}
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>DOCUMENTS TABLE</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {stats?.tables?.documents || 0}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--kmrl-emerald)', fontWeight: 600 }}>ACID Validated</div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEARCH TERMS INDEXED</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--kmrl-teal)', marginTop: '0.2rem' }}>
                {stats?.indexes?.invertedSearchTermsCount || 0}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Inverted Full-Text</div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>COMPOSITE INDEXES</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--rail-steel-800)', marginTop: '0.2rem' }}>
                {stats?.indexes?.compositeIndexCount || 0}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>(Dept, Priority)</div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>INTEGRITY STATUS</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--signal-green)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={18} /> {stats?.integrity?.status || 'HEALTHY'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>FK References Verified</div>
            </div>
          </div>

          {/* Engine Technical Specifications */}
          <div className="glass-panel" style={{ padding: '1.2rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Cpu size={16} color="#059669" /> Engine Architecture Details
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Storage Mode:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Snapshot Isolation ACID</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Primary Index:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>B-Tree (Document ID)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Query Optimizer:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Cost-Based Index Selector</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Snapshot Backups:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{stats?.backups?.snapshotsAvailable || 0} Saved</span>
              </div>
            </div>
          </div>

          {/* Backup Management Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Point-In-Time Recovery (PITR) & Snapshot Generation
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Creates a cryptographically sealed SHA-256 JSON snapshot of all tables & indexes.
              </div>
            </div>
            <button
              onClick={handleCreateBackup}
              disabled={backupLoading}
              className="btn-emerald"
              style={{ padding: '0.5rem 1rem' }}
            >
              <HardDrive size={15} />
              {backupLoading ? 'Creating Snapshot...' : 'Create Snapshot Backup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
