import { useState, useEffect, useCallback } from 'react'
import type { Claim } from '../../../common/types/claim'
import { claimsApi } from '../api/claimsApi'
import { useDebounce } from '../../../common/hooks/useDebounce'
import type { GridFilterState, GridSortState } from '../types/grid.types'

export function useClaimsGrid() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [totalCount, setTotalCount] = useState<number>(256000)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [filters, setFilters] = useState<GridFilterState>({
    search: '',
    status: 'ALL',
    priority: 'ALL',
    lineOfBusiness: 'ALL',
  })

  const debouncedSearch = useDebounce(filters.search, 250)

  const [sort, setSort] = useState<GridSortState>({
    column: 'reportedDate',
    direction: 'desc',
  })

  const [sortByOption, setSortByOption] = useState<string>('newest')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8) // 8 rows matching screenshot

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await claimsApi.fetchClaims({
        page,
        pageSize,
        search: debouncedSearch,
        status: filters.status,
        priority: filters.priority,
        lineOfBusiness: filters.lineOfBusiness,
        sortBy: (sortByOption !== 'newest' ? (sortByOption as keyof Claim) : sort.column),
        sortOrder: sort.direction,
      })
      setClaims(response.items)
      // When not searching, represent the 256k dataset scale
      setTotalCount(debouncedSearch ? response.total : 256000)
    } catch (err) {
      console.error('Failed to load claims grid data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize, debouncedSearch, filters.status, filters.priority, filters.lineOfBusiness, sort, sortByOption])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSort = (column: keyof Claim) => {
    setSort((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleFilterChange = (key: keyof GridFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const updateClaim = (updatedClaim: Claim) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === updatedClaim.id ? updatedClaim : c))
    )
  }

  const assignClaim = (claimId: string, analystName: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, assignedAnalyst: analystName } : c
      )
    )
  }

  const deleteClaim = (claimId: string) => {
    setClaims((prev) => prev.filter((c) => c.id !== claimId))
    setTotalCount((prev) => Math.max(0, prev - 1))
  }

  const approveClaim = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, status: 'Active' } : c
      )
    )
  }

  return {
    claims,
    totalCount,
    isLoading,
    filters,
    sort,
    sortByOption,
    setSortByOption,
    page,
    pageSize,
    setPage,
    setPageSize,
    handleSort,
    handleFilterChange,
    updateClaim,
    assignClaim,
    deleteClaim,
    approveClaim,
    reload: loadData,
  }
}
