import React from 'react';
import {
  Train,
  LayoutDashboard,
  ScanText,
  FileText,
  GitPullRequest,
  Search,
  Clock,
  Copy,
  Award,
  ChevronRight,
  UserCheck,
  X
} from 'lucide-react';

export function Sidebar({
  activeTab,
  setActiveTab,
  documentsCount = 0,
  p1Count = 0,
  selectedRole,
  setSelectedRole,
  isMobileOpen = false,
  onCloseMobile = () => {}
}) {
  const NAV_ITEMS = [
    {
      id: 'dashboard',
      label: 'Command Center',
      sublabel: 'Live Operations Matrix',
      icon: LayoutDashboard,
      badge: documentsCount > 0 ? `${documentsCount} Active` : null,
      badgeType: 'neutral'
    },
    {
      id: 'ocr',
      label: 'OCR Studio',
      sublabel: 'English & Malayalam Ingestion',
      icon: ScanText,
      badge: 'AI Vision',
      badgeType: 'emerald'
    },
    {
      id: 'summary',
      label: 'AI Summarizer',
      sublabel: 'Action Items & Audio Brief',
      icon: FileText,
      badge: null
    },
    {
      id: 'workflow',
      label: 'Workflow Matrix',
      sublabel: 'Role-Based Approval Grid',
      icon: GitPullRequest,
      badge: p1Count > 0 ? `${p1Count} Urgent` : null,
      badgeType: 'danger'
    },
    {
      id: 'search',
      label: 'DeepSearch & RAG',
      sublabel: 'Semantic Circular Retrieval',
      icon: Search,
      badge: 'RAG',
      badgeType: 'teal'
    },
    {
      id: 'sla',
      label: 'SLA Watchtower',
      sublabel: 'Autonomous Escalation Matrix',
      icon: Clock,
      badge: '24h Radar',
      badgeType: 'amber'
    },
    {
      id: 'dedupe',
      label: 'Deduplication Engine',
      sublabel: 'Cosine Similarity & Paraphrase',
      icon: Copy,
      badge: 'TF-IDF',
      badgeType: 'neutral'
    },
    {
      id: 'judge',
      label: 'SIH Pitch & Judge Mode',
      sublabel: 'Interactive 1-Click Evaluation',
      icon: Award,
      badge: 'Demo Mode',
      badgeType: 'purple'
    }
  ];

  const ROLES = [
    "Managing Director (MD)",
    "Chief Safety Officer",
    "Director (Rolling Stock)",
    "Chief Operations Manager",
    "Finance Director",
    "GM (Water Metro)"
  ];

  const handleItemClick = (id) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div className="sidebar-mobile-backdrop" onClick={onCloseMobile} />
      )}

      <aside className={`app-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Top: Kochi Metro Official Branding */}
        <div className="sidebar-brand-section">
          <div className="sidebar-logo-wrap">
            <div className="metro-logo-box">
              <Train size={24} color="#ffffff" strokeWidth={2.4} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="sidebar-brand-title">
                KMRL DocFlow
              </div>
              <div className="sidebar-brand-sub">Kochi Metro Rail Limited</div>
            </div>
            {/* Mobile close button */}
            <button className="sidebar-mobile-close-btn" onClick={onCloseMobile}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Railway Line Banner */}
        <div className="sidebar-line-badge">
          <div className="rail-indicator-dot"></div>
          <div className="rail-line-text">
            <span className="rail-line-name">LINE 1 & WATER METRO</span>
            <span className="rail-status-text">Operational • Document Triage Active</span>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="sidebar-nav-list">
          <div className="sidebar-section-title">INTELLIGENCE MODULES</div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-icon-wrap">
                  <Icon size={18} />
                </div>
                <div className="nav-item-text-wrap">
                  <div className="nav-item-label">{item.label}</div>
                  <div className="nav-item-sublabel">{item.sublabel}</div>
                </div>
                {item.badge && (
                  <span className={`nav-badge nav-badge-${item.badgeType}`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="active-chevron" />}
              </button>
            );
          })}
        </nav>

        {/* Role Switcher */}
        <div className="sidebar-footer">
          <div className="sidebar-role-card">
            <div className="role-card-header">
              <UserCheck size={14} color="#059669" />
              <span>OPERATING AS ROLE</span>
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="sidebar-role-select"
            >
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}
