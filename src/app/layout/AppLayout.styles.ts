import { makeStyles } from '@griffel/react'
import { tokens } from '../../common/styles/tokens'

export const useLayoutStyles = makeStyles({
  appWrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: tokens.colorAppBg,
    overflowX: 'hidden',
    overflowY: 'hidden',
    fontFamily: tokens.fontFamily,
  },
  mainArea: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: tokens.colorAppBg,
  },
  pageBody: {
    flexGrow: 1,
  },
})
