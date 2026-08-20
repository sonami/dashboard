import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../common/styles/tokens'

export const useRouterStyles = makeStyles({
  canvasWrapper: {
    ...shorthands.padding('0', '20px', '20px', '20px'),
    height: '100%',
  },
  contentWrapper: {
    ...shorthands.padding('20px'),
  },
  card: {
    backgroundColor: tokens.colorCardBg,
    ...shorthands.borderRadius(tokens.borderRadiusCard),
    boxShadow: tokens.shadowCard,
    ...shorthands.padding('30px', '38px', '40px', '38px'),
    fontFamily: tokens.fontFamily,
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: tokens.colorTextDark,
    margin: 0,
  },
  cardSubtitle: {
    fontSize: '14px',
    color: tokens.colorTextSub,
    marginTop: '4px',
    marginBottom: '20px',
  },
  kpiRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginTop: '20px',
  },
  kpiCard: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('18px', '24px'),
    ...shorthands.borderRadius('12px'),
    backgroundColor: '#F9FBFF',
    ...shorthands.border('1px', 'solid', tokens.borderDivider),
    flexGrow: 1,
  },
  kpiLabel: {
    fontSize: '13px',
    color: tokens.colorTextSub,
  },
  kpiValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: tokens.colorTextDark,
    marginTop: '4px',
    marginBottom: '4px',
    margin: 0,
  },
  kpiTrendUp: {
    fontSize: '12px',
    color: tokens.colorMintIcon,
    fontWeight: 600,
  },
  kpiTrendDown: {
    fontSize: '12px',
    color: tokens.colorRedTrend,
    fontWeight: 600,
  },
})
