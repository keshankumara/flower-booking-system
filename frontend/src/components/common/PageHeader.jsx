import './PageHeader.css'

/**
 * PageHeader
 * Props:
 *   title       {string}
 *   subtitle    {string}
 *   eyebrow     {string}   — small label above title
 *   actions     {ReactNode} — buttons on the right
 *   centered    {boolean}
 *   size        {'sm'|'md'|'lg'}
 */
function PageHeader({
  title,
  subtitle,
  eyebrow,
  actions,
  centered = false,
  size = 'md',
}) {
  return (
    <div className={`page-header page-header--${size}${centered ? ' page-header--centered' : ''}`}>
      <div className="page-header__text">
        {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
        {title   && <h1 className="page-header__title">{title}</h1>}
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {actions && (
        <div className="page-header__actions">{actions}</div>
      )}
    </div>
  )
}

export default PageHeader
