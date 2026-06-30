import './Spinner.css'

/**
 * Spinner
 * Props:
 *   size    {'sm'|'md'|'lg'}
 *   color   {'primary'|'white'|'tertiary'}
 *   label   {string}  — sr-only accessible label
 */
function Spinner({ size = 'md', color = 'tertiary', label = 'Loading…' }) {
  return (
    <span
      className={`spinner spinner--${size} spinner--${color}`}
      role="status"
      aria-label={label}
    >
      <span className="spinner__ring" aria-hidden="true" />
    </span>
  )
}

export default Spinner
