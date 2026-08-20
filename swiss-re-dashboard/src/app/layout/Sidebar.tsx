import React from 'react'
import { mergeClasses } from '@griffel/react'
import { useSidebarStyles } from './Sidebar.styles'

export type NavTab = 'dashboard' | 'product' | 'customers' | 'income' | 'promote' | 'help' | 'claims' | 'document-workspace' | 'analytics' | 'admin'

interface SidebarProps {
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const styles = useSidebarStyles()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <circle cx="12" cy="12" r="3.5"></circle>
            </svg>
          </div>
          <div className={styles.logoBrandText}>
            <span className={styles.logoTitle}>Dashboard</span>
            <span className={styles.logoVersion}>v.01</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className={styles.navMenu}>
          {/* Dashboard */}
          <button
            className={mergeClasses(styles.navBtn, activeTab === 'dashboard' && styles.navBtnActive)}
            onClick={() => onSelectTab('dashboard')}
          >
            <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className={styles.navText}>Dashboard</span>
          </button>

          {/* Product */}
          <button
            className={mergeClasses(styles.navBtn, activeTab === 'product' && styles.navBtnActive)}
            onClick={() => onSelectTab('product')}
          >
            <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span className={styles.navText}>Product</span>
            <span className={styles.navChevron}>›</span>
          </button>

          {/* Customers */}
          <button
            className={mergeClasses(
              styles.navBtn,
              (activeTab === 'customers' || activeTab === 'claims') && styles.navBtnActive
            )}
            onClick={() => onSelectTab('customers')}
          >
            <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className={styles.navText} style={{ fontWeight: 600 }}>Customers</span>
            <span className={styles.navChevron}>›</span>
          </button>

          {/* Income */}
          <button
            className={mergeClasses(styles.navBtn, activeTab === 'income' && styles.navBtnActive)}
            onClick={() => onSelectTab('income')}
          >
            <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span className={styles.navText}>Income</span>
            <span className={styles.navChevron}>›</span>
          </button>

          {/* Promote */}
          <button
            className={mergeClasses(styles.navBtn, activeTab === 'promote' && styles.navBtnActive)}
            onClick={() => onSelectTab('promote')}
          >
            <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className={styles.navText}>Promote</span>
            <span className={styles.navChevron}>›</span>
          </button>

          {/* Help */}
          <button
            className={mergeClasses(
              styles.navBtn,
              (activeTab === 'help' || activeTab === 'document-workspace') && styles.navBtnActive
            )}
            onClick={() => onSelectTab('help')}
          >
            <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span className={styles.navText}>Help</span>
            <span className={styles.navChevron}>›</span>
          </button>
        </nav>
      </div>

      <div className={styles.bottomSection}>
        {/* Upgrade to PRO Card */}
        <div className={styles.proUpgradeCard}>
          <h4 className={styles.proTitle}>Upgrade to PRO to get access all Features!</h4>
          <button className={styles.proBtn}>Get Pro Now!</button>
        </div>

        {/* User Profile Footer */}
        <div className={styles.userFooter}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
            alt="Evano"
            className={styles.userImg}
          />
          <div className={styles.userText}>
            <span className={styles.userName}>Evano</span>
            <span className={styles.userRole}>Project Manager</span>
          </div>
          <span className={styles.userDropdownArrow}>⌵</span>
        </div>
      </div>
    </aside>
  )
}
