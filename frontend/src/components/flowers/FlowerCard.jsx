import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FlowerCard.css'

function FlowerCard({ flower, onAddToCart, onViewDetails }) {
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const outOfStock = flower.stockQuantity === 0

  const handleAdd = (e) => {
    e.stopPropagation()
    if (outOfStock || added) return
    onAddToCart(flower)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleView = () => {
    if (onViewDetails) onViewDetails(flower.id)
    else navigate(`/flowers/${flower.id}`)
  }

  return (
    <article
      className={`flower-card${outOfStock ? ' flower-card--oos' : ''}`}
      onClick={handleView}
      tabIndex={0}
      role="button"
      aria-label={`View ${flower.name}, $${Number(flower.price).toFixed(2)}`}
      onKeyDown={(e) => e.key === 'Enter' && handleView()}
    >
      {/* Image */}
      <div className="flower-card__img-wrap">
        <img
          src={flower.imageUrl || 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&q=80'}
          alt={flower.name}
          className="flower-card__img"
          loading="lazy"
        />

        {/* Overlay badges */}
        <div className="flower-card__badges">
          {outOfStock && <span className="flower-card__badge flower-card__badge--oos">Out of Stock</span>}
          {!outOfStock && flower.stockQuantity <= 5 && (
            <span className="flower-card__badge flower-card__badge--low">Only {flower.stockQuantity} left</span>
          )}
        </div>

        {/* Quick-add overlay */}
        {!outOfStock && (
          <div className="flower-card__overlay" aria-hidden="true">
            <button
              className="flower-card__quick-add"
              onClick={handleAdd}
              aria-label={`Add ${flower.name} to cart`}
            >
              {added ? '✓ Added' : '+ Add to Cart'}
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flower-card__body">
        {flower.category && (
          <span className="flower-card__category">{flower.category.name}</span>
        )}
        <h3 className="flower-card__name">{flower.name}</h3>

        <div className="flower-card__footer">
          <span className="flower-card__price">${Number(flower.price).toFixed(2)}</span>
          <button
            className={`flower-card__add-btn${outOfStock ? ' flower-card__add-btn--disabled' : added ? ' flower-card__add-btn--added' : ''}`}
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label={outOfStock ? `${flower.name} is out of stock` : `Add ${flower.name} to cart`}
            aria-pressed={added}
          >
            {outOfStock ? '—' : added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default FlowerCard
