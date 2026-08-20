import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../../../common/styles/tokens'

export const useAnnotationStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'auto',
  },
  box: {
    ...shorthands.border('2px', 'solid'),
    cursor: 'pointer',
    position: 'absolute',
  },
  boxSelected: {
    ...shorthands.border('2px', 'dashed', tokens.colorPrimary),
  },
  pinBadge: {
    position: 'absolute',
    top: '-12px',
    left: '-12px',
    width: '24px',
    height: '24px',
    ...shorthands.borderRadius('50%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    color: '#ffffff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
  },
  popover: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#FFFFFF',
    color: tokens.colorTextMain,
    ...shorthands.padding('10px'),
    ...shorthands.borderRadius('8px'),
    ...shorthands.border('1px', 'solid', tokens.borderDivider),
    width: '240px',
    boxShadow: tokens.shadowModal,
    zIndex: 50,
    fontSize: '12px',
    fontFamily: tokens.fontFamily,
  },
  popoverHead: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  author: {
    fontWeight: 700,
    color: tokens.colorPrimary,
    fontSize: '11px',
  },
  date: {
    color: tokens.colorTextSub,
    fontSize: '10px',
  },
  body: {
    marginBottom: '8px',
    lineHeight: 1.4,
    fontSize: '12px',
  },
  actions: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'flex-end',
  },
})
