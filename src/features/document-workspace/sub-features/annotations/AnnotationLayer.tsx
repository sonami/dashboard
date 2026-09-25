import React from 'react'
import { mergeClasses } from '@griffel/react'
import type { Annotation } from '../../../../common/types/document'
import { AuthzGate } from '../../../../common/components/AuthzGate'
import { formatDate } from '../../../../common/utils/formatters'
import { useAnnotationStyles } from './AnnotationLayer.styles'

interface AnnotationLayerProps {
  annotations: Annotation[]
  pageNumber: number
  selectedAnnotationId: string | null
  onSelectAnnotation: (id: string | null) => void
  onAddAnnotationPrompt?: (coords: { x: number; y: number }) => void
}

export const AnnotationLayer: React.FC<AnnotationLayerProps> = ({
  annotations,
  pageNumber,
  selectedAnnotationId,
  onSelectAnnotation,
  onAddAnnotationPrompt,
}) => {
  const styles = useAnnotationStyles()
  const pageAnnotations = annotations.filter((a) => a.pageNumber === pageNumber)

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    if ((e.target as HTMLElement).getAttribute('data-annotation-root') === 'true') {
      onSelectAnnotation(null)
      onAddAnnotationPrompt?.({ x, y })
    }
  }

  return (
    <div
      className={styles.root}
      data-annotation-root="true"
      onClick={handleCanvasClick}
    >
      {pageAnnotations.map((ann) => {
        const isSelected = ann.id === selectedAnnotationId

        return (
          <div
            key={ann.id}
            className={mergeClasses(styles.box, isSelected && styles.boxSelected)}
            onClick={(e) => {
              e.stopPropagation()
              onSelectAnnotation(ann.id)
            }}
            style={{
              left: `${ann.x * 100}%`,
              top: `${ann.y * 100}%`,
              width: `${ann.width * 100}%`,
              height: `${ann.height * 100}%`,
              borderColor: ann.color,
              backgroundColor: `${ann.color}22`,
            }}
          >
            <div
              className={styles.pinBadge}
              style={{ backgroundColor: ann.color }}
              title={`${ann.authorName}: ${ann.comment}`}
            >
              💬
            </div>

            {isSelected && (
              <div
                className={styles.popover}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.popoverHead}>
                  <span className={styles.author}>{ann.authorName}</span>
                  <span className={styles.date}>{formatDate(ann.createdAt)}</span>
                </div>
                <p className={styles.body}>{ann.comment}</p>
                <AuthzGate requiredPermissions={['documents:annotate']}>
                  <div className={styles.actions}>
                    <button className="ui-btn ui-btn--ghost ui-btn--sm">Reply</button>
                    <button className="ui-btn ui-btn--ghost ui-btn--sm text-danger">Delete</button>
                  </div>
                </AuthzGate>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
