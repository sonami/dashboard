export type DocumentStatus = 'Ready' | 'Processing' | 'Chunking' | 'Error'

export interface DocumentMeta {
  id: string
  claimId: string
  fileName: string
  fileSizeBytes: number
  pageCount: number
  mimeType: string
  uploadedAt: string
  status: DocumentStatus
  sha256: string
}

export interface Annotation {
  id: string
  pageNumber: number
  x: number // Normalized 0-1
  y: number // Normalized 0-1
  width: number
  height: number
  color: string
  comment: string
  authorName: string
  createdAt: string
  type: 'highlight' | 'rectangle' | 'pin' | 'redact'
}

export interface DocumentPage {
  pageNumber: number
  width: number
  height: number
  rotation: number
  thumbnailUrl?: string
  isDeleted?: boolean
}
