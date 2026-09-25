import React, { type InputHTMLAttributes } from 'react'
import { mergeClasses } from '@griffel/react'
import { useInputStyles } from './Input.styles'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const styles = useInputStyles()
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={mergeClasses(styles.container, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.wrapper}>
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <input
          id={inputId}
          className={mergeClasses(
            styles.input,
            Boolean(error) && styles.inputError,
            Boolean(leftIcon) && styles.hasLeftIcon,
            Boolean(rightIcon) && styles.hasRightIcon
          )}
          {...props}
        />
        {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
    </div>
  )
}
