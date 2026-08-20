import React from 'react'
import { useKpiStyles } from './KpiStatsRow.styles'

export const KpiStatsRow: React.FC = () => {
  const styles = useKpiStyles()

  return (
    <div className={styles.container}>
      {/* Stat 1: Total Customers */}
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00AC4F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Total Customers</span>
          <h2 className={styles.value}>5,423</h2>
          <div className={styles.trend}>
            <span className={styles.trendUp}>↑ 16%</span>
            <span className={styles.trendPeriod}>this month</span>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Stat 2: Members */}
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00AC4F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <polyline points="17 11 19 13 23 9"></polyline>
          </svg>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Members</span>
          <h2 className={styles.value}>1,893</h2>
          <div className={styles.trend}>
            <span className={styles.trendDown}>↓ 1%</span>
            <span className={styles.trendPeriod}>this month</span>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Stat 3: Active Now */}
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00AC4F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Active Now</span>
          <h2 className={styles.value}>189</h2>
          <div className={styles.avatarStack}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face" alt="User 1" className={styles.avatar} />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" alt="User 2" className={styles.avatar} />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" alt="User 3" className={styles.avatar} />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face" alt="User 4" className={styles.avatar} />
          </div>
        </div>
      </div>
    </div>
  )
}
