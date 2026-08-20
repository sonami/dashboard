import type { DocumentMeta, DocumentPage, Annotation } from '../../common/types/document'

export const MOCK_DOCUMENTS: DocumentMeta[] = [
  {
    id: 'doc_sr_9811',
    claimId: 'CLM-100001',
    fileName: 'SwissRe_Treaty_ExcessOfLoss_Schedule_2026.pdf',
    fileSizeBytes: 142 * 1024 * 1024, // 142 MB
    pageCount: 48,
    mimeType: 'application/pdf',
    uploadedAt: '2026-02-14T09:30:00Z',
    status: 'Ready',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  },
  {
    id: 'doc_sr_9812',
    claimId: 'CLM-100002',
    fileName: 'Aviation_Hull_Loss_Adjuster_Assessment_1.2GB.pdf',
    fileSizeBytes: 1024 * 1024 * 1024, // 1.024 GB Large Doc
    pageCount: 260,
    mimeType: 'application/pdf',
    uploadedAt: '2026-02-17T14:15:00Z',
    status: 'Ready',
    sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
  },
]

export const MOCK_PAGES: DocumentPage[] = Array.from({ length: 48 }, (_, i) => ({
  pageNumber: i + 1,
  width: 800,
  height: 1130,
  rotation: 0,
}))

export const MOCK_ANNOTATIONS: Annotation[] = [
  {
    id: 'ann_1',
    pageNumber: 1,
    x: 0.12,
    y: 0.28,
    width: 0.76,
    height: 0.08,
    color: '#E63946',
    comment: 'Verify retention limit against treaty attachment clause 4.2',
    authorName: 'Marcus Vance (Underwriter)',
    createdAt: '2026-02-15T10:14:00Z',
    type: 'highlight',
  },
  {
    id: 'ann_2',
    pageNumber: 2,
    x: 0.2,
    y: 0.55,
    width: 0.6,
    height: 0.15,
    color: '#457B9D',
    comment: 'Cedant incurred loss figures confirmed with forensic auditor report.',
    authorName: 'Elena Rostova (Claims Analyst)',
    createdAt: '2026-02-16T11:45:00Z',
    type: 'rectangle',
  },
]
