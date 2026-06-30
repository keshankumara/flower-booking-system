import './CategoryCard.css'

/**
 * CategoryCard - Redesigned into the premium product-style layout
 * while maintaining existing dynamic filter handlers.
 */
function CategoryCard({ category, onClick, active = false }) {
  const imageUrl = category.imageUrl
    ? `http://localhost:8080${category.imageUrl}`
    : null

  // Fallback bindings mapped from your object fields
  const price = category.price ?? '$0.00'
  const badge = category.badge ?? null // e.g., "In Season" or "Best Seller"

  return (
    <div
      className={`product-card group ${active ? 'product-card--active' : ''}`}
      onClick={() => onClick?.(category.id)}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${active ? 'Remove filter: ' : 'Filter by '}${category.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(category.id)
        }
      }}
    >
      {/* IMAGE MEDIA CONTAINER */}
      <div className="product-card__media">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.name}
            className="product-card__image"
            onError={(e) => {
              // fall back text display if backend link breaks
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div className="product-card__placeholder">🌺</div>
        )}

        {/* BADGES */}
        {badge && (
          <span className={`product-card__badge product-card__badge--${badge.toLowerCase().replace(' ', '-')}`}>
            {badge}
          </span>
        )}

        {/* FLOATING ACTION INTERACTION (FAVORITE ICON) */}
        <button 
          type="button"
          className="product-card__favorite"
          onClick={(e) => {
            e.stopPropagation(); // Prevents layout switching/filtering logic triggers
          }}
        >
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>

      {/* METADATA CONTENT AREA */}
      <div className="product-card__content">
        <h3 className="product-card__name">{category.name}</h3>
        <p className="product-card__price">{price}</p>
      </div>
    </div>
  )
}

export default CategoryCard