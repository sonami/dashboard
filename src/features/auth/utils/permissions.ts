import type { User, UserRole, Permission } from '../../../common/types/user'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  Admin: [
    'claims:read',
    'claims:write',
    'claims:approve',
    'claims:assign',
    'claims:delete',
    'claims:export',
    'documents:read',
    'documents:annotate',
    'documents:manage_pages',
    'documents:merge',
    'admin:access',
  ],
  Underwriter: [
    'claims:read',
    'claims:write',
    'claims:approve',
    'claims:assign',
    'claims:export',
    'documents:read',
    'documents:annotate',
  ],
  ClaimsAnalyst: [
    'claims:read',
    'claims:write',
    'claims:assign',
    'claims:export',
    'documents:read',
    'documents:annotate',
    'documents:manage_pages',
    'documents:merge',
  ],
  Actuary: [
    'claims:read',
    'claims:export',
    'documents:read',
  ],
  Auditor: [
    'claims:read',
    'claims:export',
    'documents:read',
  ],
}

export function hasRequiredPermissions(
  user: User | null,
  requiredPermissions: Permission[],
  requireAll: boolean = false
): boolean {
  if (!user) return false
  if (user.role === 'Admin') return true

  if (requireAll) {
    return requiredPermissions.every((perm) => user.permissions.includes(perm))
  }
  return requiredPermissions.some((perm) => user.permissions.includes(perm))
}

export function hasRequiredRoles(
  user: User | null,
  requiredRoles: UserRole[]
): boolean {
  if (!user) return false
  return requiredRoles.includes(user.role)
}
