export type UserRole = 'Underwriter' | 'ClaimsAnalyst' | 'Actuary' | 'Admin' | 'Auditor'

export type Permission =
  | 'claims:read'
  | 'claims:write'
  | 'claims:approve'
  | 'claims:assign'
  | 'claims:delete'
  | 'claims:export'
  | 'documents:read'
  | 'documents:annotate'
  | 'documents:manage_pages'
  | 'documents:merge'
  | 'admin:access'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl?: string
  department: string
  permissions: Permission[]
}
