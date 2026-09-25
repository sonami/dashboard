import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../../common/styles/tokens'

export const useGridHeaderStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    fontFamily: tokens.fontFamily,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: tokens.colorTextDark,
    letterSpacing: '-0.5px',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#16C098',
    display: 'block',
    marginTop: '4px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F9FBFF',
    ...shorthands.borderRadius('10px'),
    ...shorthands.padding('7px', '12px'),
    width: '216px',
    height: '38px',
  },
  searchIcon: {
    marginRight: '8px',
    flexShrink: 0,
  },
  searchInput: {
    ...shorthands.border('none'),
    backgroundColor: 'transparent',
    outlineStyle: 'none',
    fontFamily: tokens.fontFamily,
    fontSize: '12px',
    color: tokens.colorTextMain,
    width: '100%',
    '::placeholder': {
      color: tokens.colorTextMuted,
    },
  },
  sortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#F9FBFF',
    ...shorthands.borderRadius('10px'),
    ...shorthands.padding('8px', '14px'),
    height: '38px',
  },
  sortLabel: {
    fontSize: '12px',
    color: tokens.colorTextSub,
  },
  sortSelect: {
    ...shorthands.border('none'),
    backgroundColor: 'transparent',
    outlineStyle: 'none',
    fontFamily: tokens.fontFamily,
    fontSize: '12px',
    fontWeight: 600,
    color: tokens.colorTextSub,
    cursor: 'pointer',
  },
})
