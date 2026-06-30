import './QuantitySelector.css'

/**
 * QuantitySelector
 * Props:
 *   value     number
 *   min       number  (default 1)
 *   max       number
 *   onChange  (newValue: number) => void
 *   size      'sm' | 'md' | 'lg'
 *   disabled  boolean
 *   label     string   — sr-only label prefix (default "Quantity")
 */
function QuantitySelector({
  value,
  min = 1,
  max = 999,
  onChange,
  size = 'md',
  disabled = false,
  label = 'Quantity',
}) {
  const dec = () => { if (value > min) onChange(value - 1) }
  const inc = () => { if (value < max) onChange(value + 1) }

  return (
    <div
      className={`qty-selector qty-selector--${size}${disabled ? ' qty-selector--disabled' : ''}`}
      role="group"
      aria-label={label}
    >
      <button
        className="qty-selector__btn"
        type="button"
        onClick={dec}
        disabled={disabled || value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
          <rect x="4" y="9" width="12" height="2" rx="1"/>
        </svg>
      </button>

      <output
        className="qty-selector__value"
        aria-live="polite"
        aria-atomic="true"
        htmlFor=""
      >
        {value}
      </output>

      <button
        className="qty-selector__btn"
        type="button"
        onClick={inc}
        disabled={disabled || value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path d="M10 4a1 1 0 011 1v4h4a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H5a1 1 0 010-2h4V5a1 1 0 011-1z"/>
        </svg>
      </button>
    </div>
  )
}

export default QuantitySelector
