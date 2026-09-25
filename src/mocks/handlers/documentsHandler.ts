import { MOCK_DOCUMENTS, MOCK_PAGES, MOCK_ANNOTATIONS } from '../data/documentsData'
import type { Annotation } from '../../common/types/document'

export function handleGetDocumentMeta(docId: string) {
  const doc = MOCK_DOCUMENTS.find((d) => d.id === docId) || MOCK_DOCUMENTS[0]
  return doc
}

export function handleGetDocumentPages(docId: string) {
  return {
    documentId: docId,
    pages: MOCK_PAGES,
  }
}

export function handleGetAnnotations(docId: string) {
  return {
    documentId: docId,
    annotations: MOCK_ANNOTATIONS,
  }
}

export function handleSaveAnnotation(annotation: Annotation) {
  MOCK_ANNOTATIONS.push(annotation)
  return {
    success: true,
    annotation,
  }
}
