import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../common/styles/tokens'

export const useProtectedStyles = makeStyles({
  deniedCard: {
    ...shorthands.margin('40px'),
    ...shorthands.padding('30px'),
    backgroundColor: '#FFF5F5',
    ...shorthands.border('1px', 'solid', '#FEB2B2'),
    ...shorthands.borderRadius('12px'),
    fontFamily: tokens.fontFamily,
  },
  title: {
    color: '#C53030',
    marginTop: 0,
    marginBottom: '8px',
    fontSize: '18px',
    fontWeight: 700,
  },
  desc: {
    color: '#742A2A',
    margin: 0,
    fontSize: '14px',
  },
})
