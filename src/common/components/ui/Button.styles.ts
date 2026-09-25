import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../styles/tokens'

export const useButtonStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: tokens.fontFamily,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transitionProperty: 'all',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease',
    ...shorthands.borderRadius('6px'),
    ...shorthands.border('1px', 'solid', 'transparent'),
  },
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  loading: {
    cursor: 'wait',
  },
  // Sizes
  sm: {
    ...shorthands.padding('4px', '8px'),
    fontSize: '11px',
  },
  md: {
    ...shorthands.padding('8px', '14px'),
    fontSize: '13px',
  },
  lg: {
    ...shorthands.padding('10px', '18px'),
    fontSize: '15px',
  },
  // Variants
  primary: {
    backgroundColor: tokens.colorPrimary,
    color: '#ffffff',
    ':hover:not(:disabled)': {
      backgroundColor: tokens.colorPrimaryHover,
    },
  },
  secondary: {
    backgroundColor: '#F9FBFF',
    ...shorthands.borderColor(tokens.borderInput),
    color: tokens.colorTextMain,
    ':hover:not(:disabled)': {
      backgroundColor: '#F0F3FB',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor(tokens.borderInput),
    color: tokens.colorTextMain,
    ':hover:not(:disabled)': {
      backgroundColor: '#F0F3FB',
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: tokens.colorTextSub,
    ':hover:not(:disabled)': {
      backgroundColor: '#F0F3FB',
      color: tokens.colorTextDark,
    },
  },
  danger: {
    backgroundColor: tokens.colorInactiveBorder,
    color: '#ffffff',
    ':hover:not(:disabled)': {
      backgroundColor: '#b80303',
    },
  },
  iconLeft: {
    marginRight: '6px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: '6px',
    display: 'inline-flex',
    alignItems: 'center',
  },
})
