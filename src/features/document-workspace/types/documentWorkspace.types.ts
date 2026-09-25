import type { DocumentMeta, DocumentPage, Annotation } from '../../../common/types/document'

export type ViewportMode = 'fit-width' | 'fit-page' | 'free'

export interface DocumentViewportState {
  zoom: number // 0.25 to 4.0 (25% to 400%)
  rotation: number // 0, 90, 180, 270
  currentPage: number
  mode: ViewportMode
  isRendering: boolean
}

export interface TileRenderRequest {
  documentId: string
  pageNumber: number
  tileX: number
  tileY: number
  zoom: number
  byteOffset?: number
  byteLength?: number
}

export interface TileRenderResponse {
  pageNumber: number
  tileX: number
  tileY: number
  imageDataUrl?: string
  success: boolean
}

export interface DocumentWorkspaceState {
  document: DocumentMeta | null
  pages: DocumentPage[]
  annotations: Annotation[]
  selectedAnnotationId: string | null
  activeTool: 'select' | 'highlight' | 'rectangle' | 'comment' | 'pan'
}
