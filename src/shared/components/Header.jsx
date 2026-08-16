import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, Clock } from 'lucide-react';

export function Header({
  activeTab,
  onToggleMobileSidebar = () => {}
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const TAB_NAMES = {
    dashboard: 'Command Center & Ingestion Matrix',
    ocr: 'OCR Ingestion Studio (Tamil & English)',
    summary: 'AI Executive Brief & Action Extractor',
    workflow: 'Role-Based Approval & Rerouting Matrix',
    search: 'Semantic DeepSearch & RAG Engine',
    sla: 'Real-Time SLA Escalation Watchtower',
    dedupe: 'Circular Deduplication & Paraphrase Detector',
    judge: 'Smart India Hackathon 2024-25 Demo Suite'
  };

  return (
    <header className="top-operations-bar">
      {/* Active Module Indicator */}
      <div className="top-bar-left">
        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-hamburger-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="breadcrumb-module">
          <span className="breadcrumb-parent">KMRL DocFlow</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span className="breadcrumb-current">{TAB_NAMES[activeTab] || 'Command Center'}</span>
        </div>
      </div>

      {/* Right side: Clean KMRL Operations Live Time */}
      <div className="top-bar-right">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, background: 'var(--bg-secondary)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)' }}>
          <Clock size={14} color="#059669" />
          <span className="mono">{timeStr} IST</span>
        </div>
      </div>
    </header>
  );
}
