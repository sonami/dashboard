import React, { useState, useEffect } from 'react'
import { Modal } from '../../../common/components/Modal'
import { Button } from '../../../common/components/ui/Button'
import { Input } from '../../../common/components/ui/Input'
import { Select } from '../../../common/components/ui/Select'
import { useEditModalStyles } from './EditClaimModal.styles'
import type { Claim, ClaimStatus, ClaimPriority } from '../../../common/types/claim'

interface EditClaimModalProps {
  claim: Claim | null
  isOpen: boolean
  onClose: () => void
  onSave: (updated: Claim) => void
}

export const EditClaimModal: React.FC<EditClaimModalProps> = ({
  claim,
  isOpen,
  onClose,
  onSave,
}) => {
  const styles = useEditModalStyles()
  const [formData, setFormData] = useState<Claim | null>(claim)

  useEffect(() => {
    setFormData(claim)
  }, [claim])

  if (!formData || !claim) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Claim: ${claim.claimNumber}`}
      maxWidth="md"
      footer={
        <div className={styles.footerActions}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <Input
            label="Cedant / Customer Name"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
          <Input
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Incurred Amount ($)"
            type="number"
            value={formData.incurredAmount}
            onChange={(e) =>
              setFormData({ ...formData, incurredAmount: Number(e.target.value) })
            }
            required
          />
          <Input
            label="Reserved Capital ($)"
            type="number"
            value={formData.reservedAmount}
            onChange={(e) =>
              setFormData({ ...formData, reservedAmount: Number(e.target.value) })
            }
            required
          />
        </div>

        <div className={styles.row}>
          <Select
            label="Settlement Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as ClaimStatus })
            }
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
              { value: 'UnderReview', label: 'Under Review' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Flagged', label: 'Flagged' },
              { value: 'Settled', label: 'Settled' },
            ]}
          />
          <Select
            label="Priority Tier"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value as ClaimPriority })
            }
            options={[
              { value: 'Critical', label: 'Critical' },
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
          />
        </div>
      </form>
    </Modal>
  )
}
