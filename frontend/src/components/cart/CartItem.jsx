import { useCart }          from '../../context/CartContext'
import QuantitySelector    from '../common/QuantitySelector'
import './CartItem.css'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200&q=80'

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()
  const { flower, quantity, subtotal } = item

  return (
    <div className="cart-item">
      <div className="cart-item__img-wrap">
        <img
          src={flower.imageUrl || PLACEHOLDER}
          alt={flower.name}
          className="cart-item__img"
          loading="lazy"
        />
      </div>

      <div className="cart-item__info">
        {flower.category && (
          <span className="cart-item__category">{flower.category.name}</span>
        )}
        <h3 className="cart-item__name">{flower.name}</h3>
        <p className="cart-item__unit">${Number(flower.price).toFixed(2)} each</p>
      </div>

      <div className="cart-item__controls">
        <QuantitySelector
          value={quantity}
          min={1}
          max={flower.stockQuantity ?? 99}
          onChange={(val) => updateQuantity(flower.id, val)}
          size="sm"
          label={`Quantity for ${flower.name}`}
        />
        <p className="cart-item__subtotal" aria-label={`Subtotal for ${flower.name}: $${Number(subtotal).toFixed(2)}`}>
          ${Number(subtotal).toFixed(2)}
        </p>
      </div>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => removeItem(flower.id)}
        aria-label={`Remove ${flower.name} from cart`}
        title="Remove item"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" width="16" height="16" aria-hidden="true">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
        </svg>
      </button>
    </div>
  )
}

export default CartItem
