import { MOCK_CLAIMS } from '../data/claimsData'
import type { Claim } from '../../common/types/claim'

export interface ClaimsQueryParams {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  priority?: string
  lineOfBusiness?: string
  sortBy?: keyof Claim | 'newest' | 'oldest'
  sortOrder?: 'asc' | 'desc'
}

export function handleGetClaims(params: ClaimsQueryParams = {}) {
  const {
    page = 1,
    pageSize = 8,
    search = '',
    status,
    priority,
    lineOfBusiness,
    sortBy,
    sortOrder = 'desc',
  } = params

  let filtered = [...MOCK_CLAIMS]

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (c) =>
        c.customerName.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.phoneNumber.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.claimNumber.toLowerCase().includes(q) ||
        c.assignedAnalyst.toLowerCase().includes(q)
    )
  }

  if (status && status !== 'ALL') {
    filtered = filtered.filter((c) => c.status.toLowerCase() === status.toLowerCase())
  }

  if (priority && priority !== 'ALL') {
    filtered = filtered.filter((c) => c.priority === priority)
  }

  if (lineOfBusiness && lineOfBusiness !== 'ALL') {
    filtered = filtered.filter((c) => c.lineOfBusiness === lineOfBusiness)
  }

  if (sortBy && sortBy !== 'newest') {
    filtered.sort((a, b) => {
      const key = sortBy as keyof Claim
      const valA = a[key]
      const valB = b[key]
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA
      }
      return 0
    })
  }

  const total = filtered.length
  const startIndex = (page - 1) * pageSize
  const items = filtered.slice(startIndex, startIndex + pageSize)

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}
