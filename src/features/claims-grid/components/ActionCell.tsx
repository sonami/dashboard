import React from 'react'
import type { Claim } from '../../../common/types/claim'
import { AuthzGate } from '../../../common/components/AuthzGate'
import { Button } from '../../../common/components/ui/Button'
import { useActionCellStyles } from './ActionCell.styles'

interface ActionCellProps {
  claim: Claim
  onOpenWorkspace: (claim: Claim) => void
  onEdit?: (claim: Claim) => void
  onAssign?: (claim: Claim) => void
  onDelete?: (claim: Claim) => void
  onApprove?: (claim: Claim) => void
}

export const ActionCell: React.FC<ActionCellProps> = ({
  claim,
  onOpenWorkspace,
  onEdit,
  onAssign,
  onDelete,
  onApprove,
}) => {
  const styles = useActionCellStyles()

  return (
    <div className={styles.container}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onOpenWorkspace(claim)}
        title="Open Large Document Workspace (100MB-1GB)"
      >
        📄 Doc ({claim.documentCount})
      </Button>

      {/* Edit Claim Action - Controlled by RBAC */}
      <AuthzGate
        requiredPermissions={['claims:write']}
        fallback={
          <Button size="sm" variant="ghost" disabled title="No edit permission">
            ✏️
          </Button>
        }
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit?.(claim)}
          title="Edit Claim & Reserves"
        >
          ✏️
        </Button>
      </AuthzGate>

      {/* Assign Analyst Action */}
      <AuthzGate requiredPermissions={['claims:assign']}>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onAssign?.(claim)}
          title="Assign Analyst"
        >
          👤
        </Button>
      </AuthzGate>

      {/* Approve Action */}
      <AuthzGate requiredPermissions={['claims:approve']}>
        {claim.status !== 'Approved' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onApprove?.(claim)}
            title="Approve Settlement"
          >
            ✓
          </Button>
        )}
      </AuthzGate>

      {/* Delete / Archive Action - Admin Only */}
      <AuthzGate requiredPermissions={['claims:delete']}>
        <Button
          size="sm"
          variant="ghost"
          className="text-danger"
          onClick={() => onDelete?.(claim)}
          title="Delete / Archive Claim"
        >
          🗑
        </Button>
      </AuthzGate>
    </div>
  )
}
