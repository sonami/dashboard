import type { Claim, LineOfBusiness, ClaimStatus, ClaimPriority } from '../../common/types/claim'

const LOB_LIST: LineOfBusiness[] = ['Property', 'Casualty', 'Life & Health', 'Aviation', 'Marine', 'Cyber']
const PRIORITY_LIST: ClaimPriority[] = ['Critical', 'High', 'Medium', 'Low']

const SEED_CUSTOMERS: Array<{
  customerName: string
  company: string
  phoneNumber: string
  email: string
  country: string
  status: ClaimStatus
}> = [
  { customerName: 'Jane Cooper', company: 'Microsoft', phoneNumber: '(225) 555-0118', email: 'jane@microsoft.com', country: 'United States', status: 'Active' },
  { customerName: 'Floyd Miles', company: 'Yahoo', phoneNumber: '(205) 555-0100', email: 'floyd@yahoo.com', country: 'Kiribati', status: 'Inactive' },
  { customerName: 'Ronald Richards', company: 'Adobe', phoneNumber: '(302) 555-0107', email: 'ronald@adobe.com', country: 'Israel', status: 'Inactive' },
  { customerName: 'Marvin McKinney', company: 'Tesla', phoneNumber: '(252) 555-0126', email: 'marvin@tesla.com', country: 'Iran', status: 'Active' },
  { customerName: 'Jerome Bell', company: 'Google', phoneNumber: '(629) 555-0129', email: 'jerome@google.com', country: 'Réunion', status: 'Active' },
  { customerName: 'Kathryn Murphy', company: 'Microsoft', phoneNumber: '(406) 555-0120', email: 'kathryn@microsoft.com', country: 'Curaçao', status: 'Active' },
  { customerName: 'Jacob Jones', company: 'Yahoo', phoneNumber: '(208) 555-0112', email: 'jacob@yahoo.com', country: 'Brazil', status: 'Active' },
  { customerName: 'Kristin Watson', company: 'Facebook', phoneNumber: '(704) 555-0127', email: 'kristin@facebook.com', country: 'Åland Islands', status: 'Inactive' },
]

const FIRST_NAMES = ['Savannah', 'Wade', 'Esther', 'Cameron', 'Leslie', 'Guy', 'Albert', 'Eleanor', 'Devon', 'Courtney', 'Arlene', 'Cody']
const LAST_NAMES = ['Nguyen', 'Warren', 'Howard', 'Williamson', 'Fox', 'Hawkins', 'Flores', 'Pena', 'Lane', 'Henry', 'McCoy', 'Fisher']
const COMPANIES = ['Apple', 'Amazon', 'Spotify', 'Netflix', 'Salesforce', 'Oracle', 'IBM', 'Intel', 'Cisco', 'Stripe']
const COUNTRIES = ['Switzerland', 'Germany', 'United Kingdom', 'Canada', 'Australia', 'Japan', 'France', 'Netherlands', 'Singapore']
const ANALYSTS = ['Marcus Vance', 'Elena Rostova', 'Kenji Sato', 'Sarah Jenkins', 'Liam O’Connor']

export function generateMockClaims(count: number = 20000): Claim[] {
  const claims: Claim[] = []

  // Insert seed rows first
  SEED_CUSTOMERS.forEach((seed, i) => {
    const lob = LOB_LIST[i % LOB_LIST.length]
    const priority = PRIORITY_LIST[i % PRIORITY_LIST.length]
    const incurred = 120000 + (i * 45000)
    const paid = Math.floor(incurred * 0.4)
    const reserved = incurred - paid

    claims.push({
      id: `CLM-${100001 + i}`,
      claimNumber: `SR-2026-${String(i + 1).padStart(6, '0')}`,
      customerName: seed.customerName,
      company: seed.company,
      phoneNumber: seed.phoneNumber,
      email: seed.email,
      country: seed.country,
      status: seed.status,
      policyId: `POL-RE-${1000 + i}`,
      cedantName: seed.company,
      lineOfBusiness: lob,
      lossDate: new Date(2025, (i % 12), (i % 28) + 1).toISOString(),
      reportedDate: new Date(2026, ((i + 1) % 12), (i % 28) + 1).toISOString(),
      incurredAmount: incurred,
      reservedAmount: reserved,
      paidAmount: paid,
      currency: 'USD',
      priority,
      riskScore: 20 + ((i * 11) % 75),
      assignedAnalyst: ANALYSTS[i % ANALYSTS.length],
      jurisdiction: seed.country,
      hasDocuments: true,
      documentCount: (i % 5) + 1,
    })
  })

  // Generate remainder up to count (20k+)
  for (let i = SEED_CUSTOMERS.length + 1; i <= count; i++) {
    const fName = FIRST_NAMES[i % FIRST_NAMES.length]
    const lName = LAST_NAMES[i % LAST_NAMES.length]
    const fullName = `${fName} ${lName}`
    const company = COMPANIES[i % COMPANIES.length]
    const country = COUNTRIES[i % COUNTRIES.length]
    const lob = LOB_LIST[i % LOB_LIST.length]
    const status: ClaimStatus = i % 3 === 0 ? 'Inactive' : 'Active'
    const priority = PRIORITY_LIST[i % PRIORITY_LIST.length]
    const analyst = ANALYSTS[i % ANALYSTS.length]

    const incurred = 50000 + ((i * 1337) % 15000000)
    const paid = Math.floor(incurred * ((i % 5) * 0.2))
    const reserved = incurred - paid
    const riskScore = 15 + ((i * 29) % 85)

    claims.push({
      id: `CLM-${100000 + i}`,
      claimNumber: `SR-2026-${String(i).padStart(6, '0')}`,
      customerName: fullName,
      company,
      phoneNumber: `(${100 + (i % 900)}) 555-${String(1000 + (i % 9000)).slice(1)}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}@${company.toLowerCase()}.com`,
      country,
      status,
      policyId: `POL-RE-${String(1000 + (i % 500))}`,
      cedantName: company,
      lineOfBusiness: lob,
      lossDate: new Date(2025, (i % 12), (i % 28) + 1).toISOString(),
      reportedDate: new Date(2026, ((i + 1) % 12), (i % 28) + 1).toISOString(),
      incurredAmount: incurred,
      reservedAmount: reserved,
      paidAmount: paid,
      currency: i % 3 === 0 ? 'CHF' : i % 2 === 0 ? 'EUR' : 'USD',
      priority,
      riskScore,
      assignedAnalyst: analyst,
      jurisdiction: country,
      hasDocuments: i % 2 === 0,
      documentCount: (i % 7) + 1,
    })
  }

  return claims
}

export const MOCK_CLAIMS = generateMockClaims(20000)
