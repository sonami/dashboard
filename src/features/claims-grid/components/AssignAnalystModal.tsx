import React, { useState } from 'react'
import { Modal } from '../../../common/components/Modal'
import { Button } from '../../../common/components/ui/Button'
import { Select } from '../../../common/components/ui/Select'
import { useAssignModalStyles } from './AssignAnalystModal.styles'
import type { Claim } from '../../../common/types/claim'

interface AssignAnalystModalProps {
  claim: Claim | null
  isOpen: boolean
  onClose: () => void
  onAssign: (claimId: string, analystName: string) => void
}

const ANALYSTS = [
  { value: 'Marcus Vance', label: 'Marcus Vance (Senior Underwriter)' },
  { value: 'Elena Rostova', label: 'Elena Rostova (Lead Claims Analyst)' },
  { value: 'Kenji Sato', label: 'Kenji Sato (Property Specialist)' },
  { value: 'Sarah Jenkins', label: 'Sarah Jenkins (Casualty Reinsurance)' },
  { value: 'Liam O’Connor', label: 'Liam O’Connor (Aviation & Marine)' },
]

export const AssignAnalystModal: React.FC<AssignAnalystModalProps> = ({
  claim,
  isOpen,
  onClose,
  onAssign,
}) => {
  const styles = useAssignModalStyles()
  const [selectedAnalyst, setSelectedAnalyst] = useState<string>(
    claim?.assignedAnalyst || ANALYSTS[0].value
  )

  if (!claim) return null

  const handleSave = () => {
    onAssign(claim.id, selectedAnalyst)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assign Lead Analyst: ${claim.claimNumber}`}
      maxWidth="sm"
      footer={
        <div className={styles.footerActions}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Reassign Claim
          </Button>
        </div>
      }
    >
      <div className={styles.container}>
        <p className={styles.descText}>
          Current Cedant: <strong>{claim.cedantName || claim.company}</strong> ({claim.lineOfBusiness})
        </p>

        <Select
          label="Select Primary Assigned Specialist"
          value={selectedAnalyst}
          onChange={(e) => setSelectedAnalyst(e.target.value)}
          options={ANALYSTS}
        />
      </div>
    </Modal>
  )
}
