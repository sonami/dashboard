import React from 'react'
import type { Permission, UserRole } from '../types/user'
import { hasRequiredPermissions, hasRequiredRoles } from '../../features/auth/utils/permissions'
import { useAuthStore } from '../../features/auth/store/authStore'

export interface AuthzGateProps {
  children: React.ReactNode
  requiredPermissions?: Permission[]
  requiredRoles?: UserRole[]
  fallback?: React.ReactNode
  requireAll?: boolean
}

/**
 * RBAC wrapper component that conditionally renders UI controls based on permissions or roles.
 */
export const AuthzGate: React.FC<AuthzGateProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  fallback = null,
  requireAll = false,
}) => {
  const { user } = useAuthStore()

  if (!user) {
    return <>{fallback}</>
  }

  const roleGranted =
    requiredRoles.length === 0 || hasRequiredRoles(user, requiredRoles)

  const permissionGranted =
    requiredPermissions.length === 0 ||
    hasRequiredPermissions(user, requiredPermissions, requireAll)

  if (roleGranted && permissionGranted) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
