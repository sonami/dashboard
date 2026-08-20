import React from 'react'
import { mergeClasses } from '@griffel/react'
import { useSpinnerStyles } from './Spinner.styles'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  label,
}) => {
  const styles = useSpinnerStyles()

  return (
    <div className={mergeClasses(styles.container, className)}>
      <div className={mergeClasses(styles.spinner, styles[size])} role="status" aria-label={label || 'Loading'}>
        <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
          {label || 'Loading...'}
        </span>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
