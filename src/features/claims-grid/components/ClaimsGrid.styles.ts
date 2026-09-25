import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../../common/styles/tokens'

export const useClaimsGridStyles = makeStyles({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: tokens.fontFamily,
  },
  card: {
    ...shorthands.margin('0', '40px', '40px', '40px'),
    backgroundColor: tokens.colorCardBg,
    ...shorthands.borderRadius(tokens.borderRadiusCard),
    boxShadow: tokens.shadowCard,
    ...shorthands.padding('30px', '38px', '40px', '38px'),
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    color: tokens.colorTextMuted,
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'left',
    ...shorthands.padding('14px', '10px'),
    ...shorthands.borderBottom('1px', 'solid', tokens.borderDivider),
  },
  thCenter: {
    textAlign: 'center',
  },
  row: {
    ':hover': {
      backgroundColor: '#FAFBFF',
    },
  },
  td: {
    color: tokens.colorTextMain,
    fontSize: '14px',
    fontWeight: 500,
    ...shorthands.padding('18px', '10px'),
    ...shorthands.borderBottom('1px', 'solid', tokens.borderDivider),
  },
  tdCenter: {
    textAlign: 'center',
  },
  nameCell: {
    fontWeight: 600,
    color: `${tokens.colorTextMain} !important`,
  },
  companyCell: {
    color: tokens.colorTextMain,
  },
  phoneLink: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  statusPill: {
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: 600,
    ...shorthands.borderRadius('4px'),
    textAlign: 'center',
  },
  statusActive: {
    backgroundColor: tokens.colorActiveBg,
    ...shorthands.border('1px', 'solid', tokens.colorActiveBorder),
    color: tokens.colorActiveText,
    ...shorthands.padding('4px', '18px'),
  },
  statusInactive: {
    backgroundColor: tokens.colorInactiveBg,
    ...shorthands.border('1px', 'solid', tokens.colorInactiveBorder),
    color: tokens.colorInactiveText,
    ...shorthands.padding('4px', '14px'),
  },
  footer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerEntries: {
    color: tokens.colorTextMuted,
    fontSize: '14px',
    fontWeight: 500,
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  pageNavBtn: {
    backgroundColor: '#F5F5F5',
    ...shorthands.border('1px', 'solid', tokens.borderDivider),
    color: '#404B52',
    ...shorthands.borderRadius('4px'),
    width: '26px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '0.15s',
    ':hover:not(:disabled)': {
      backgroundColor: '#EBEBEB',
    },
    ':disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
  pageNumBtn: {
    backgroundColor: '#F5F5F5',
    ...shorthands.border('1px', 'solid', tokens.borderDivider),
    color: '#404B52',
    ...shorthands.borderRadius('4px'),
    width: '26px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: tokens.fontFamily,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '0.15s',
    ':hover': {
      backgroundColor: '#EBEBEB',
    },
  },
  pageNumBtnActive: {
    backgroundColor: `${tokens.colorPrimary} !important`,
    color: '#FFFFFF !important',
    ...shorthands.borderColor(`${tokens.colorPrimary} !important`),
  },
  pageEllipsis: {
    color: '#404B52',
    fontSize: '12px',
    ...shorthands.padding('0', '2px'),
  },
})
