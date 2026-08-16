import React from 'react';
import { SearchBar } from './components/SearchBar';
import { RagAnswerCard } from './components/RagAnswerCard';
import { SearchResultsGrid } from './components/SearchResultsGrid';

export function DeepSearchPage({
  searchQuery,
  setSearchQuery,
  ragResult,
  documents,
  searchDeptFilter,
  setSearchDeptFilter,
  onSelectDoc,
  onSelectQuery
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectQuery={onSelectQuery}
      />

      <RagAnswerCard ragResult={ragResult} />

      <SearchResultsGrid
        documents={documents}
        searchDeptFilter={searchDeptFilter}
        setSearchDeptFilter={setSearchDeptFilter}
        onSelectDoc={onSelectDoc}
      />
    </div>
  );
}
