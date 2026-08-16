// KMRL DocFlow Frontend API Client

const API_BASE = '/api';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Backend offline");
    return await res.json();
  } catch (err) {
    console.warn("Backend health check failed:", err.message);
    return null;
  }
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    return await res.json();
  } catch (err) {
    console.error("fetchStats error:", err);
    return null;
  }
}

export async function fetchDocuments(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/documents?${query}`);
    if (!res.ok) throw new Error("Failed to fetch documents");
    const data = await res.json();
    return data.documents;
  } catch (err) {
    console.error("fetchDocuments error:", err);
    return null;
  }
}

export async function fetchDocumentById(id) {
  try {
    const res = await fetch(`${API_BASE}/documents/${id}`);
    if (!res.ok) throw new Error("Failed to fetch document");
    const data = await res.json();
    return data.document;
  } catch (err) {
    console.error("fetchDocumentById error:", err);
    return null;
  }
}

export async function uploadDocument(formData) {
  try {
    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error("Upload failed");
    return await res.json();
  } catch (err) {
    console.error("uploadDocument error:", err);
    return null;
  }
}

export async function approveDocument(docId, userRole) {
  try {
    const res = await fetch(`${API_BASE}/documents/${docId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userRole })
    });
    if (!res.ok) throw new Error("Approval failed");
    return await res.json();
  } catch (err) {
    console.error("approveDocument error:", err);
    return null;
  }
}

export async function rerouteDocument(docId, newDept, newAssignee, userRole) {
  try {
    const res = await fetch(`${API_BASE}/documents/${docId}/reroute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newDept, newAssignee, userRole })
    });
    if (!res.ok) throw new Error("Reroute failed");
    return await res.json();
  } catch (err) {
    console.error("rerouteDocument error:", err);
    return null;
  }
}

export async function escalateDocument(docId, level, alertType, recipient) {
  try {
    const res = await fetch(`${API_BASE}/documents/${docId}/escalate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, alertType, recipient })
    });
    if (!res.ok) throw new Error("Escalate failed");
    return await res.json();
  } catch (err) {
    console.error("escalateDocument error:", err);
    return null;
  }
}

export async function searchDocumentsRAG(query) {
  try {
    const res = await fetch(`${API_BASE}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!res.ok) throw new Error("Search failed");
    return await res.json();
  } catch (err) {
    console.error("searchDocumentsRAG error:", err);
    return null;
  }
}

export async function fetchAuditLogs() {
  try {
    const res = await fetch(`${API_BASE}/audit-logs`);
    if (!res.ok) throw new Error("Failed to fetch audit logs");
    const data = await res.json();
    return data.auditLogs;
  } catch (err) {
    console.error("fetchAuditLogs error:", err);
    return null;
  }
}

export async function resetDatabase() {
  try {
    const res = await fetch(`${API_BASE}/seed`, { method: 'POST' });
    if (!res.ok) throw new Error("Reset failed");
    return await res.json();
  } catch (err) {
    console.error("resetDatabase error:", err);
    return null;
  }
}
