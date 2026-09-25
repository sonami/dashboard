import React from 'react'
import { Sidebar, type NavTab } from './Sidebar'
import { Header } from './Header'
import { useLayoutStyles } from './AppLayout.styles'

interface AppLayoutProps {
  children: React.ReactNode
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeTab,
  onSelectTab,
}) => {
  const styles = useLayoutStyles()

  return (
    <div className={styles.appWrapper}>
      {/* Left Full-Height Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* Main Right Scrollable Dashboard Container */}
      <div className={styles.mainArea}>
        <Header />
        <main className={styles.pageBody}>{children}</main>
      </div>
    </div>
  )
}
