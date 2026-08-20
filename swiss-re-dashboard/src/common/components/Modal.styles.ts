import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../styles/tokens'

export const useModalStyles = makeStyles({
  backdrop: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: tokens.colorCardBg,
    ...shorthands.borderRadius('20px'),
    boxShadow: tokens.shadowModal,
    width: '90%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
    fontFamily: tokens.fontFamily,
    animationName: {
      from: { opacity: 0, transform: 'scale(0.96)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    animationDuration: '0.15s',
    animationTimingFunction: 'ease-out',
  },
  sm: { maxWidth: '380px' },
  md: { maxWidth: '520px' },
  lg: { maxWidth: '720px' },
  xl: { maxWidth: '900px' },
  header: {
    ...shorthands.padding('20px', '24px'),
    ...shorthands.borderBottom('1px', 'solid', tokens.borderDivider),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 700,
    color: tokens.colorTextDark,
    margin: 0,
  },
  closeBtn: {
    backgroundColor: 'transparent',
    ...shorthands.border('none'),
    fontSize: '22px',
    color: tokens.colorTextSub,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      color: tokens.colorTextDark,
    },
  },
  body: {
    ...shorthands.padding('24px'),
    overflowY: 'auto',
  },
  footer: {
    ...shorthands.padding('16px', '24px'),
    backgroundColor: '#F9FBFF',
    ...shorthands.borderTop('1px', 'solid', tokens.borderDivider),
  },
})
