import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../common/styles/tokens'

export const useHeaderStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('30px', '40px', '24px', '40px'),
    fontFamily: tokens.fontFamily,
  },
  greetingTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: tokens.colorTextDark,
    margin: 0,
  },
  actionsBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: tokens.colorCardBg,
    ...shorthands.borderRadius('10px'),
    ...shorthands.padding('8px', '14px'),
    boxShadow: tokens.shadowSearch,
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
  rbacBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: tokens.colorCardBg,
    ...shorthands.padding('6px', '12px'),
    ...shorthands.borderRadius('10px'),
    boxShadow: tokens.shadowSearch,
  },
  rbacTagText: {
    fontSize: '11px',
    fontWeight: 600,
    color: tokens.colorTextSub,
    textTransform: 'uppercase',
  },
  rbacSelect: {
    ...shorthands.border('none'),
    backgroundColor: 'transparent',
    outlineStyle: 'none',
    fontSize: '12px',
    fontFamily: tokens.fontFamily,
    fontWeight: 600,
    color: tokens.colorPrimary,
    cursor: 'pointer',
  },
})
