import React, { useState } from 'react'
import { mergeClasses } from '@griffel/react'
import { Modal } from '../../../../common/components/Modal'
import { Button } from '../../../../common/components/ui/Button'
import { Spinner } from '../../../../common/components/ui/Spinner'
import { useOperationsModalStyles } from './PageOperationsModal.styles'

interface PageOperationsModalProps {
  isOpen: boolean
  onClose: () => void
  currentPage: number
  totalPages: number
  documentName: string
  onExecuteOperation: (
    op: 'split' | 'merge' | 'extract' | 'rotate' | 'delete',
    params: Record<string, unknown>
  ) => void
}

export const PageOperationsModal: React.FC<PageOperationsModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  totalPages,
  documentName,
  onExecuteOperation,
}) => {
  const styles = useOperationsModalStyles()
  const [operation, setOperation] = useState<'split' | 'merge' | 'extract' | 'rotate' | 'delete'>('split')
  const [splitPage, setSplitPage] = useState<number>(currentPage)
  const [mergeFileName, setMergeFileName] = useState<string>('SwissRe_Addendum_LossAdjuster_2026.pdf')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const handleRun = () => {
    setIsProcessing(true)
    setProgress(15)

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          clearInterval(interval)
          setTimeout(() => {
            setIsProcessing(false)
            setProgress(0)
            onExecuteOperation(operation, { splitPage, currentPage, mergeFileName })
            onClose()
          }, 300)
          return 100
        }
        return p + 25
      })
    }, 120)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isProcessing && onClose()}
      title="Large Document Operations & Page Engine"
      maxWidth="md"
      footer={
        <div className={styles.footerActions}>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRun} isLoading={isProcessing}>
            {isProcessing ? 'Processing in Worker...' : 'Execute Operation'}
          </Button>
        </div>
      }
    >
      <div className={styles.content}>
        <p className={styles.docDesc}>
          Target File: <strong>{documentName}</strong> ({totalPages} total pages)
        </p>

        <div className={styles.radioGroup}>
          <label className={mergeClasses(styles.radioCard, operation === 'split' && styles.radioCardActive)}>
            <input
              type="radio"
              name="op"
              value="split"
              checked={operation === 'split'}
              onChange={() => setOperation('split')}
              disabled={isProcessing}
            />
            <div className={styles.radioText}>
              <span className={styles.radioTitle}>Split Document Stream</span>
              <p className={styles.radioSub}>Divide document into two independent treaty contracts at specified split point</p>
            </div>
          </label>

          <label className={mergeClasses(styles.radioCard, operation === 'merge' && styles.radioCardActive)}>
            <input
              type="radio"
              name="op"
              value="merge"
              checked={operation === 'merge'}
              onChange={() => setOperation('merge')}
              disabled={isProcessing}
            />
            <div className={styles.radioText}>
              <span className={styles.radioTitle}>Merge External Treaty PDF</span>
              <p className={styles.radioSub}>Append supplemental schedule or adjuster assessment into page stream</p>
            </div>
          </label>

          <label className={mergeClasses(styles.radioCard, operation === 'extract' && styles.radioCardActive)}>
            <input
              type="radio"
              name="op"
              value="extract"
              checked={operation === 'extract'}
              onChange={() => setOperation('extract')}
              disabled={isProcessing}
            />
            <div className={styles.radioText}>
              <span className={styles.radioTitle}>Extract Page ({currentPage})</span>
              <p className={styles.radioSub}>Generate isolated standalone certificate PDF from current page</p>
            </div>
          </label>

          <label className={mergeClasses(styles.radioCard, operation === 'delete' && styles.radioCardActive)}>
            <input
              type="radio"
              name="op"
              value="delete"
              checked={operation === 'delete'}
              onChange={() => setOperation('delete')}
              disabled={isProcessing}
            />
            <div className={styles.radioText}>
              <span className={styles.radioTitleDanger}>Delete Current Page ({currentPage})</span>
              <p className={styles.radioSub}>Purge page from document structure and recalculate byte index</p>
            </div>
          </label>
        </div>

        {operation === 'split' && (
          <div className={styles.fieldContainer}>
            <label className="ui-label">Split Threshold (Split after page #):</label>
            <input
              type="number"
              className="ui-input"
              min={1}
              max={totalPages - 1}
              value={splitPage}
              onChange={(e) => setSplitPage(Number(e.target.value))}
              disabled={isProcessing}
            />
          </div>
        )}

        {operation === 'merge' && (
          <div className={styles.fieldContainer}>
            <label className="ui-label">Supplemental Document to Merge:</label>
            <input
              type="text"
              className="ui-input"
              value={mergeFileName}
              onChange={(e) => setMergeFileName(e.target.value)}
              placeholder="Select or enter PDF file name..."
              disabled={isProcessing}
            />
          </div>
        )}

        {isProcessing && (
          <div className={styles.progressBox}>
            <div className={styles.progressHeader}>
              <span>Off-Thread Web Worker Stream</span>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.workerFeedback}>
              <Spinner size="sm" />
              <span className={styles.workerText}>Allocating worker thread & rebuilding byte streams...</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
