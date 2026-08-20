import React from 'react'
import { Spinner } from './ui/Spinner'
import { useFallbackStyles } from './FeatureFallback.styles'

interface FeatureFallbackProps {
  featureName?: string
}

export const FeatureFallback: React.FC<FeatureFallbackProps> = ({
  featureName = 'feature module',
}) => {
  const styles = useFallbackStyles()

  return (
    <div className={styles.root}>
      <Spinner size="lg" />
      <span className={styles.text}>Loading {featureName} on demand...</span>
    </div>
  )
}
