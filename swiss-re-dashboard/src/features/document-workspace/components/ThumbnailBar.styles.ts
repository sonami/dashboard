import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../../common/styles/tokens'

export const useThumbnailStyles = makeStyles({
  sidebar: {
    width: '160px',
    backgroundColor: '#F9FBFF',
    ...shorthands.borderRight('1px', 'solid', tokens.borderDivider),
    display: 'flex',
    flexDirection: 'column',
    fontFamily: tokens.fontFamily,
  },
  header: {
    ...shorthands.padding('10px', '14px'),
    fontSize: '12px',
    fontWeight: 700,
    color: tokens.colorTextSub,
    ...shorthands.borderBottom('1px', 'solid', tokens.borderDivider),
  },
  list: {
    flexGrow: 1,
    overflowY: 'auto',
    ...shorthands.padding('10px'),
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  item: {
    ...shorthands.padding('6px'),
    ...shorthands.borderRadius('6px'),
    ...shorthands.border('2px', 'solid', 'transparent'),
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    textAlign: 'center',
    transitionProperty: 'border-color',
    transitionDuration: '0.15s',
    ':hover': {
      ...shorthands.borderColor(tokens.borderInput),
    },
  },
  itemActive: {
    ...shorthands.borderColor(tokens.colorPrimary),
    boxShadow: '0 0 10px rgba(89, 50, 234, 0.2)',
  },
  preview: {
    width: '100%',
    aspectRatio: '1 / 1.4',
    backgroundColor: '#F0F3FB',
    ...shorthands.borderRadius('2px'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumber: {
    fontSize: '11px',
    color: tokens.colorTextSub,
    marginTop: '4px',
    display: 'block',
  },
})
