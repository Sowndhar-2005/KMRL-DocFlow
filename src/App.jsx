import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import * as api from './api';
import { Sidebar } from './shared/components/Sidebar';
import { Header } from './shared/components/Header';
import { DigitalSealModal } from './shared/components/DigitalSealModal';
import { DashboardPage } from './modules/dashboard';
import { OcrIngestionPage } from './modules/ocr-ingestion';
import { SummarizerPage } from './modules/summarizer';
import { WorkflowPage } from './modules/workflow';
import { DeepSearchPage } from './modules/deepsearch';
import { SlaWatchtowerPage } from './modules/sla-watchtower';
import { DeduplicationPage } from './modules/deduplication';
import { PitchModePage } from './modules/pitch-mode';
import './styles.css';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Managing Director (MD)");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDeptFilter, setSearchDeptFilter] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [isScanning, setIsScanning] = useState(false);
  const [isTamilView, setIsTamilView] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedSealDoc, setSelectedSealDoc] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [ragResult, setRagResult] = useState(null);
  const [uploadText, setUploadText] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const refreshData = async () => {
    try {
      const docs = await api.fetchDocuments();
      if (docs && docs.length > 0) {
        setDocuments(docs);
        if (!selectedDocId || !docs.some(d => d.id === selectedDocId)) {
          setSelectedDocId(docs[0].id);
        }
      }
    } catch (err) {
      console.warn("Backend sync error:", err);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 8000);
    return () => clearInterval(interval);
  }, []);

  const selectedDoc = useMemo(() => {
    return documents.find(d => d.id === selectedDocId) || documents[0] || {};
  }, [documents, selectedDocId]);

  const p1Count = useMemo(() => {
    return documents.filter(d => d.priority === 'P1').length;
  }, [documents]);

  // Audio Speech Synthesis
  const handleAudioBrief = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Speech synthesis not supported in this browser.");
    }
  };

  // Approval Mutation
  const handleApproveDoc = async (id) => {
    try {
      const updated = await api.approveDocument(id, selectedRole);
      if (updated) {
        setDocuments(prev => prev.map(d => d.id === id ? updated : d));
        showToast(`✅ Document ${id} sealed cryptographically by ${selectedRole}`);
        refreshData();
      }
    } catch (err) {
      showToast("Failed to approve document");
    }
  };

  // Reroute Mutation
  const handleReroute = async (id, dept, assignee) => {
    try {
      const updated = await api.rerouteDocument(id, dept, assignee, selectedRole);
      if (updated) {
        setDocuments(prev => prev.map(d => d.id === id ? updated : d));
        showToast(`🔀 Document ${id} re-routed to ${dept}`);
        refreshData();
      }
    } catch (err) {
      showToast("Failed to reroute document");
    }
  };

  // Escalation Mutation
  const handleEscalate = async (id) => {
    try {
      await api.escalateDocument(id, "Level 3 (Director Alert)", "SMS + Email Dispatch", "Managing Director Desk");
      showToast(`🚨 SLA Escalation Alert dispatched for ${id}!`);
      refreshData();
    } catch (err) {
      showToast("Failed to trigger escalation");
    }
  };

  // File Ingestion
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name.replace(/\.[^/.]+$/, ""));

    try {
      const res = await api.uploadDocument(formData);
      setIsScanning(false);
      if (res && res.document) {
        setDocuments(prev => [res.document, ...prev]);
        setSelectedDocId(res.document.id);
        showToast(`✨ File "${file.name}" processed via OCR and triaged as ${res.document.id}`);
      }
    } catch (err) {
      setIsScanning(false);
      showToast("Error uploading file");
    }
  };

  // Text Ingestion
  const handleTextUpload = async (preset = null) => {
    setIsScanning(true);
    let title = uploadTitle || "KMRL Ingested Document";
    let rawText = uploadText || "";

    if (preset === 'cmrs') {
      title = "CMRS Track Geometry & Clearance Notice — Phase 1B Vadakkekotta Siding";
      rawText = "COMMISSIONER OF METRO RAILWAY SAFETY (SOUTHERN CIRCLE)\nRef: CMRS/GEO/2025/904\nSub: Mandatory emergency track gauge & cross-level geometry laser verification on Vadakkekotta crossover siding switch 12B before commissioning high-speed freight run. Section 27 compliance required within 7 days.";
    } else if (preset === 'tamil') {
      title = "GO(RT) No. 112/2025/TRANS — Kochi Water Metro Jetty Electrification Sanction";
      rawText = "கொச்சி வாட்டர் மெட்ரோ திட்டத்தின் கீழ் போல்காட்டி மற்றும் ஃபோர்ட் கொச்சி ஜெட்டிகளில் 33kV மின்பாதை அமைப்பதற்கும் சோலார் சார்ஜிங் உள்கட்டமைப்பு உருவாக்குவதற்கும் ₹2.15 கோடி நிர்வாக அனுமதி வழங்கப்படுகிறது. இந்த தொகையை மின்வாரியத்திற்கு உடனடியாக மாற்ற உத்தரவிடப்படுகிறது.";
    } else if (preset === 'duplicate') {
      title = "KMRL/OPS/CLN/CIRC-18 — Station Sanitization & Chemical Mop Protocols (Duplicate Submission)";
      rawText = "CIRCULAR NO: KMRL/OPS/CLN/CIRC-18\nDeep cleaning shall be carried out at all 25 stations between 01:00 hrs and 04:30 hrs. Escalator comb plates must be inspected and sanitized daily. Bio-waste disposal to adhere to Pollution Control Board guidelines.";
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('rawText', rawText);

    try {
      const res = await api.uploadDocument(formData);
      setIsScanning(false);
      setUploadText("");
      setUploadTitle("");
      if (res && res.document) {
        setDocuments(prev => [res.document, ...prev]);
        setSelectedDocId(res.document.id);
        showToast(`✨ Document triaged: ${res.document.id} (${res.document.dept})`);
      }
    } catch (err) {
      setIsScanning(false);
      showToast("Error processing document");
    }
  };

  // RAG Search
  const handleRAGSearch = async (queryText) => {
    const q = queryText !== undefined ? queryText : searchQuery;
    if (!q || q.trim() === "") return;
    
    try {
      const res = await api.searchDocumentsRAG(q);
      if (res) setRagResult(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const debounce = setTimeout(() => handleRAGSearch(searchQuery), 350);
      return () => clearTimeout(debounce);
    } else {
      setRagResult(null);
    }
  }, [searchQuery]);

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesDept = searchDeptFilter === "All" || doc.dept === searchDeptFilter;
      const matchesPriority = filterPriority === "All" || doc.priority === filterPriority;
      const matchesQuery = !searchQuery || 
        doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.dept?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.executiveSummary?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesPriority && matchesQuery;
    });
  }, [documents, searchDeptFilter, filterPriority, searchQuery]);

  return (
    <div className="app-container">
      {/* 1. Dedicated Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documentsCount={documents.length}
        p1Count={p1Count}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="main-content-layout">
        {/* Top Operations Header */}
        <Header
          activeTab={activeTab}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            background: '#ffffff',
            border: '1px solid var(--signal-green-border)',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
            color: 'var(--text-primary)',
            padding: '0.85rem 1.4rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'modal-fade 0.2s ease-out'
          }}>
            <Sparkles size={18} color="#16a34a" />
            {toastMessage}
          </div>
        )}

        {/* Main Content Area */}
        <main className="main-wrapper">
          {/* Tab Route Switching */}
          {activeTab === 'dashboard' && (
            <DashboardPage
              documents={documents}
              selectedDocId={selectedDocId}
              onSelectDoc={setSelectedDocId}
              selectedRole={selectedRole}
              isSpeaking={isSpeaking}
              onAudioBrief={handleAudioBrief}
              onApproveDoc={handleApproveDoc}
              onSimulateUpload={handleTextUpload}
              onNavigateTab={setActiveTab}
              onViewSeal={setSelectedSealDoc}
            />
          )}

          {activeTab === 'ocr' && (
            <OcrIngestionPage
              selectedDoc={selectedDoc}
              isScanning={isScanning}
              isTamilView={isTamilView}
              setIsTamilView={setIsTamilView}
              onFileUpload={handleFileUpload}
              onTextUpload={handleTextUpload}
              uploadTitle={uploadTitle}
              setUploadTitle={setUploadTitle}
              uploadText={uploadText}
              setUploadText={setUploadText}
              onSimulateTamil={() => handleTextUpload('tamil')}
              onProceedToSummary={() => setActiveTab('summary')}
            />
          )}

          {activeTab === 'summary' && (
            <SummarizerPage
              documents={documents}
              selectedDocId={selectedDocId}
              onSelectDoc={setSelectedDocId}
              isSpeaking={isSpeaking}
              onAudioBrief={handleAudioBrief}
              onApproveDoc={handleApproveDoc}
            />
          )}

          {activeTab === 'workflow' && (
            <WorkflowPage
              documents={documents}
              selectedDocId={selectedDocId}
              onSelectDoc={setSelectedDocId}
              selectedRole={selectedRole}
              onApproveDoc={handleApproveDoc}
              onReroute={handleReroute}
              onEscalate={handleEscalate}
            />
          )}

          {activeTab === 'search' && (
            <DeepSearchPage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              ragResult={ragResult}
              documents={filteredDocs}
              searchDeptFilter={searchDeptFilter}
              setSearchDeptFilter={setSearchDeptFilter}
              onSelectDoc={(id) => {
                setSelectedDocId(id);
                setActiveTab('summary');
              }}
              onSelectQuery={(q) => {
                setSearchQuery(q);
                handleRAGSearch(q);
              }}
            />
          )}

          {activeTab === 'sla' && (
            <SlaWatchtowerPage
              documents={documents}
              onDispatchAllAlerts={() => showToast("🔔 Automated multi-channel escalation alerts triggered to all pending HoDs")}
              onEscalateAlert={handleEscalate}
            />
          )}

          {activeTab === 'dedupe' && (
            <DeduplicationPage
              duplicateCount={documents.filter(d => (d.similarity || 0) > 70).length}
              onMergeDuplicate={() => showToast("🗄️ Duplicate merged into Master SOP repository. 4 man-hours saved!")}
            />
          )}

          {activeTab === 'judge' && (
            <PitchModePage
              onRunScenario1={() => {
                handleTextUpload('cmrs');
                setActiveTab('ocr');
              }}
              onRunScenario2={() => {
                handleTextUpload('tamil');
                setActiveTab('ocr');
              }}
              onRunScenario3={() => {
                setSelectedDocId("DOC-2025-0742");
                setActiveTab('summary');
              }}
              onRunScenario4={() => {
                handleTextUpload('duplicate');
                setActiveTab('dedupe');
              }}
              onResetDb={async () => {
                await api.resetDatabase();
                await refreshData();
                showToast("🔄 Database re-seeded to pristine demo state!");
              }}
            />
          )}
        </main>
      </div>

      {/* Cryptographic Digital Seal Modal */}
      {selectedSealDoc && (
        <DigitalSealModal
          document={selectedSealDoc}
          onClose={() => setSelectedSealDoc(null)}
        />
      )}
    </div>
  );
}
