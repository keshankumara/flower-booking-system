import { Link, useNavigate } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="not-found__visual" aria-hidden="true">
        <span className="not-found__flower not-found__flower--1">🌸</span>
        <span className="not-found__flower not-found__flower--2">🌷</span>
        <span className="not-found__flower not-found__flower--3">🌹</span>
      </div>

      <div className="not-found__content">
        <p className="not-found__eyebrow">Error 404</p>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__message">
          Looks like this bloom has wandered off. The page you're looking for
          doesn't exist or has been moved.
        </p>

        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary btn-lg">
            Back to Home
          </Link>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
