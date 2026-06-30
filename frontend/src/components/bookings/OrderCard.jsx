import Badge from '../common/Badge'
import Button from '../common/Button'
import './OrderCard.css'

/**
 * OrderCard — card view of a single booking (used on mobile / grid layouts).
 * Props:
 *   booking   { id, flower, quantity, totalPrice, bookingDate, status }
 *   onCancel  (id) => void   — optional; only shown for PENDING bookings
 */
function OrderCard({ booking, onCancel }) {
  const {
    id,
    flower,
    quantity,
    totalPrice,
    bookingDate,
    status,
  } = booking

  const date = new Date(bookingDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article className="order-card" aria-label={`Order #${id}`}>
      {/* Image */}
      <div className="order-card__img-wrap">
        <img
          src={flower?.imageUrl || 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200&q=80'}
          alt={flower?.name ?? 'Flower'}
          className="order-card__img"
          loading="lazy"
        />
        <div className="order-card__status-badge">
          <Badge status={status} />
        </div>
      </div>

      {/* Info */}
      <div className="order-card__body">
        <div className="order-card__header">
          <p className="order-card__id">Order #{id}</p>
          <p className="order-card__date">{date}</p>
        </div>

        <h3 className="order-card__name">{flower?.name ?? '—'}</h3>

        <div className="order-card__meta">
          <span className="order-card__meta-item">
            <span className="order-card__meta-label">Qty</span>
            <strong>{quantity}</strong>
          </span>
          <span className="order-card__meta-item">
            <span className="order-card__meta-label">Total</span>
            <strong className="order-card__price">${Number(totalPrice).toFixed(2)}</strong>
          </span>
        </div>

        {status === 'PENDING' && onCancel && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCancel(id)}
            className="order-card__cancel-btn"
          >
            Cancel Order
          </Button>
        )}
      </div>
    </article>
  )
}

export default OrderCard
