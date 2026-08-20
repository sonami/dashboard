import type { Claim } from '../../../common/types/claim'

export interface ColumnDef<T = Claim> {
  key: keyof T | 'actions'
  label: string
  width?: number
  minWidth?: number
  sortable?: boolean
  render?: (item: T) => React.ReactNode
}

export interface GridFilterState {
  search: string
  status: string
  priority: string
  lineOfBusiness: string
  minAmount?: number
  maxAmount?: number
}

export interface GridSortState {
  column: keyof Claim
  direction: 'asc' | 'desc'
}
