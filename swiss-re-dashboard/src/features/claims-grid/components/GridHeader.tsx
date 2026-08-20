import React from 'react'
import { useGridHeaderStyles } from './GridHeader.styles'
import type { GridFilterState } from '../types/grid.types'

interface GridHeaderProps {
  filters: GridFilterState
  onFilterChange: (key: keyof GridFilterState, value: string) => void
  totalCount: number
  filteredCount: number
  sortBy: string
  onSortChange: (sort: string) => void
}

export const GridHeader: React.FC<GridHeaderProps> = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
}) => {
  const styles = useGridHeaderStyles()

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h2 className={styles.title}>All Customers</h2>
        <span className={styles.subtitle}>Active Members</span>
      </div>

      <div className={styles.right}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7E7E7E" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>

        <div className={styles.sortWrapper}>
          <span className={styles.sortLabel}>Short by :</span>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="customerName">Customer Name</option>
            <option value="company">Company</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  )
}
