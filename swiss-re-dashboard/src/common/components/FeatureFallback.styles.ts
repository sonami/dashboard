import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../styles/tokens'

export const useFallbackStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '380px',
    width: '100%',
    ...shorthands.padding('40px'),
    gap: '14px',
  },
  text: {
    fontSize: '13px',
    color: tokens.colorTextSub,
    fontWeight: 500,
    fontFamily: tokens.fontFamily,
  },
})
