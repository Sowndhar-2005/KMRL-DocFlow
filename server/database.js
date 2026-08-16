import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'kmrl_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Data for Kochi Metro Rail Limited
const INITIAL_SEED = {
  documents: [
    {
      id: "DOC-2025-0891",
      title: "CMRS Urgent Safety Circular No. 14/2025 — Viaduct Pier 412 Expansion Joints",
      type: "Safety Directive",
      dept: "Safety & Operations",
      priority: "P1",
      status: "Under Review",
      date: "2025-02-14",
      deadline: "2025-02-21",
      daysLeft: 5,
      amount: "₹18,50,00",
      sanctionRef: "CMRS/S&C/KER/2025/891",
      issuingAuth: "Commissioner of Metro Railway Safety (Southern Circle)",
      assignee: "Shri. Ramesh Menon (Chief Safety Officer)",
      workflowStep: 4,
      language: "English",
      similarity: 0,
      duplicateOf: null,
      executiveSummary: "Mandatory emergency ultra-sonic non-destructive testing (NDT) required for Pier 412 to 418 expansion joints between Kalamassery and Muttom Siding following track vibration anomaly reports during morning high-frequency peak hours. Immediate 25 km/h temporary speed restriction (TSR) enforced until structural safety clearance report is submitted to CMRS.",
      actionItems: [
        { task: "Enforce 25 km/h Temporary Speed Restriction (TSR) at Pier 412-418", assignee: "OCC Chief Controller", status: "Done", due: "Immediate" },
        { task: "Deploy NDT Ultrasonic testing crew at Muttom Siding after revenue hours (00:30 hrs)", assignee: "P-Way Chief Engineer", status: "In Progress", due: "2025-02-16" },
        { task: "Submit compliance affidavit to Southern Circle CMRS Bangalore", assignee: "Chief Safety Officer", status: "Pending", due: "2025-02-21" }
      ],
      complianceRisk: "Critical (CMRS Statutory Non-Compliance penalty & possible revenue line suspension)",
      ocrConfidence: "99.4%",
      ocrSnippet: "COMMISSIONER OF METRO RAILWAY SAFETY (SOUTHERN CIRCLE)\nRef No: CMRS/S&C/KER/2025/891 Dated: 14 Feb 2025\nSUBJECT: Emergency structural inspection of viaduct expansion joints at Pier 412-418.\nIn exercise of powers conferred under Section 27 of Metro Railways (Operations & Maintenance) Act 2002...",
      extractedEntities: {
        "Statutory Act": "Metro Railways (O&M) Act 2002 §27",
        "Location": "Pier 412 - Pier 418 (Kalamassery - Muttom)",
        "Speed Restriction": "25 km/h TSR",
        "Statutory Window": "7 Calendar Days"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "DOC-2025-0742",
      title: "KMRL/W-METRO/ENG/2025/T-18 — Lithium-Titanate Marine Battery Pack Global Tender",
      type: "Procurement Tender",
      dept: "Water Metro Division",
      priority: "P2",
      status: "Routed",
      date: "2025-02-12",
      deadline: "2025-03-04",
      daysLeft: 16,
      amount: "₹4,20,00,000",
      sanctionRef: "KMRL/WM/BAT-PROC/09",
      issuingAuth: "General Manager (Water Transport & Fleet)",
      assignee: "Smt. Anjali Nair (Water Metro Fleet Lead)",
      workflowStep: 3,
      language: "English",
      similarity: 0,
      duplicateOf: null,
      executiveSummary: "Global competitive e-tender for procurement, delivery, and testing of 15 sets of 450kWh High-Discharge Lithium-Titanate (LTO) rapid-charging marine battery modules for Kochi Water Metro hybrid electric passenger boats operating along Vyttila, Kakkanad, and High Court corridors.",
      actionItems: [
        { task: "Publish e-tender on GeM and Kerala e-Procurement portal", assignee: "Procurement Section", status: "Done", due: "2025-02-15" },
        { task: "Technical bid evaluation committee formation (Electrical & Marine)", assignee: "GM Water Transport", status: "In Progress", due: "2025-02-24" },
        { task: "Financial concurrence from Director (Finance)", assignee: "Finance Controller", status: "Pending", due: "2025-03-01" }
      ],
      complianceRisk: "Medium (GeM Public Procurement Policy Compliance & Marine DGS Standard Certifications)",
      ocrConfidence: "98.8%",
      ocrSnippet: "KOCHI METRO RAIL LIMITED - WATER TRANSPORT DIVISION\nNIT No: KMRL/W-METRO/ENG/2025/T-18\nTENDER SPECIFICATION FOR 450kWh LTO BATTERY SYSTEM FOR 78-PASSENGER HYBRID BOATS...",
      extractedEntities: {
        "Battery Chemistry": "Lithium-Titanate (LTO)",
        "Vessel Class": "78-Passenger Catamaran Hybrid",
        "Warranty Clause": "7 Years with 80% DoD capacity retention",
        "Total Estimate": "₹4.20 Crore"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "DOC-2025-0619",
      title: "GO(MS) No. 42/2025/TRANS — Pink Line Phase 2 Land Acquisition Sanction (Kakkanad)",
      type: "Government Order",
      dept: "Civil & Land Acquisition",
      priority: "P2",
      status: "Under Review",
      date: "2025-02-10",
      deadline: "2025-03-10",
      daysLeft: 22,
      amount: "₹18,50,00,000",
      sanctionRef: "GO-MS-42-TRANS-KERALA",
      issuingAuth: "Transport (B) Department, Govt of Kerala",
      assignee: "Adv. Haridas K. (Chief Land Officer)",
      workflowStep: 4,
      language: "Malayalam",
      similarity: 0,
      duplicateOf: null,
      malayalamOriginal: "കൊച്ചി മെട്രോ റെയിൽ പദ്ധതി - ഘട്ടം 2 (പിങ്ക് ലൈൻ: ജെഎൽഎൻ സ്റ്റേഡിയം മുതൽ ഇൻഫോപാർക്ക് കാക്കനാട് വരെ) - സ്മാർട്ട് സിറ്റി ലിങ്ക് റോഡിലെ 1.42 ഹെക്ടർ ഭൂമി ഏറ്റെടുക്കുന്നതിന് ഭരണാനുമതി നൽകി ഉത്തരവാകുന്നു. നഷ്ടപരിഹാര തുകയായ 18.50 കോടി രൂപ കൊച്ചിൻ കളക്ടറേറ്റ് എൽഎ തഹസിൽദാർക്ക് കൈമാറാൻ നിർദ്ദേശിക്കുന്നു.",
      malayalamTranslation: "Kochi Metro Rail Project - Phase 2 (Pink Line: JLN Stadium to Infopark Kakkanad) - Administrative sanction accorded for acquisition of 1.42 hectares of land along Smart City Link Road. Sanctions deposit of compensation sum of ₹18.50 Crore to the Special Tahsildar (LA), Ernakulam Collectorate.",
      executiveSummary: "Government of Kerala has accorded official administrative sanction for acquiring 1.42 hectares of land along the Smart City Link Road for the Pink Line (Phase 2) extension. Instructs KMRL to deposit ₹18.50 Cr into the Special Tahsildar Land Acquisition escrow account within 30 days.",
      actionItems: [
        { task: "Transfer ₹18.50 Cr compensation to Collectorate Escrow Account", assignee: "Finance Dept", status: "Pending", due: "2025-02-28" },
        { task: "Joint site survey with Revenue authorities at Kakkanad Bypass", assignee: "Civil Engineering Wing", status: "In Progress", due: "2025-02-20" },
        { task: "Publish 11(1) preliminary notification in local dailies", assignee: "PR & Legal Cell", status: "Pending", due: "2025-02-25" }
      ],
      complianceRisk: "High (LARR Act 2013 Statutory Timeline compliance to avoid arbitration interest penalties)",
      ocrConfidence: "97.6%",
      ocrSnippet: "സർക്കാർ ഉത്തരവ് (എം.എസ്) നമ്പർ 42/2025/ഗതാഗതം\nതീയതി: 10 ഫെബ്രുവരി 2025, തിരുവനന്തപുരം\nവിഷയം: കൊച്ചി മെട്രോ ഘട്ടം 2 പിങ്ക് ലൈൻ ഭൂമി ഏറ്റെടുക്കൽ...",
      extractedEntities: {
        "Govt Order": "GO(MS) No. 42/2025/TRANS",
        "Area": "1.42 Hectares (Smart City Link Rd)",
        "Project Phase": "Phase 2 Pink Line (JLN to Infopark)",
        "Escrow Deposit": "₹18.50 Crore"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "DOC-2025-0550",
      title: "ALSTOM/KMRL/RS/MAINT-044 — Traction Inverter Warranty Claim Trainset #07",
      type: "Vendor Notice",
      dept: "Rolling Stock & Traction",
      priority: "P2",
      status: "Approved",
      date: "2025-02-08",
      deadline: "2025-02-22",
      daysLeft: 6,
      amount: "₹0 (Warranty Claim)",
      sanctionRef: "ALSTOM-WARR-2025-044",
      issuingAuth: "Alstom Transport India Customer Service Directorate",
      assignee: "Er. Joseph Varghese (Muttom Depot Lead)",
      workflowStep: 5,
      signedBy: "Managing Director (MD)",
      digitalSignature: "KMRL-SHA256-ALSTOM-WARR-778942",
      signedAt: "08/02/2025, 04:30 PM",
      language: "English",
      similarity: 0,
      duplicateOf: null,
      executiveSummary: "Official warranty defect rectification confirmation from Alstom regarding premature insulated gate bipolar transistor (IGBT) gating driver failure in Trainset #07's motor car inverter box. Alstom OEM engineers will perform replacement and firmware recalibration at Muttom Depot workshop at zero cost.",
      actionItems: [
        { task: "Provide depot bay #04 access to Alstom OEM field engineers", assignee: "Muttom Workshop Supervisor", status: "Done", due: "2025-02-12" },
        { task: "Perform 12-hour continuous test track run at 80 km/h with telemetry", assignee: "Depot Testing Lead", status: "Done", due: "2025-02-14" },
        { task: "Sign joint warranty release certificate and update SAP Asset Register", assignee: "Rolling Stock Lead", status: "Done", due: "2025-02-15" }
      ],
      complianceRisk: "Low (OEM covered under 5-year comprehensive Rolling Stock SLA)",
      ocrConfidence: "99.1%",
      ocrSnippet: "ALSTOM TRANSPORT INDIA - CUSTOMER SERVICE DIVISION\nWarranty Claim Ref: ALSTOM/KMRL/RS/MAINT-044\nTrainset ID: METRO-TS-07 | Location: Muttom Depot...",
      extractedEntities: {
        "Trainset": "TS-07 (Muttom Depot)",
        "Component": "IGBT Traction Inverter Gating Driver",
        "Cost Impact": "₹0.00 (Covered under OEM Warranty)",
        "Resolution Status": "Repaired & Certified"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "DOC-2025-0322",
      title: "CAG/KER/METRO/2024-25/QUERY-09 — Farebox Discrepancy & Kochi1 Smart Card Concessions",
      type: "Audit Query",
      dept: "Finance & Accounts",
      priority: "P1",
      status: "Under Review",
      date: "2025-02-05",
      deadline: "2025-02-20",
      daysLeft: 4,
      amount: "₹46,20,000",
      sanctionRef: "CAG-KER-METRO-09",
      issuingAuth: "Principal Accountant General (Audit), Kerala",
      assignee: "Shri. Venugopal S. (Chief Financial Officer)",
      workflowStep: 4,
      language: "English",
      similarity: 0,
      duplicateOf: null,
      executiveSummary: "CAG Statutory audit enquiry regarding reconciliation variance of ₹46.20 Lakhs between Axis Bank Kochi1 Card gateway settlement reports and AFC (Automatic Fare Collection) turnstile exit logs at Edappally and Maharajas College stations during festive quarter Q3 2024.",
      actionItems: [
        { task: "Extract raw AFC transaction logs from Thales AFC central server", assignee: "AFC Technical Lead", status: "Done", due: "2025-02-09" },
        { task: "Joint reconciliation meeting with Axis Bank Merchant Settlement Cell", assignee: "Deputy GM Finance", status: "In Progress", due: "2025-02-17" },
        { task: "Submit explanatory draft reply with ledger annexures to CAG Audit Team", assignee: "CFO", status: "Pending", due: "2025-02-20" }
      ],
      complianceRisk: "Critical (Statutory CAG Audit Observation liable to be tabled in State Legislative Assembly)",
      ocrConfidence: "98.9%",
      ocrSnippet: "OFFICE OF THE PRINCIPAL ACCOUNTANT GENERAL (AUDIT) I, KERALA\nAudit Query No: CAG/KER/METRO/2024-25/QUERY-09\nSub: Non-reconciliation of Smart Card fare revenue with banking gateway...",
      extractedEntities: {
        "Audit Authority": "CAG Kerala",
        "Variance Amount": "₹46,20,000",
        "Subject": "AFC Turnstile vs Bank Gateway Reconciliation",
        "Statutory Window": "15 Days"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "DOC-2025-0199",
      title: "KMRL/OPS/CLN/CIRC-12 — Bi-Weekly Deep Cleaning & Pest Control at Phase 1 Stations",
      type: "Operational Circular",
      dept: "Station Operations",
      priority: "P3",
      status: "Ingested",
      date: "2025-02-15",
      deadline: "2025-02-28",
      daysLeft: 12,
      amount: "₹3,40,000",
      sanctionRef: "OPS-CLN-2025-12",
      issuingAuth: "Operations Control Centre (OCC)",
      assignee: "Station Director",
      workflowStep: 1,
      language: "English",
      similarity: 94,
      duplicateOf: "DOC-2025-0145",
      executiveSummary: "⚠️ REDUNDANCY DETECTED: This circular has a 94% textual and clause overlap with already approved circular DOC-2025-0145 (Station Housekeeping SOP Rev 1.1). AI recommends merging into the existing SOP rather than issuing a redundant new directive.",
      actionItems: [
        { task: "Review duplicate similarity report against DOC-2025-0145", assignee: "Operations Manager", status: "Pending", due: "2025-02-17" },
        { task: "Consolidate into master cleaning schedule repository", assignee: "Admin Officer", status: "Pending", due: "2025-02-18" }
      ],
      complianceRisk: "Low (Internal operational memo redundancy)",
      ocrConfidence: "98.2%",
      ocrSnippet: "CIRCULAR NO: KMRL/OPS/CLN/CIRC-12\nTO: All Station Controllers (Aluva to Tripunithura)\nSUB: Bi-weekly deep cleaning and pest management protocol across all metro stations...",
      extractedEntities: {
        "Redundancy Match": "DOC-2025-0145 (94% Match)",
        "Recommendation": "Auto-merge & Archive Duplicate",
        "Est. Storage/Review Saved": "4 Man-hours"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "DOC-2025-0145",
      title: "KMRL/OPS/CLN/CIRC-08 — Master Station Housekeeping & Sanitization SOP Rev 1.1",
      type: "Operational Circular",
      dept: "Station Operations",
      priority: "P3",
      status: "Approved",
      date: "2025-01-15",
      deadline: "2025-01-30",
      daysLeft: 0,
      amount: "₹3,40,000",
      sanctionRef: "OPS-CLN-2025-08",
      issuingAuth: "Operations Control Centre (OCC)",
      assignee: "Station Director",
      workflowStep: 5,
      signedBy: "Director (Operations)",
      digitalSignature: "KMRL-SHA256-SOP-CLEAN-0145",
      signedAt: "18/01/2025, 11:15 AM",
      language: "English",
      similarity: 0,
      duplicateOf: null,
      executiveSummary: "Approved Standard Operating Procedure for station deep cleaning, escalator track sanitization, ticket vending machine disinfection, and bio-waste management across all 25 operational stations.",
      actionItems: [
        { task: "Circulate approved SOP to all Station Facility Managers", assignee: "Admin Officer", status: "Done", due: "2025-01-20" }
      ],
      complianceRisk: "Low",
      ocrConfidence: "99.0%",
      ocrSnippet: "MASTER SOP: KMRL/OPS/CLN/CIRC-08 (REV 1.1)\nSTATION HOUSEKEEPING AND FACILITY MAINTENANCE GUIDELINES...",
      extractedEntities: {
        "Document Type": "Standard Operating Procedure",
        "Scope": "25 Stations Mainline",
        "Review Cycle": "Annual"
      },
      createdAt: new Date().toISOString()
    }
  ],
  auditLogs: [
    {
      id: "LOG-1001",
      docId: "DOC-2025-0550",
      userRole: "Managing Director (MD)",
      action: "DIGITALLY_APPROVED",
      signatureHash: "KMRL-SHA256-ALSTOM-WARR-778942",
      timestamp: "2025-02-08T16:30:00.000Z",
      details: "Approved Alstom TS-07 warranty claim at ₹0.00 liability."
    },
    {
      id: "LOG-1002",
      docId: "DOC-2025-0891",
      userRole: "System AI Engine",
      action: "AUTO_TRIAGED_P1",
      signatureHash: "KMRL-AUTO-ROUTED",
      timestamp: "2025-02-14T09:15:00.000Z",
      details: "CMRS Viaduct Circular classified as P1 Critical and routed to Chief Safety Officer."
    }
  ],
  departments: [
    { id: "dept-1", name: "Safety & Operations", head: "Shri. Ramesh Menon", email: "safety@kmrl.co.in", activeDocs: 12 },
    { id: "dept-2", name: "Water Metro Division", head: "Smt. Anjali Nair", email: "watermetro@kmrl.co.in", activeDocs: 8 },
    { id: "dept-3", name: "Rolling Stock & Traction", head: "Er. Joseph Varghese", email: "rollingstock@kmrl.co.in", activeDocs: 15 },
    { id: "dept-4", name: "Finance & Accounts", head: "Shri. Venugopal S.", email: "cfo@kmrl.co.in", activeDocs: 9 },
    { id: "dept-5", name: "Civil & Land Acquisition", head: "Adv. Haridas K.", email: "land@kmrl.co.in", activeDocs: 6 },
    { id: "dept-6", name: "Legal & Corporate Affairs", head: "Smt. Jayasree M.", email: "legal@kmrl.co.in", activeDocs: 4 }
  ],
  slaEscalations: []
};

// Database Access Class
class KMRLDatabase {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      this.save(INITIAL_SEED);
    }
  }

  read() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        this.save(INITIAL_SEED);
      }
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading KMRL DB, resetting to seed:", err);
      this.save(INITIAL_SEED);
      return INITIAL_SEED;
    }
  }

  save(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  getDocuments() {
    return this.read().documents;
  }

  getDocumentById(id) {
    const docs = this.getDocuments();
    return docs.find(d => d.id === id);
  }

  addDocument(doc) {
    const db = this.read();
    const newDoc = {
      id: doc.id || `DOC-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      ...doc
    };
    db.documents.unshift(newDoc);
    
    // Append audit log
    db.auditLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      docId: newDoc.id,
      userRole: "AI Ingestion Pipeline",
      action: "DOCUMENT_INGESTED",
      signatureHash: "INGEST-AUTO-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      timestamp: new Date().toISOString(),
      details: `Ingested document '${newDoc.title}' with priority ${newDoc.priority || 'P2'}.`
    });

    this.save(db);
    return newDoc;
  }

  updateDocument(id, updates) {
    const db = this.read();
    const idx = db.documents.findIndex(d => d.id === id);
    if (idx !== -1) {
      db.documents[idx] = { ...db.documents[idx], ...updates, updatedAt: new Date().toISOString() };
      this.save(db);
      return db.documents[idx];
    }
    return null;
  }

  approveDocument(id, userRole) {
    const db = this.read();
    const idx = db.documents.findIndex(d => d.id === id);
    if (idx !== -1) {
      const digitalHash = `KMRL-SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString().slice(-6)}`;
      const signedAt = new Date().toLocaleString();
      db.documents[idx] = {
        ...db.documents[idx],
        status: "Approved",
        workflowStep: 5,
        signedBy: userRole,
        digitalSignature: digitalHash,
        signedAt: signedAt
      };

      db.auditLogs.unshift({
        id: `LOG-${Date.now().toString().slice(-4)}`,
        docId: id,
        userRole: userRole,
        action: "DIGITALLY_APPROVED",
        signatureHash: digitalHash,
        timestamp: new Date().toISOString(),
        details: `Approved by ${userRole} with cryptographic stamp ${digitalHash}`
      });

      this.save(db);
      return db.documents[idx];
    }
    return null;
  }

  rerouteDocument(id, newDept, newAssignee, userRole) {
    const db = this.read();
    const idx = db.documents.findIndex(d => d.id === id);
    if (idx !== -1) {
      db.documents[idx] = {
        ...db.documents[idx],
        dept: newDept,
        assignee: newAssignee,
        status: "Routed",
        workflowStep: 3
      };

      db.auditLogs.unshift({
        id: `LOG-${Date.now().toString().slice(-4)}`,
        docId: id,
        userRole: userRole || "System Router",
        action: "DOCUMENT_REROUTED",
        signatureHash: "ROUTE-UPDATE",
        timestamp: new Date().toISOString(),
        details: `Re-routed to ${newDept} (Assignee: ${newAssignee})`
      });

      this.save(db);
      return db.documents[idx];
    }
    return null;
  }

  escalateDocument(id, level, alertType, recipient) {
    const db = this.read();
    const escalation = {
      id: `ESC-${Date.now().toString().slice(-4)}`,
      docId: id,
      level: level || "Level 3 (Director Alert)",
      alertType: alertType || "SMS + WhatsApp + Email Dispatch",
      recipient: recipient || "Managing Director Desk",
      sentAt: new Date().toISOString(),
      status: "Dispatched"
    };
    db.slaEscalations.unshift(escalation);
    this.save(db);
    return escalation;
  }

  getAuditLogs() {
    return this.read().auditLogs;
  }

  getDepartments() {
    return this.read().departments;
  }

  resetSeed() {
    this.save(INITIAL_SEED);
    return INITIAL_SEED;
  }
}

export const db = new KMRLDatabase();
