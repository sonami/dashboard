import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../styles/tokens'

export const useSpinnerStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    display: 'inline-block',
    ...shorthands.borderRadius('50%'),
    ...shorthands.border('2px', 'solid', '#E2E8F0'),
    borderTopColor: tokens.colorPrimary,
    animationName: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    animationDuration: '0.7s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  sm: {
    width: '14px',
    height: '14px',
    ...shorthands.borderWidth('2px'),
  },
  md: {
    width: '24px',
    height: '24px',
    ...shorthands.borderWidth('2.5px'),
  },
  lg: {
    width: '36px',
    height: '36px',
    ...shorthands.borderWidth('3px'),
  },
  label: {
    fontSize: '13px',
    color: tokens.colorTextSub,
    fontFamily: tokens.fontFamily,
    fontWeight: 500,
  },
})
