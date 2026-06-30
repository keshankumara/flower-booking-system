import { useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useFlowerDetail }  from '../hooks/useFlowerDetail'
import { useCart }          from '../context/CartContext'
import Badge                from '../components/common/Badge'
import Button               from '../components/common/Button'
import QuantitySelector     from '../components/common/QuantitySelector'
import EmptyState           from '../components/common/EmptyState'
import './FlowerDetailsPage.css'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80'

function DetailSkeleton() {
  return (
    <div className="detail-skeleton" aria-busy="true" aria-label="Loading flower details">
      <div className="skeleton detail-skeleton__img" />
      <div className="detail-skeleton__body">
        <div className="skeleton" style={{ height: 22, width: 80,    borderRadius: 999 }} />
        <div className="skeleton" style={{ height: 44, width: '75%', borderRadius: 8,  marginTop: 12 }} />
        <div className="skeleton" style={{ height: 36, width: 120,   borderRadius: 999, marginTop: 8 }} />
        <div className="skeleton" style={{ height: 20, width: '100%', borderRadius: 4, marginTop: 20 }} />
        <div className="skeleton" style={{ height: 20, width: '85%', borderRadius: 4,  marginTop: 8 }} />
        <div className="skeleton" style={{ height: 20, width: '65%', borderRadius: 4,  marginTop: 8 }} />
        <div className="skeleton" style={{ height: 56, width: '100%', borderRadius: 999, marginTop: 32 }} />
      </div>
    </div>
  )
}

function FlowerDetailsPage() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { addItem } = useCart()

  // All data-fetching, title management, and cleanup via custom hook
  const { flower, loading, error } = useFlowerDetail(id)

  const [quantity, setQuantity] = useState(1)
  const [added,    setAdded]    = useState(false)

  const outOfStock = flower?.stockQuantity === 0
  const lowStock   = !outOfStock && flower?.stockQuantity <= 5

  const handleAddToCart = useCallback(() => {
    if (!flower) return
    addItem(flower, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }, [addItem, flower, quantity])

  const handleBookNow = useCallback(() => {
    if (!flower) return
    addItem(flower, quantity)
    navigate('/checkout')
  }, [addItem, flower, quantity, navigate])

  if (loading) {
    return (
      <div className="details-page">
        <div className="container"><DetailSkeleton /></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="details-page">
        <div className="container">
          <EmptyState
            icon="⚠️"
            title="Something went wrong"
            description={error}
            action={<Button variant="secondary" onClick={() => navigate('/flowers')}>← Back to Flowers</Button>}
          />
        </div>
      </div>
    )
  }

  if (!flower) {
    return (
      <div className="details-page">
        <div className="container">
          <EmptyState
            icon="🔍"
            title="Flower not found"
            description="This flower doesn't exist or has been removed."
            action={<Button variant="secondary" onClick={() => navigate('/flowers')}>← Back to Flowers</Button>}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="details-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="details-breadcrumb" aria-label="Breadcrumb">
          <Link to="/"        className="details-breadcrumb__link">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/flowers" className="details-breadcrumb__link">Flowers</Link>
          <span aria-hidden="true"> / </span>
          <span className="details-breadcrumb__current" aria-current="page">{flower.name}</span>
        </nav>

        <div className="details__inner">

          {/* Image */}
          <div className="details__image-panel">
            <div className="details__image-wrap">
              <img
                src={flower.imageUrl || PLACEHOLDER}
                alt={flower.name}
                className="details__image"
                loading="eager"
              />
              {outOfStock && (
                <div className="details__oos-overlay">
                  <Badge status="OUT_OF_STOCK" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="details__info-panel">
            {flower.category && (
              <span className="details__category-chip">{flower.category.name}</span>
            )}

            <h1 className="details__name">{flower.name}</h1>

            <div className="details__price-row">
              <span className="details__price">${Number(flower.price).toFixed(2)}</span>
              {lowStock && (
                <span className="details__stock-warning" aria-live="polite">
                  ⚠ Only {flower.stockQuantity} left
                </span>
              )}
            </div>

            {flower.description && (
              <p className="details__description">{flower.description}</p>
            )}

            <div className="details__meta">
              <div className="details__meta-item">
                <span className="details__meta-label">Availability</span>
                <span className={`details__meta-value ${outOfStock ? 'details__meta-value--oos' : 'details__meta-value--in'}`}>
                  {outOfStock ? '✗ Out of Stock' : `✓ In Stock (${flower.stockQuantity} available)`}
                </span>
              </div>
              {flower.category && (
                <div className="details__meta-item">
                  <span className="details__meta-label">Category</span>
                  <span className="details__meta-value">{flower.category.name}</span>
                </div>
              )}
            </div>

            {!outOfStock && (
              <div className="details__quantity-row">
                <label className="details__qty-label">Quantity</label>
                <QuantitySelector
                  value={quantity}
                  min={1}
                  max={flower.stockQuantity}
                  onChange={setQuantity}
                  size="lg"
                  label="Flower quantity"
                />
                <span className="details__qty-subtotal">
                  Total: <strong>${(quantity * flower.price).toFixed(2)}</strong>
                </span>
              </div>
            )}

            <div className="details__actions">
              <Button variant="primary"   size="lg" disabled={outOfStock} onClick={handleBookNow}   className="details__action-btn">Book Now</Button>
              <Button variant="secondary" size="lg" disabled={outOfStock} onClick={handleAddToCart} className="details__action-btn">
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </Button>
            </div>

            <div className="details__trust">
              <span>🌿 Farm Fresh</span>
              <span>🚚 Same-Day Delivery</span>
              <span>💝 Handcrafted</span>
            </div>

            <Link to="/flowers" className="details__back-link">← Back to all flowers</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowerDetailsPage
