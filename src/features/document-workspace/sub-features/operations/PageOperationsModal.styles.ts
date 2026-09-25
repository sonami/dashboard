import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../../../common/styles/tokens'

export const useOperationsModalStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: tokens.fontFamily,
  },
  docDesc: {
    color: tokens.colorTextSub,
    fontSize: '13px',
    marginBottom: '16px',
    margin: 0,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  radioCard: {
    display: 'flex',
    gap: '12px',
    ...shorthands.padding('12px'),
    ...shorthands.border('1px', 'solid', tokens.borderInput),
    ...shorthands.borderRadius('8px'),
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    fontSize: '13px',
    transitionProperty: 'border-color',
    transitionDuration: '0.15s',
    ':hover': {
      ...shorthands.borderColor(tokens.colorPrimary),
    },
  },
  radioCardActive: {
    ...shorthands.borderColor(tokens.colorPrimary),
    backgroundColor: '#F9FBFF',
  },
  radioText: {
    display: 'flex',
    flexDirection: 'column',
  },
  radioTitle: {
    fontWeight: 700,
    color: tokens.colorTextMain,
  },
  radioTitleDanger: {
    fontWeight: 700,
    color: tokens.colorInactiveBorder,
  },
  radioSub: {
    color: tokens.colorTextSub,
    fontSize: '11px',
    marginTop: '2px',
    margin: 0,
  },
  fieldContainer: {
    marginTop: '16px',
  },
  progressBox: {
    marginTop: '20px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: 600,
  },
  progressBarTrack: {
    width: '100%',
    height: '8px',
    backgroundColor: '#E8ECF4',
    ...shorthands.borderRadius('4px'),
    ...shorthands.overflow('hidden'),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: tokens.colorPrimary,
    transitionProperty: 'width',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease',
  },
  workerFeedback: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  workerText: {
    fontSize: '11px',
    color: tokens.colorTextSub,
  },
  footerActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
})
