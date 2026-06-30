import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerService } from '../services/authService'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import './AuthPage.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors]   = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())              e.name    = 'Full name is required'
    if (!form.email.trim())             e.email   = 'Email is required'
    else if (!EMAIL_RE.test(form.email)) e.email  = 'Invalid email format'
    if (!form.password)                 e.password = 'Password is required'
    else if (form.password.length < 6)  e.password = 'Must be at least 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    return e
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }))
    setErrors((p) => ({ ...p, [name]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ve = validate()
    if (Object.keys(ve).length) { setErrors(ve); return }
    setLoading(true)
    try {
      await registerService({ name: form.name, email: form.email, password: form.password })
      navigate('/login', { state: { success: '🎉 Account created! Please sign in.' } })
    } catch (err) {
      setApiError(err?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__icon" aria-hidden="true">🌸</span>
          <h1 className="auth-card__title">Join Botanical</h1>
          <p className="auth-card__subtitle">Create your free account today</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <Input label="Full name" type="text" name="name" id="reg-name"
            value={form.name} onChange={handleChange}
            placeholder="Jane Doe" error={errors.name} required />

          <Input label="Email address" type="email" name="email" id="reg-email"
            value={form.email} onChange={handleChange}
            placeholder="you@example.com" error={errors.email} required />

          <Input label="Password" type="password" name="password" id="reg-password"
            value={form.password} onChange={handleChange}
            placeholder="Minimum 6 characters" error={errors.password} required />

          <Input label="Confirm password" type="password" name="confirmPassword" id="reg-confirm"
            value={form.confirmPassword} onChange={handleChange}
            placeholder="Repeat your password" error={errors.confirmPassword} required />

          {apiError && (
            <div className="auth-form__error" role="alert">
              <span aria-hidden="true">⚠</span> {apiError}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-form__submit">
            Create Account
          </Button>

          <p className="auth-terms">
            By creating an account you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </form>

        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
