import { mockService } from '../../../mocks/browser'
import { httpClient } from '../../../services/http/httpClient'
import type { DocumentMeta, DocumentPage, Annotation } from '../../../common/types/document'

export const documentApi = {
  async fetchDocumentMeta(docId: string): Promise<DocumentMeta> {
    return mockService.getDocumentMeta(docId)
  },

  async fetchDocumentPages(docId: string): Promise<DocumentPage[]> {
    const res = await mockService.getDocumentPages(docId)
    return res.pages
  },

  async fetchAnnotations(docId: string): Promise<Annotation[]> {
    const res = await mockService.getAnnotations(docId)
    return res.annotations
  },

  async saveAnnotation(annotation: Annotation): Promise<Annotation> {
    const res = await mockService.addAnnotation(annotation)
    return res.annotation
  },

  /**
   * Fetches specific byte range chunk of large files (100MB - 1GB)
   */
  async fetchByteChunk(
    docId: string,
    startByte: number,
    endByte: number
  ): Promise<ArrayBuffer> {
    const res = await httpClient.get<ArrayBuffer>(`/documents/${docId}/stream`, {
      byteRange: { start: startByte, end: endByte },
    })
    return res.data
  },
}
