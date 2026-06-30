import './EmptyState.css'

/**
 * EmptyState
 * Props:
 *   icon        {string}   — emoji or text icon
 *   title       {string}
 *   description {string}
 *   action      {ReactNode} — optional CTA button/link
 *   size        {'sm'|'md'|'lg'}
 */
function EmptyState({
  icon = '🌸',
  title,
  description,
  action,
  size = 'md',
}) {
  return (
    <div className={`empty-state empty-state--${size}`} role="status">
      <div className="empty-state__icon" aria-hidden="true">{icon}</div>
      {title       && <h3 className="empty-state__title">{title}</h3>}
      {description && <p  className="empty-state__description">{description}</p>}
      {action      && <div className="empty-state__action">{action}</div>}
    </div>
  )
}

export default EmptyState
