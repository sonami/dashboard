import React, { useState, Suspense, lazy } from 'react'
import { AppLayout, type NavTab } from '../layout'
import { ProtectedRoute } from './ProtectedRoute'
import { FeatureFallback } from '../../common/components/FeatureFallback'
import { useRouterStyles } from './AppRouter.styles'
import type { Claim } from '../../common/types/claim'

// On-demand feature code splitting
const ClaimsGrid = lazy(() =>
  import(/* webpackChunkName: "feature-claims-grid" */ '../../features/claims-grid').then(
    (module) => ({ default: module.ClaimsGrid })
  )
)

const DocumentCanvas = lazy(() =>
  import(/* webpackChunkName: "feature-document-workspace" */ '../../features/document-workspace').then(
    (module) => ({ default: module.DocumentCanvas })
  )
)

export const AppRouter: React.FC = () => {
  const styles = useRouterStyles()
  const [activeTab, setActiveTab] = useState<NavTab>('customers')
  const [selectedClaimForDoc, setSelectedClaimForDoc] = useState<Claim | null>(null)

  const handleOpenDocFromGrid = (claim: Claim) => {
    setSelectedClaimForDoc(claim)
    setActiveTab('document-workspace')
  }

  return (
    <AppLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {(activeTab === 'customers' || activeTab === 'claims' || activeTab === 'dashboard') && (
        <ProtectedRoute requiredPermissions={['claims:read']}>
          <Suspense fallback={<FeatureFallback featureName="Claims & Customer Grid" />}>
            <ClaimsGrid onSelectClaimForWorkspace={handleOpenDocFromGrid} />
          </Suspense>
        </ProtectedRoute>
      )}

      {(activeTab === 'document-workspace' || activeTab === 'help') && (
        <ProtectedRoute requiredPermissions={['documents:read']}>
          <div className={styles.canvasWrapper}>
            <Suspense fallback={<FeatureFallback featureName="Document Workspace Engine" />}>
              <DocumentCanvas
                documentId={selectedClaimForDoc ? 'doc_sr_9811' : 'doc_sr_9811'}
                onClose={() => setActiveTab('customers')}
              />
            </Suspense>
          </div>
        </ProtectedRoute>
      )}

      {activeTab === 'income' && (
        <div className={styles.contentWrapper}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Income & Reserves Overview</h2>
            <p className={styles.cardSubtitle}>Financial summary and claim disbursements</p>
            <div className={styles.kpiRow}>
              <div className={styles.kpiCard}>
                <span className={styles.kpiLabel}>Gross Premium Income</span>
                <h2 className={styles.kpiValue}>$12.4M</h2>
                <span className={styles.kpiTrendUp}>↑ 8.4% vs last quarter</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiLabel}>Paid Claims Reserve</span>
                <h2 className={styles.kpiValue}>$4.2M</h2>
                <span className={styles.kpiTrendDown}>↓ 2.1% loss ratio</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'product' && (
        <div className={styles.contentWrapper}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Reinsurance Products & Treaties</h2>
            <p className={styles.cardSubtitle}>Property, Casualty, Life & Health, Cyber, Marine, Aviation</p>
          </div>
        </div>
      )}

      {activeTab === 'promote' && (
        <div className={styles.contentWrapper}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Campaigns & Promotions</h2>
            <p className={styles.cardSubtitle}>Broker incentives and specialty treaty promotions</p>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
