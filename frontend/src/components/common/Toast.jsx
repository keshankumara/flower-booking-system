import { useEffect } from 'react'
import './Toast.css'

/**
 * Toast
 * Props:
 *   message   {string}
 *   type      {'success'|'error'|'info'|'warning'}
 *   duration  {number}   ms — 0 = no auto-dismiss
 *   onClose   {fn}
 *   position  {'bottom-right'|'bottom-center'|'top-right'}
 */
const ICONS = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
}

function Toast({
  message,
  type = 'success',
  duration = 3500,
  onClose,
  position = 'bottom-right',
}) {
  useEffect(() => {
    if (!duration || !onClose) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!message) return null

  return (
    <div
      className={`toast toast--${type} toast--${position}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <span className="toast__icon" aria-hidden="true">{ICONS[type]}</span>
      <span className="toast__message">{message}</span>
      {onClose && (
        <button
          className="toast__close"
          onClick={onClose}
          aria-label="Dismiss notification"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Toast
