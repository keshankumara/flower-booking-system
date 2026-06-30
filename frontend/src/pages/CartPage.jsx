import { useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart }     from '../context/CartContext'
import { useAuth }     from '../context/AuthContext'
import CartItem        from '../components/cart/CartItem'
import EmptyState      from '../components/common/EmptyState'
import Button          from '../components/common/Button'
import './CartPage.css'

function OrderSummary({ items, totalPrice, onCheckout }) {
  return (
    <aside className="cart-summary" aria-label="Order summary">
      <h2 className="cart-summary__title">Order Summary</h2>

      <ul className="cart-summary__lines" aria-label="Item totals">
        {items.map((item) => (
          <li key={item.flower.id} className="cart-summary__line">
            <span className="cart-summary__line-name">
              {item.flower.name}
              <span className="cart-summary__line-qty"> × {item.quantity}</span>
            </span>
            <span className="cart-summary__line-total">
              ${Number(item.subtotal).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="cart-summary__divider" aria-hidden="true" />

      <div className="cart-summary__total">
        <span>Total</span>
        <span aria-label={`Total: $${Number(totalPrice).toFixed(2)}`}>
          ${Number(totalPrice).toFixed(2)}
        </span>
      </div>

      <div className="cart-summary__note">
        <span aria-hidden="true">🚚</span> Free same-day delivery on all orders
      </div>

      <Button variant="primary" size="lg" className="cart-summary__cta" onClick={onCheckout}>
        Proceed to Checkout →
      </Button>

      <Link to="/flowers" className="cart-summary__continue">
        ← Continue shopping
      </Link>
    </aside>
  )
}

function CartPage() {
  const { items, totalPrice, totalCount } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } })
    } else {
      navigate('/checkout')
    }
  }, [isAuthenticated, navigate])

  if (items.length === 0) {
    return (
      <div className="cart-page-empty">
        <div className="container">
          <EmptyState
            icon={
              <svg viewBox="0 0 80 80" fill="none" width="72" height="72">
                <circle cx="40" cy="40" r="38" stroke="var(--color-outline-variant)" strokeWidth="2"/>
                <path d="M25 30h30l-4 18H29L25 30z" stroke="var(--color-outline)" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="33" cy="52" r="2.5" fill="var(--color-outline)"/>
                <circle cx="47" cy="52" r="2.5" fill="var(--color-outline)"/>
                <path d="M22 24h5l3 6" stroke="var(--color-outline)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
            title="Your cart is empty"
            description="Looks like you haven't added any flowers yet. Browse our collection to find the perfect arrangement."
            action={<Link to="/flowers" className="btn btn-primary btn-lg">Browse Flowers</Link>}
            size="lg"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page__title">
          Shopping Cart
          <span className="cart-page__count">
            ({totalCount} {totalCount === 1 ? 'item' : 'items'})
          </span>
        </h1>

        <div className="cart-layout">
          <div className="cart-items" aria-label="Cart items">
            {items.map((item) => (
              <CartItem key={item.flower.id} item={item} />
            ))}
          </div>

          <OrderSummary
            items={items}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  )
}

export default CartPage
