import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as loginService } from '../services/authService'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import './AuthPage.css'

function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || '/'
  const successMsg = location.state?.success || ''

  const [form, setForm]       = useState({ email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email.trim())    e.email    = 'Email is required'
    if (!form.password.trim()) e.password = 'Password is required'
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
      const data = await loginService(form)
      login(
        data.token,
        data.user ?? { email: form.email, role: data.role ?? 'USER', name: data.name ?? form.email }
      )
      navigate(from, { replace: true })
    } catch (err) {
      setApiError(err?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__icon" aria-hidden="true">✿</span>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">Sign in to your Botanical account</p>
        </div>

        {successMsg && (
          <div className="auth-form__success" role="status">{successMsg}</div>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <Input
            label="Email address"
            type="email"
            name="email"
            id="login-email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            id="login-password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            required
          />

          {apiError && (
            <div className="auth-form__error" role="alert">
              <span aria-hidden="true">⚠</span> {apiError}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-form__submit">
            Sign In
          </Button>
        </form>

        <p className="auth-card__footer">
          Don't have an account? <Link to="/register">Create one free</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
