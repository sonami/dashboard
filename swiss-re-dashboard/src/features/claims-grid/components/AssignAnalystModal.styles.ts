import { makeStyles } from '@griffel/react'
import { tokens } from '../../../common/styles/tokens'

export const useAssignModalStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    fontFamily: tokens.fontFamily,
  },
  descText: {
    fontSize: '13px',
    color: tokens.colorTextSub,
    margin: 0,
  },
  footerActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
})
