import React from 'react'
import { mergeClasses } from '@griffel/react'
import { Button } from '../../../common/components/ui/Button'
import { AuthzGate } from '../../../common/components/AuthzGate'
import { useToolbarStyles } from './DocumentToolbar.styles'

interface DocumentToolbarProps {
  currentPage: number
  totalPages: number
  zoom: number
  rotation: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onRotate: () => void
  onPrevPage: () => void
  onNextPage: () => void
  onOpenOperations: () => void
  activeTool: string
  onSelectTool: (tool: 'select' | 'highlight' | 'rectangle' | 'comment' | 'pan') => void
}

export const DocumentToolbar: React.FC<DocumentToolbarProps> = ({
  currentPage,
  totalPages,
  zoom,
  rotation,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onRotate,
  onPrevPage,
  onNextPage,
  onOpenOperations,
  activeTool,
  onSelectTool,
}) => {
  const styles = useToolbarStyles()

  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <Button
          size="sm"
          variant="ghost"
          onClick={onPrevPage}
          disabled={currentPage <= 1}
          title="Previous Page"
        >
          ◀
        </Button>
        <span className={styles.pageBadge}>
          Page {currentPage} / {totalPages}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          title="Next Page"
        >
          ▶
        </Button>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <Button size="sm" variant="ghost" onClick={onZoomOut} title="Zoom Out">
          －
        </Button>
        <button
          className={styles.zoomBtn}
          onClick={onResetZoom}
          title="Click to reset to 100%"
        >
          {Math.round(zoom * 100)}%
        </button>
        <Button size="sm" variant="ghost" onClick={onZoomIn} title="Zoom In">
          ＋
        </Button>
        <Button size="sm" variant="ghost" onClick={onRotate} title="Rotate 90°">
          ↻ {rotation > 0 ? `${rotation}°` : ''}
        </Button>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <button
          className={mergeClasses(styles.toolBtn, activeTool === 'select' && styles.toolBtnActive)}
          onClick={() => onSelectTool('select')}
          title="Select / Pointer"
        >
          ↖ Pointer
        </button>

        <AuthzGate requiredPermissions={['documents:annotate']}>
          <button
            className={mergeClasses(styles.toolBtn, activeTool === 'highlight' && styles.toolBtnActive)}
            onClick={() => onSelectTool('highlight')}
            title="Highlight Clause"
          >
            🖍 Highlight
          </button>
          <button
            className={mergeClasses(styles.toolBtn, activeTool === 'comment' && styles.toolBtnActive)}
            onClick={() => onSelectTool('comment')}
            title="Add Commentary"
          >
            💬 Comment
          </button>
        </AuthzGate>
      </div>

      <div className={styles.rightGroup}>
        <AuthzGate requiredPermissions={['documents:manage_pages']}>
          <Button size="sm" variant="secondary" onClick={onOpenOperations}>
            ⚙ Page Operations & Split
          </Button>
        </AuthzGate>
      </div>
    </div>
  )
}
