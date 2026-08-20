import React, { useState, useEffect, Suspense, lazy } from 'react'
import { mergeClasses } from '@griffel/react'
import type { DocumentMeta, DocumentPage, Annotation } from '../../../common/types/document'
import { useDocumentViewport } from '../hooks/useDocumentViewport'
import { DocumentToolbar } from './DocumentToolbar'
import { ThumbnailBar } from './ThumbnailBar'
import { AnnotationLayer } from '../sub-features/annotations/AnnotationLayer'
import { documentApi } from '../api/documentApi'
import { formatBytes } from '../../../common/utils/bytes'
import { formatDate } from '../../../common/utils/formatters'
import { Spinner } from '../../../common/components/ui/Spinner'
import { AuthzGate } from '../../../common/components/AuthzGate'
import { tokens } from '../../../common/styles/tokens'
import { useCanvasStyles } from './DocumentCanvas.styles'

// On-demand modal chunk for page operations
const PageOperationsModal = lazy(() =>
  import(/* webpackChunkName: "subfeature-page-operations" */ '../sub-features/operations').then(
    (m) => ({ default: m.PageOperationsModal })
  )
)

interface DocumentCanvasProps {
  documentId?: string
  onClose?: () => void
}

export const DocumentCanvas: React.FC<DocumentCanvasProps> = ({
  documentId = 'doc_sr_9811',
  onClose,
}) => {
  const styles = useCanvasStyles()
  const [docMeta, setDocMeta] = useState<DocumentMeta | null>(null)
  const [pages, setPages] = useState<DocumentPage[]>([])
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState<'select' | 'highlight' | 'rectangle' | 'comment' | 'pan'>('select')
  const [isOperationsOpen, setIsOperationsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newCommentText, setNewCommentText] = useState<string>('')
  const [isSidebarCommentsOpen, setIsSidebarCommentsOpen] = useState<boolean>(true)

  const {
    viewport,
    setZoom,
    zoomIn,
    zoomOut,
    rotateClockwise,
    setCurrentPage,
  } = useDocumentViewport(1)

  useEffect(() => {
    let isMounted = true
    async function loadDocument() {
      setIsLoading(true)
      try {
        const [meta, pageList, anns] = await Promise.all([
          documentApi.fetchDocumentMeta(documentId),
          documentApi.fetchDocumentPages(documentId),
          documentApi.fetchAnnotations(documentId),
        ])
        if (isMounted) {
          setDocMeta(meta)
          setPages(pageList)
          setAnnotations(anns)
        }
      } catch (err) {
        console.error('Failed to load document:', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    loadDocument()
    return () => {
      isMounted = false
    }
  }, [documentId])

  const handleAddAnnotation = (coords: { x: number; y: number }) => {
    if (activeTool !== 'comment' && activeTool !== 'highlight') return

    const newAnn: Annotation = {
      id: `ann_${Date.now()}`,
      pageNumber: viewport.currentPage,
      x: coords.x,
      y: coords.y,
      width: activeTool === 'highlight' ? 0.45 : 0.25,
      height: activeTool === 'highlight' ? 0.04 : 0.08,
      color: activeTool === 'highlight' ? '#FFD166' : '#EF476F',
      comment: newCommentText || 'Review retention limit against treaty attachment clause 4.2',
      authorName: 'Marcus Vance (Underwriter)',
      createdAt: new Date().toISOString(),
      type: activeTool === 'highlight' ? 'highlight' : 'pin',
    }

    documentApi.saveAnnotation(newAnn).then((saved) => {
      setAnnotations((prev) => [...prev, saved])
      setSelectedAnnotationId(saved.id)
      setNewCommentText('')
    })
  }

  const handleAddSidebarComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommentText.trim()) return

    const newAnn: Annotation = {
      id: `ann_${Date.now()}`,
      pageNumber: viewport.currentPage,
      x: 0.15,
      y: 0.35 + (annotations.filter((a) => a.pageNumber === viewport.currentPage).length * 0.12),
      width: 0.7,
      height: 0.05,
      color: '#457B9D',
      comment: newCommentText,
      authorName: 'Marcus Vance (Underwriter)',
      createdAt: new Date().toISOString(),
      type: 'pin',
    }

    documentApi.saveAnnotation(newAnn).then((saved) => {
      setAnnotations((prev) => [...prev, saved])
      setSelectedAnnotationId(saved.id)
      setNewCommentText('')
    })
  }

  const handleExecuteOperation = (
    op: 'split' | 'merge' | 'extract' | 'rotate' | 'delete',
    params: Record<string, unknown>
  ) => {
    console.log(`Executed page operation: ${op}`, params)
    if (op === 'delete') {
      setPages((prev) => prev.filter((p) => p.pageNumber !== viewport.currentPage))
      setCurrentPage(Math.max(1, viewport.currentPage - 1))
    } else if (op === 'split') {
      const splitPoint = Number(params.splitPage || 1)
      setPages((prev) => prev.slice(0, splitPoint))
      setCurrentPage(1)
    } else if (op === 'merge') {
      const extraPages: DocumentPage[] = Array.from({ length: 6 }, (_, i) => ({
        pageNumber: pages.length + i + 1,
        width: 800,
        height: 1130,
        rotation: 0,
      }))
      setPages((prev) => [...prev, ...extraPages])
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="lg" label="Streaming document chunk buffer (HTTP Range: 0-2097151)..." />
      </div>
    )
  }

  const currentPageAnnotations = annotations.filter((a) => a.pageNumber === viewport.currentPage)

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {onClose && (
            <button className="ui-btn ui-btn--ghost ui-btn--sm" onClick={onClose}>
              ← Back to Grid
            </button>
          )}
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>{docMeta?.fileName}</h2>
            <span className={styles.metaBadge}>
              {formatBytes(docMeta?.fileSizeBytes || 0)} • {pages.length} Pages • Range-Chunk Streaming
            </span>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button
            className={`ui-btn ui-btn--ghost ui-btn--sm ${isSidebarCommentsOpen ? 'font-bold' : ''}`}
            onClick={() => setIsSidebarCommentsOpen((prev) => !prev)}
            title="Toggle Commentary Sidebar"
          >
            💬 Comments ({currentPageAnnotations.length})
          </button>
          <div className={styles.workerStatusTag}>
            <span className={styles.workerDot} />
            <span>Worker Pool: 2 Active Threads</span>
          </div>
        </div>
      </header>

      <DocumentToolbar
        currentPage={viewport.currentPage}
        totalPages={pages.length}
        zoom={viewport.zoom}
        rotation={viewport.rotation}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={() => setZoom(1.0)}
        onRotate={rotateClockwise}
        onPrevPage={() => setCurrentPage(Math.max(1, viewport.currentPage - 1))}
        onNextPage={() => setCurrentPage(Math.min(pages.length, viewport.currentPage + 1))}
        onOpenOperations={() => setIsOperationsOpen(true)}
        activeTool={activeTool}
        onSelectTool={setActiveTool}
      />

      <div className={styles.mainContent}>
        <ThumbnailBar
          pages={pages}
          currentPage={viewport.currentPage}
          onSelectPage={setCurrentPage}
        />

        <div className={styles.canvasViewport}>
          <div
            className={styles.canvasSheet}
            style={{
              transform: `scale(${viewport.zoom}) rotate(${viewport.rotation}deg)`,
              transformOrigin: 'top center',
            }}
          >
            {/* High-Resolution Document Treaty Page */}
            <div className={styles.sheetContent}>
              <div className={styles.watermark}>SWISS REINSURANCE COMPANY LTD</div>
              <div className={styles.sheetHeader}>
                <h3 className={styles.sheetHeading}>TREATY EXCESS OF LOSS REINSURANCE AGREEMENT</h3>
                <p className={styles.sheetSub}>Schedule Reference: SR-2026-T88192 | Page {viewport.currentPage} of {pages.length}</p>
              </div>

              <div className={styles.sheetBody}>
                <h4 className={styles.articleTitle}>ARTICLE III — RETENTION AND LIMIT</h4>
                <p>
                  The Reinsurer agrees to indemnify the Company in respect of the liability
                  which may accrue to the Company as a result of any Loss Occurrence
                  commencing during the Period of this Agreement under any Policy or Policies
                  classified by the Company as Property and Casualty Business.
                </p>

                <h4 className={styles.articleTitle}>ARTICLE IV — SPECIAL EXCLUSIONS & WAR RISKS</h4>
                <p>
                  This Agreement does not cover any loss, damage, liability or expense
                  directly or indirectly caused by or contributed to by nuclear reaction,
                  radiation, radioactive contamination, or cyber-warfare perils exceeding the
                  sub-limit threshold of USD 25,000,000.
                </p>

                <div className={styles.sheetTable}>
                  <div className={mergeClasses(styles.sheetTr, 'font-bold')}>
                    <span>Coverage Section</span>
                    <span>Ultimate Net Loss</span>
                    <span>Reinsurer Participation</span>
                  </div>
                  <div className={styles.sheetTr}>
                    <span>Section A (Property Cat)</span>
                    <span>$100,000,000</span>
                    <span>100% of $50,000,000 xs $50,000,000</span>
                  </div>
                  <div className={styles.sheetTr}>
                    <span>Section B (Casualty Clash)</span>
                    <span>$50,000,000</span>
                    <span>100% of $25,000,000 xs $25,000,000</span>
                  </div>
                </div>
              </div>

              <div className={styles.sheetFooter}>
                <span>Confidential — For Internal Swiss Re Underwriting Use Only</span>
                <span>Page {viewport.currentPage} of {pages.length}</span>
              </div>
            </div>

            <AnnotationLayer
              annotations={annotations}
              pageNumber={viewport.currentPage}
              selectedAnnotationId={selectedAnnotationId}
              onSelectAnnotation={setSelectedAnnotationId}
              onAddAnnotationPrompt={handleAddAnnotation}
            />
          </div>
        </div>

        {isSidebarCommentsOpen && (
          <aside className={styles.commentsSidebar}>
            <div className={styles.commentsHeader}>
              <h4 className={styles.commentsTitle}>Page {viewport.currentPage} Commentary</h4>
              <span style={{ fontSize: '11px', color: tokens.colorTextSub }}>{currentPageAnnotations.length} annotations</span>
            </div>

            <div className={styles.commentsList}>
              {currentPageAnnotations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 10px', color: tokens.colorTextSub, fontSize: '12px' }}>
                  <p style={{ margin: 0 }}>No annotations on this page.</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: tokens.colorTextMuted }}>Use Highlight or Comment tool on the toolbar or write below.</p>
                </div>
              ) : (
                currentPageAnnotations.map((ann) => (
                  <div
                    key={ann.id}
                    className={mergeClasses(
                      styles.commentCard,
                      selectedAnnotationId === ann.id && styles.commentCardActive
                    )}
                    onClick={() => setSelectedAnnotationId(ann.id)}
                  >
                    <div className={styles.commentHead}>
                      <span className={styles.commentAuthor}>{ann.authorName}</span>
                      <span className={styles.commentTime}>{formatDate(ann.createdAt)}</span>
                    </div>
                    <p className={styles.commentBody}>{ann.comment}</p>
                  </div>
                ))
              )}
            </div>

            <AuthzGate requiredPermissions={['documents:annotate']}>
              <form onSubmit={handleAddSidebarComment} className={styles.commentForm}>
                <input
                  type="text"
                  className="ui-input"
                  placeholder="Add note to page..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button type="submit" className="ui-btn ui-btn--primary ui-btn--sm" style={{ marginTop: '6px', width: '100%' }}>
                  Post Comment
                </button>
              </form>
            </AuthzGate>
          </aside>
        )}
      </div>

      {isOperationsOpen && (
        <Suspense fallback={null}>
          <PageOperationsModal
            isOpen={isOperationsOpen}
            onClose={() => setIsOperationsOpen(false)}
            currentPage={viewport.currentPage}
            totalPages={pages.length}
            documentName={docMeta?.fileName || 'Document.pdf'}
            onExecuteOperation={handleExecuteOperation}
          />
        </Suspense>
      )}
    </div>
  )
}
