import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../styles/tokens'

export const useInputStyles = makeStyles({
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
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    ...shorthands.padding('9px', '12px'),
    ...shorthands.borderRadius('8px'),
    ...shorthands.border('1px', 'solid', tokens.borderInput),
    fontFamily: tokens.fontFamily,
    fontSize: '13px',
    outlineStyle: 'none',
    backgroundColor: '#FFFFFF',
    color: tokens.colorTextMain,
    transitionProperty: 'border-color',
    transitionDuration: '0.15s',
    ':focus': {
      ...shorthands.borderColor(tokens.colorPrimary),
    },
  },
  inputError: {
    ...shorthands.borderColor(tokens.colorInactiveBorder),
  },
  hasLeftIcon: {
    paddingLeft: '34px',
  },
  hasRightIcon: {
    paddingRight: '34px',
  },
  iconLeft: {
    position: 'absolute',
    left: '10px',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    color: tokens.colorTextSub,
  },
  iconRight: {
    position: 'absolute',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    color: tokens.colorTextSub,
  },
  errorText: {
    fontSize: '11px',
    color: tokens.colorInactiveBorder,
    marginTop: '4px',
  },
  helperText: {
    fontSize: '11px',
    color: tokens.colorTextSub,
    marginTop: '4px',
  },
})
