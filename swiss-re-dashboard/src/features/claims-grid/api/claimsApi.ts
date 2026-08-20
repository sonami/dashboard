import { mockService } from '../../../mocks/browser'
import type { ClaimsQueryParams } from '../../../mocks/handlers/claimsHandler'
import type { Claim } from '../../../common/types/claim'

export interface ClaimsResponse {
  items: Claim[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const claimsApi = {
  async fetchClaims(params: ClaimsQueryParams = {}): Promise<ClaimsResponse> {
    return mockService.getClaims(params)
  },

  async approveClaim(claimId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 100))
    console.log(`Approved claim ${claimId}`)
    return true
  },

  async flagClaim(claimId: string, reason: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 100))
    console.log(`Flagged claim ${claimId}: ${reason}`)
    return true
  },
}
