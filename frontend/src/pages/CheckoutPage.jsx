import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createBooking } from '../services/bookingService'
import Button from '../components/common/Button'
import './CheckoutPage.css'

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate  = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (items.length === 0) navigate('/cart', { replace: true })
  }, [items.length, navigate])

  const handlePlaceOrder = async () => {
    setLoading(true)
    setError('')
    try {
      await Promise.all(
        items.map((item) => createBooking(user.email, item.flower.id, item.quantity))
      )
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(err?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div className="checkout-page">
      <div className="container">

        {/* Progress */}
        <nav className="checkout-steps" aria-label="Checkout steps">
          <div className="checkout-step checkout-step--done">
            <span className="checkout-step__num" aria-hidden="true">✓</span>
            <span className="checkout-step__label">Cart</span>
          </div>
          <div className="checkout-step__connector" aria-hidden="true"/>
          <div className="checkout-step checkout-step--active" aria-current="step">
            <span className="checkout-step__num" aria-hidden="true">2</span>
            <span className="checkout-step__label">Review &amp; Confirm</span>
          </div>
          <div className="checkout-step__connector" aria-hidden="true"/>
          <div className="checkout-step">
            <span className="checkout-step__num" aria-hidden="true">3</span>
            <span className="checkout-step__label">Confirmation</span>
          </div>
        </nav>

        <div className="checkout-layout">

          {/* ── Left: Order review ── */}
          <div className="checkout-order">
            <h2 className="checkout-section-title">Your Order</h2>

            <ul className="checkout-items" aria-label="Order items">
              {items.map((item) => (
                <li key={item.flower.id} className="checkout-item">
                  <div className="checkout-item__img-wrap">
                    <img
                      src={item.flower.imageUrl || 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=120&q=80'}
                      alt={item.flower.name}
                      className="checkout-item__img"
                      loading="lazy"
                    />
                  </div>
                  <div className="checkout-item__info">
                    <p className="checkout-item__name">{item.flower.name}</p>
                    <p className="checkout-item__unit">${Number(item.flower.price).toFixed(2)} × {item.quantity}</p>
                  </div>
                  <p className="checkout-item__subtotal">${Number(item.subtotal).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            <Link to="/cart" className="checkout-edit-link">← Edit cart</Link>
          </div>

          {/* ── Right: Confirm panel ── */}
          <aside className="checkout-panel">
            <h2 className="checkout-section-title">Booking Contact</h2>

            <div className="checkout-contact">
              <label className="input-label" htmlFor="checkout-email">Email address</label>
              <input
                id="checkout-email"
                className="input-field"
                type="email"
                value={user?.email || ''}
                readOnly
                aria-label="Booking email (read-only)"
              />
              <p className="checkout-contact__note">
                Booking confirmation will be sent to this email.
              </p>
            </div>

            <div className="checkout-panel__divider" aria-hidden="true"/>

            <h2 className="checkout-section-title">Price Summary</h2>

            <ul className="checkout-totals" aria-label="Price summary">
              {items.map((item) => (
                <li key={item.flower.id} className="checkout-total-line">
                  <span>{item.flower.name} × {item.quantity}</span>
                  <span>${Number(item.subtotal).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="checkout-panel__divider" aria-hidden="true"/>

            <div className="checkout-grand-total">
              <span>Grand Total</span>
              <span aria-label={`Total amount: $${Number(totalPrice).toFixed(2)}`}>
                ${Number(totalPrice).toFixed(2)}
              </span>
            </div>

            {error && (
              <div className="checkout-error" role="alert">
                <span aria-hidden="true">⚠</span> {error}
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              loading={loading}
              className="checkout-place-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>

            <div className="checkout-secure">
              <span aria-hidden="true">🔒</span>
              <span>Secure booking — no payment details required</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
