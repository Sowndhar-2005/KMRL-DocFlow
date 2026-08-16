// KMRL Multi-Index Optimization Engine (SIH25080)

export class IndexEngine {
  constructor() {
    this.primaryKeyIndex = new Map(); // Table -> Map(PK -> Record)
    this.compositeIndexes = new Map(); // Table::indexName -> Map(Key -> Set(PKs))
    this.invertedSearchIndex = new Map(); // Word -> Map(PK -> Weight)
    this.dateIndexes = new Map(); // Table::dateField -> Array of { date, id }
    this.stats = {
      indexLookups: 0,
      fullTableScans: 0,
      indexedQueriesServed: 0
    };
  }

  /**
   * Rebuild all indexes for a given table state
   */
  buildIndexes(tableName, records) {
    // 1. Primary Key Index
    let pkMap = this.primaryKeyIndex.get(tableName);
    if (!pkMap) {
      pkMap = new Map();
      this.primaryKeyIndex.set(tableName, pkMap);
    }
    pkMap.clear();

    for (const record of records) {
      if (record.id) {
        pkMap.set(record.id, record);
      }
    }

    // 2. Specialized Indexes for 'documents' table
    if (tableName === 'documents') {
      this._buildDocumentIndexes(records);
    }
  }

  _buildDocumentIndexes(records) {
    // Composite Index: dept + priority
    const deptPriorityIndex = new Map();
    // Status Index
    const statusIndex = new Map();
    // Inverted Full-Text Search Index
    this.invertedSearchIndex.clear();
    // Date Deadline Index
    const deadlineList = [];

    for (const doc of records) {
      const id = doc.id;
      if (!id) continue;

      // Composite (dept, priority)
      const compKey = `${doc.dept || 'UNKNOWN'}::${doc.priority || 'P2'}`;
      if (!deptPriorityIndex.has(compKey)) deptPriorityIndex.set(compKey, new Set());
      deptPriorityIndex.get(compKey).add(id);

      // Status
      const statusKey = doc.status || 'Under Review';
      if (!statusIndex.has(statusKey)) statusIndex.set(statusKey, new Set());
      statusIndex.get(statusKey).add(id);

      // Deadline
      if (doc.deadline) {
        deadlineList.push({ deadline: doc.deadline, id });
      }

      // Inverted Full-Text Indexing
      const fullText = `${doc.title || ''} ${doc.executiveSummary || ''} ${doc.sanctionRef || ''} ${doc.ocrSnippet || ''} ${doc.dept || ''}`.toLowerCase();
      const tokens = fullText
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(t => t.length > 2);

      for (const token of tokens) {
        if (!this.invertedSearchIndex.has(token)) {
          this.invertedSearchIndex.set(token, new Map());
        }
        const docMap = this.invertedSearchIndex.get(token);
        docMap.set(id, (docMap.get(id) || 0) + 1);
      }
    }

    deadlineList.sort((a, b) => a.deadline.localeCompare(b.deadline));

    this.compositeIndexes.set('documents::idx_dept_priority', deptPriorityIndex);
    this.compositeIndexes.set('documents::idx_status', statusIndex);
    this.dateIndexes.set('documents::idx_deadline', deadlineList);
  }

  /**
   * Fast O(1) Primary Key Lookup
   */
  getByPrimaryKey(tableName, id) {
    this.stats.indexLookups++;
    const pkMap = this.primaryKeyIndex.get(tableName);
    return pkMap ? pkMap.get(id) : null;
  }

  /**
   * Fast Composite Index Lookup for (dept, priority)
   */
  findIdsByDeptAndPriority(dept, priority) {
    this.stats.indexLookups++;
    const idx = this.compositeIndexes.get('documents::idx_dept_priority');
    if (!idx) return null;

    const key = `${dept}::${priority}`;
    const match = idx.get(key);
    return match ? Array.from(match) : [];
  }

  /**
   * Fast Full-Text Inverted Index Search
   */
  searchFullText(query) {
    this.stats.indexLookups++;
    if (!query || typeof query !== 'string') return [];

    const tokens = query.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 2);

    if (tokens.length === 0) return [];

    const scoreMap = new Map();

    for (const token of tokens) {
      const docHits = this.invertedSearchIndex.get(token);
      if (docHits) {
        for (const [docId, freq] of docHits.entries()) {
          scoreMap.set(docId, (scoreMap.get(docId) || 0) + freq);
        }
      }
    }

    const sortedDocIds = Array.from(scoreMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    return sortedDocIds;
  }

  /**
   * Return Index Statistics & Health
   */
  getStats() {
    return {
      primaryKeyEntries: Array.from(this.primaryKeyIndex.values()).reduce((acc, m) => acc + m.size, 0),
      invertedSearchTermsCount: this.invertedSearchIndex.size,
      compositeIndexCount: this.compositeIndexes.size,
      metrics: this.stats
    };
  }
}

export const indexEngine = new IndexEngine();
