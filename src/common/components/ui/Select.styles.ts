import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../styles/tokens'

export const useSelectStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    color: tokens.colorTextMain,
    marginBottom: '4px',
    fontFamily: tokens.fontFamily,
  },
  select: {
    width: '100%',
    ...shorthands.padding('9px', '12px'),
    ...shorthands.borderRadius('8px'),
    ...shorthands.border('1px', 'solid', tokens.borderInput),
    fontFamily: tokens.fontFamily,
    fontSize: '13px',
    outlineStyle: 'none',
    backgroundColor: '#FFFFFF',
    color: tokens.colorTextMain,
    cursor: 'pointer',
    transitionProperty: 'border-color',
    transitionDuration: '0.15s',
    ':focus': {
      ...shorthands.borderColor(tokens.colorPrimary),
    },
  },
  selectError: {
    ...shorthands.borderColor(tokens.colorInactiveBorder),
  },
  errorText: {
    fontSize: '11px',
    color: tokens.colorInactiveBorder,
    marginTop: '4px',
  },
})
