import React from 'react'

export interface ToastMessage {
  id: string
  title: string
  message?: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div className="ui-toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`ui-toast ui-toast--${toast.type}`}>
          <div className="ui-toast-content">
            <span className="ui-toast-title">{toast.title}</span>
            {toast.message && <p className="ui-toast-desc">{toast.message}</p>}
          </div>
          <button
            className="ui-toast-close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss toast"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}
