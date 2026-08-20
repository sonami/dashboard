import React from 'react'
import { useAuthStore } from '../../features/auth/store/authStore'
import { useHeaderStyles } from './Header.styles'
import type { UserRole } from '../../common/types/user'

export const Header: React.FC = () => {
  const styles = useHeaderStyles()
  const { user, setRole } = useAuthStore()
  const roles: UserRole[] = ['Underwriter', 'ClaimsAnalyst', 'Actuary', 'Admin', 'Auditor']

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.greetingTitle}>Hello Evano 👋,</h1>
      </div>

      <div className={styles.actionsBlock}>
        {/* Global Search Bar */}
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7E7E7E" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
          />
        </div>

        {/* RBAC Role Switcher */}
        <div className={styles.rbacBadge}>
          <span className={styles.rbacTagText}>Role:</span>
          <select
            className={styles.rbacSelect}
            value={user?.role || 'Underwriter'}
            onChange={(e) => setRole(e.target.value as UserRole)}
            title="Switch roles to test RBAC capabilities"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
