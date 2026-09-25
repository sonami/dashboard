export type ClaimStatus = 'Active' | 'Inactive' | 'UnderReview' | 'Approved' | 'Flagged' | 'Settled'
export type ClaimPriority = 'Critical' | 'High' | 'Medium' | 'Low'
export type LineOfBusiness = 'Property' | 'Casualty' | 'Life & Health' | 'Aviation' | 'Marine' | 'Cyber'

export interface Claim {
  id: string
  claimNumber: string
  customerName: string
  company: string
  phoneNumber: string
  email: string
  country: string
  policyId: string
  cedantName: string
  lineOfBusiness: LineOfBusiness
  lossDate: string
  reportedDate: string
  incurredAmount: number
  reservedAmount: number
  paidAmount: number
  currency: 'USD' | 'EUR' | 'CHF' | 'GBP' | 'JPY'
  status: ClaimStatus
  priority: ClaimPriority
  riskScore: number // 0 - 100
  assignedAnalyst: string
  jurisdiction: string
  hasDocuments: boolean
  documentCount: number
}
