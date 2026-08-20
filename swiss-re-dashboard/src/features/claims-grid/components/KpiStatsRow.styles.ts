import { makeStyles, shorthands } from '@griffel/react'
import { tokens } from '../../../common/styles/tokens'

export const useKpiStyles = makeStyles({
  container: {
    ...shorthands.margin('0', '40px', '30px', '40px'),
    backgroundColor: tokens.colorCardBg,
    ...shorthands.borderRadius(tokens.borderRadiusCard),
    boxShadow: tokens.shadowCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('26px', '40px'),
    fontFamily: tokens.fontFamily,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexGrow: 1,
  },
  iconCircle: {
    width: '84px',
    height: '84px',
    ...shorthands.borderRadius('50%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: 'linear-gradient(201.18deg, #D3FFE7 3.14%, #EFFFF6 86.04%)',
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    color: '#ACACAC',
    marginBottom: '2px',
  },
  value: {
    fontSize: '30px',
    fontWeight: 700,
    color: '#333333',
    lineHeight: 1.1,
    marginBottom: '4px',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  trend: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
  },
  trendUp: {
    color: tokens.colorMintIcon,
    fontWeight: 700,
  },
  trendDown: {
    color: tokens.colorRedTrend,
    fontWeight: 700,
  },
  trendPeriod: {
    color: '#292D32',
    marginLeft: '4px',
    fontWeight: 400,
  },
  avatarStack: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
  },
  avatar: {
    width: '24px',
    height: '24px',
    ...shorthands.borderRadius('50%'),
    ...shorthands.border('1.5px', 'solid', '#FFFFFF'),
    marginLeft: '-6px',
    objectFit: 'cover',
    ':first-child': {
      marginLeft: 0,
    },
  },
  divider: {
    width: '1px',
    height: '60px',
    backgroundColor: tokens.borderDivider,
    ...shorthands.margin('0', '24px'),
  },
})
