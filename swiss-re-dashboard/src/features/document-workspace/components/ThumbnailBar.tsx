import React from 'react'
import { mergeClasses } from '@griffel/react'
import { useThumbnailStyles } from './ThumbnailBar.styles'
import type { DocumentPage } from '../../../common/types/document'

interface ThumbnailBarProps {
  pages: DocumentPage[]
  currentPage: number
  onSelectPage: (pageNumber: number) => void
}

export const ThumbnailBar: React.FC<ThumbnailBarProps> = ({
  pages,
  currentPage,
  onSelectPage,
}) => {
  const styles = useThumbnailStyles()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span>Pages ({pages.length})</span>
      </div>

      <div className={styles.list}>
        {pages.map((page) => {
          const isActive = page.pageNumber === currentPage

          return (
            <div
              key={page.pageNumber}
              className={mergeClasses(styles.item, isActive && styles.itemActive)}
              onClick={() => onSelectPage(page.pageNumber)}
            >
              <div className={styles.preview}>
                <div style={{ width: '80%', height: '80%', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }} />
              </div>
              <span className={styles.pageNumber}>Page {page.pageNumber}</span>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
