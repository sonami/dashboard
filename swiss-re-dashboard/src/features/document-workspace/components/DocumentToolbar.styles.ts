import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../../common/styles/tokens'

export const useToolbarStyles = makeStyles({
  toolbar: {
    ...shorthands.padding('10px', '24px'),
    backgroundColor: '#F9FBFF',
    ...shorthands.borderBottom('1px', 'solid', tokens.borderDivider),
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: tokens.fontFamily,
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  divider: {
    width: '1px',
    height: '20px',
    backgroundColor: tokens.borderDivider,
  },
  pageBadge: {
    fontSize: '12px',
    fontWeight: 600,
    ...shorthands.padding('0', '4px'),
  },
  zoomBtn: {
    backgroundColor: '#FFFFFF',
    ...shorthands.border('1px', 'solid', tokens.borderInput),
    ...shorthands.padding('4px', '8px'),
    ...shorthands.borderRadius('4px'),
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: tokens.fontFamily,
  },
  toolBtn: {
    backgroundColor: 'transparent',
    ...shorthands.border('1px', 'solid', 'transparent'),
    color: tokens.colorTextSub,
    ...shorthands.padding('4px', '8px'),
    ...shorthands.borderRadius('4px'),
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: tokens.fontFamily,
    ':hover': {
      backgroundColor: '#FFFFFF',
      color: tokens.colorTextDark,
    },
  },
  toolBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shorthands.borderColor(tokens.colorPrimary),
    color: tokens.colorPrimary,
    fontWeight: 600,
  },
  rightGroup: {
    marginLeft: 'auto',
  },
})
