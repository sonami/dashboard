import React from 'react'
import { mergeClasses } from '@griffel/react'
import { useBadgeStyles } from './Badge.styles'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'active' | 'inactive' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const styles = useBadgeStyles()

  return (
    <span className={mergeClasses(styles.root, styles[size], styles[variant], className)}>
      {children}
    </span>
  )
}
