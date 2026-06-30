import './StatCard.css'

/**
 * StatCard — summary metric card for admin dashboard.
 * Props:
 *   label      string
 *   value      string | number
 *   icon       string (emoji or text)
 *   trend      { value: string, direction: 'up'|'down'|'neutral' }  — optional
 *   color      'primary' | 'secondary' | 'tertiary'  — accent colour
 */
function StatCard({ label, value, icon, trend, color = 'primary' }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon-wrap" aria-hidden="true">
        <span className="stat-card__icon">{icon}</span>
      </div>

      <div className="stat-card__body">
        <p className="stat-card__value">{value ?? '—'}</p>
        <p className="stat-card__label">{label}</p>

        {trend && (
          <p className={`stat-card__trend stat-card__trend--${trend.direction}`} aria-label={`Trend: ${trend.value}`}>
            {trend.direction === 'up'   && '↑ '}
            {trend.direction === 'down' && '↓ '}
            {trend.value}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatCard
