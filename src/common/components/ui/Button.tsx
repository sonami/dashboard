import React, { type ButtonHTMLAttributes } from 'react'
import { mergeClasses } from '@griffel/react'
import { useButtonStyles } from './Button.styles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const styles = useButtonStyles()

  const buttonClasses = mergeClasses(
    styles.root,
    styles[size],
    styles[variant],
    (disabled || isLoading) && styles.disabled,
    isLoading && styles.loading,
    className
  )

  return (
    <button className={buttonClasses} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
