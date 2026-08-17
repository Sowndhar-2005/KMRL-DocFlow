import React from 'react';
import { Upload } from 'lucide-react';
import { UploadZone } from './components/UploadZone';
import { OcrScannerViewport } from './components/OcrScannerViewport';
import { ExtractedEntitiesForm } from './components/ExtractedEntitiesForm';

export function OcrIngestionPage({
  selectedDoc,
  isScanning,
  isMalayalamView,
  setIsMalayalamView,
  onFileUpload,
  onTextUpload,
  uploadTitle,
  setUploadTitle,
  uploadText,
  setUploadText,
  onSimulateMalayalam,
  onProceedToSummary
}) {
  return (
    <div className="ocr-grid-layout">
      {/* Left: File Ingestion & OCR Scanner */}
      <div className="glass-panel" style={{ padding: '1.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={18} color="#059669" /> Multi-Engine OCR & Document Ingestion
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Real file upload to backend with automated bilingual character extraction
            </p>
          </div>
        </div>

        <UploadZone
          onFileUpload={onFileUpload}
          onTextUpload={onTextUpload}
          uploadTitle={uploadTitle}
          setUploadTitle={setUploadTitle}
          uploadText={uploadText}
          setUploadText={setUploadText}
          onSimulateMalayalam={onSimulateMalayalam}
        />

        <OcrScannerViewport
          selectedDoc={selectedDoc}
          isScanning={isScanning}
          isMalayalamView={isMalayalamView}
          setIsMalayalamView={setIsMalayalamView}
        />
      </div>

      {/* Right: Knowledge Graph & Entity Extraction */}
      <ExtractedEntitiesForm
        selectedDoc={selectedDoc}
        onProceedToSummary={onProceedToSummary}
      />
    </div>
  );
}
