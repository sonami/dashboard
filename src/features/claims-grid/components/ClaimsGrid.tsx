import React, { useState, Suspense, lazy } from 'react'
import { mergeClasses } from '@griffel/react'
import { useClaimsGrid } from '../hooks/useClaimsGrid'
import { KpiStatsRow } from './KpiStatsRow'
import { GridHeader } from './GridHeader'
import { ActionCell } from './ActionCell'
import { Spinner } from '../../../common/components/ui/Spinner'
import { useClaimsGridStyles } from './ClaimsGrid.styles'
import type { Claim } from '../../../common/types/claim'

// On-demand modal chunks
const EditClaimModal = lazy(() =>
  import(/* webpackChunkName: "modal-edit-claim" */ './EditClaimModal').then((m) => ({
    default: m.EditClaimModal,
  }))
)

const AssignAnalystModal = lazy(() =>
  import(/* webpackChunkName: "modal-assign-analyst" */ './AssignAnalystModal').then((m) => ({
    default: m.AssignAnalystModal,
  }))
)

interface ClaimsGridProps {
  onSelectClaimForWorkspace?: (claim: Claim) => void
}

export const ClaimsGrid: React.FC<ClaimsGridProps> = ({ onSelectClaimForWorkspace }) => {
  const styles = useClaimsGridStyles()
  const {
    claims,
    totalCount,
    isLoading,
    filters,
    sortByOption,
    setSortByOption,
    page,
    pageSize,
    setPage,
    handleFilterChange,
    updateClaim,
    assignClaim,
    deleteClaim,
    approveClaim,
  } = useClaimsGrid()

  const [editingClaim, setEditingClaim] = useState<Claim | null>(null)
  const [assigningClaim, setAssigningClaim] = useState<Claim | null>(null)

  const totalPages = Math.ceil(totalCount / pageSize)
  const startEntry = (page - 1) * pageSize + 1
  const endEntry = Math.min(page * pageSize, totalCount)

  return (
    <div className={styles.layout}>
      {/* 3 Top Stat KPI Cards */}
      <KpiStatsRow />

      {/* Main Customers Table Card */}
      <div className={styles.card}>
        <GridHeader
          filters={filters}
          onFilterChange={handleFilterChange}
          totalCount={totalCount}
          filteredCount={claims.length}
          sortBy={sortByOption}
          onSortChange={setSortByOption}
        />

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Customer Name</th>
                <th className={styles.th}>Company</th>
                <th className={styles.th}>Phone Number</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Country</th>
                <th className={mergeClasses(styles.th, styles.thCenter)}>Status</th>
                <th className={mergeClasses(styles.th, styles.thCenter)}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className={styles.tdCenter} style={{ padding: '40px' }}>
                    <Spinner size="md" label="Loading customer records..." />
                  </td>
                </tr>
              ) : claims.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.tdCenter} style={{ padding: '40px', color: '#7E7E7E' }}>
                    No customer records match your search.
                  </td>
                </tr>
              ) : (
                claims.map((claim) => {
                  const isActive = claim.status === 'Active' || claim.status === 'Approved'

                  return (
                    <tr key={claim.id} className={styles.row}>
                      <td className={mergeClasses(styles.td, styles.nameCell)}>
                        {claim.customerName}
                      </td>
                      <td className={mergeClasses(styles.td, styles.companyCell)}>
                        {claim.company}
                      </td>
                      <td className={styles.td}>
                        <span className={styles.phoneLink}>{claim.phoneNumber}</span>
                      </td>
                      <td className={styles.td}>
                        {claim.email}
                      </td>
                      <td className={styles.td}>
                        {claim.country}
                      </td>
                      <td className={mergeClasses(styles.td, styles.tdCenter)}>
                        <span
                          className={mergeClasses(
                            styles.statusPill,
                            isActive ? styles.statusActive : styles.statusInactive
                          )}
                        >
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className={mergeClasses(styles.td, styles.tdCenter)}>
                        <ActionCell
                          claim={claim}
                          onOpenWorkspace={(c) => onSelectClaimForWorkspace?.(c)}
                          onEdit={(c) => setEditingClaim(c)}
                          onAssign={(c) => setAssigningClaim(c)}
                          onDelete={(c) => {
                            if (confirm(`Are you sure you want to delete ${c.customerName}?`)) {
                              deleteClaim(c.id)
                            }
                          }}
                          onApprove={(c) => approveClaim(c.id)}
                        />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Card Footer with Showing entries count and Pagination */}
        <div className={styles.footer}>
          <span className={styles.footerEntries}>
            Showing data {startEntry} to {endEntry} of 256K entries
          </span>

          <div className={styles.pagination}>
            <button
              className={styles.pageNavBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              &lt;
            </button>

            <button
              className={mergeClasses(styles.pageNumBtn, page === 1 && styles.pageNumBtnActive)}
              onClick={() => setPage(1)}
            >
              1
            </button>

            <button
              className={mergeClasses(styles.pageNumBtn, page === 2 && styles.pageNumBtnActive)}
              onClick={() => setPage(2)}
            >
              2
            </button>

            <button
              className={mergeClasses(styles.pageNumBtn, page === 3 && styles.pageNumBtnActive)}
              onClick={() => setPage(3)}
            >
              3
            </button>

            <button
              className={mergeClasses(styles.pageNumBtn, page === 4 && styles.pageNumBtnActive)}
              onClick={() => setPage(4)}
            >
              4
            </button>

            <span className={styles.pageEllipsis}>...</span>

            <button
              className={mergeClasses(styles.pageNumBtn, page === 40 && styles.pageNumBtnActive)}
              onClick={() => setPage(40)}
            >
              40
            </button>

            <button
              className={styles.pageNavBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {editingClaim && (
        <Suspense fallback={null}>
          <EditClaimModal
            claim={editingClaim}
            isOpen={!!editingClaim}
            onClose={() => setEditingClaim(null)}
            onSave={updateClaim}
          />
        </Suspense>
      )}

      {assigningClaim && (
        <Suspense fallback={null}>
          <AssignAnalystModal
            claim={assigningClaim}
            isOpen={!!assigningClaim}
            onClose={() => setAssigningClaim(null)}
            onAssign={assignClaim}
          />
        </Suspense>
      )}
    </div>
  )
}
