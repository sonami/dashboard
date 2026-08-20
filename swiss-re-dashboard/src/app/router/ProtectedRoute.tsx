import React from 'react'
import type { Permission, UserRole } from '../../common/types/user'
import { useAuthStore } from '../../features/auth/store/authStore'
import { hasRequiredPermissions, hasRequiredRoles } from '../../features/auth/utils/permissions'
import { useProtectedStyles } from './ProtectedRoute.styles'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: Permission[]
  requiredRoles?: UserRole[]
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  fallback,
}) => {
  const styles = useProtectedStyles()
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.deniedCard}>
        <h3 className={styles.title}>Authentication Required</h3>
        <p className={styles.desc}>Please sign in to access this reinsurance domain.</p>
      </div>
    )
  }

  const roleGranted =
    requiredRoles.length === 0 || hasRequiredRoles(user, requiredRoles)

  const permissionGranted =
    requiredPermissions.length === 0 ||
    hasRequiredPermissions(user, requiredPermissions)

  if (!roleGranted || !permissionGranted) {
    return (
      fallback || (
        <div className={styles.deniedCard}>
          <h3 className={styles.title}>403 — Access Restricted</h3>
          <p className={styles.desc}>
            Your current role (<strong>{user.role}</strong>) does not have authorization
            to access this module.
          </p>
        </div>
      )
    )
  }

  return <>{children}</>
}
