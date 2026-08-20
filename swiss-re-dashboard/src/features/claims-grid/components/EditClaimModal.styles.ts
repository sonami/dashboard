import { makeStyles } from '@griffel/react'

export const useEditModalStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  footerActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
})
