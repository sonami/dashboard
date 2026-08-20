import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../styles/tokens'

export const useBadgeStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontFamily: tokens.fontFamily,
    letterSpacing: '0.2px',
    textAlign: 'center',
  },
  // Sizes
  sm: {
    ...shorthands.padding('3px', '10px'),
    fontSize: '11px',
    ...shorthands.borderRadius('4px'),
  },
  md: {
    ...shorthands.padding('4px', '14px'),
    fontSize: '13px',
    ...shorthands.borderRadius('4px'),
  },
  // Variants
  active: {
    backgroundColor: tokens.colorActiveBg,
    ...shorthands.border('1px', 'solid', tokens.colorActiveBorder),
    color: tokens.colorActiveText,
  },
  inactive: {
    backgroundColor: tokens.colorInactiveBg,
    ...shorthands.border('1px', 'solid', tokens.colorInactiveBorder),
    color: tokens.colorInactiveText,
  },
  success: {
    backgroundColor: 'rgba(0, 172, 79, 0.12)',
    ...shorthands.border('1px', 'solid', tokens.colorMintIcon),
    color: tokens.colorMintIcon,
  },
  warning: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    ...shorthands.border('1px', 'solid', '#f59e0b'),
    color: '#d97706',
  },
  danger: {
    backgroundColor: tokens.colorInactiveBg,
    ...shorthands.border('1px', 'solid', tokens.colorInactiveBorder),
    color: tokens.colorInactiveText,
  },
  info: {
    backgroundColor: 'rgba(14, 165, 233, 0.15)',
    ...shorthands.border('1px', 'solid', '#0ea5e9'),
    color: '#0284c7',
  },
  neutral: {
    backgroundColor: '#F5F5F5',
    ...shorthands.border('1px', 'solid', tokens.borderDivider),
    color: tokens.colorTextSub,
  },
  default: {
    backgroundColor: '#F5F5F5',
    ...shorthands.border('1px', 'solid', tokens.borderDivider),
    color: tokens.colorTextSub,
  },
})
