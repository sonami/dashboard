import { handleGetClaims, type ClaimsQueryParams } from './handlers/claimsHandler'
import {
  handleGetDocumentMeta,
  handleGetDocumentPages,
  handleGetAnnotations,
  handleSaveAnnotation,
} from './handlers/documentsHandler'
import type { Annotation } from '../common/types/document'

/**
 * In-browser mock service worker simulator layer.
 * Emulates network latency and backend responses without requiring full external MSW package setup.
 */
export const mockService = {
  async getClaims(params: ClaimsQueryParams) {
    await new Promise((res) => setTimeout(res, 80)) // simulate high-speed edge API latency
    return handleGetClaims(params)
  },

  async getDocumentMeta(docId: string) {
    await new Promise((res) => setTimeout(res, 50))
    return handleGetDocumentMeta(docId)
  },

  async getDocumentPages(docId: string) {
    await new Promise((res) => setTimeout(res, 60))
    return handleGetDocumentPages(docId)
  },

  async getAnnotations(docId: string) {
    await new Promise((res) => setTimeout(res, 40))
    return handleGetAnnotations(docId)
  },

  async addAnnotation(annotation: Annotation) {
    await new Promise((res) => setTimeout(res, 50))
    return handleSaveAnnotation(annotation)
  },
}
