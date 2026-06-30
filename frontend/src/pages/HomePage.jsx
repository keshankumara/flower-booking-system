import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlowers }    from '../hooks/useFlowers'
import { useCategories } from '../hooks/useCategories'
import { useCart }       from '../context/CartContext'
import FlowerCard        from '../components/flowers/FlowerCard'
import SkeletonCard      from '../components/common/SkeletonCard'
import CategoryCard      from '../components/flowers/CategoryCard'
import EmptyState        from '../components/common/EmptyState'
import Button            from '../components/common/Button'
import './HomePage.css'

const TRUST_ITEMS = [
  { icon: '🌿', label: 'Farm Fresh' },
  { icon: '🚚', label: 'Same-Day Delivery' },
  { icon: '💝', label: 'Handcrafted' },
  { icon: '⭐', label: '5-Star Quality' },
]

function HomePage() {
  const navigate                        = useNavigate()
  const { addItem }                     = useCart()
  const { flowers, loading }            = useFlowers()
  const { categories }                  = useCategories()

  // Limit to 8 featured flowers
  const featured = useMemo(() => flowers.slice(0, 8), [flowers])

  const handleCategoryClick = useCallback(
    (id) => navigate(`/flowers?category=${id}`),
    [navigate]
  )

  const handleAddToCart  = useCallback((f) => addItem(f, 1), [addItem])
  const handleViewDetails = useCallback((id) => navigate(`/flowers/${id}`), [navigate])

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero" aria-label="Welcome to Botanical Elegance">
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">ESTABLISHED 2024</div>
            <h1 className="hero__title">
              Fresh Blooms,<br />
              <em className="hero__title--accent">Delivered with Care</em>
            </h1>
            <p className="hero__subtitle">
              Discover handpicked floral arrangements for every occasion —
              from intimate gatherings to grand celebrations.
            </p>
            <div className="hero__cta-group">
              <Button variant="primary" size="lg" onClick={() => navigate('/flowers')}>
                Shop Flowers
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/register')}>
                Learn More
              </Button>
            </div>

            <div className="hero__trust" role="list" aria-label="Why choose us">
              {TRUST_ITEMS.map((item) => (
                <div key={item.label} className="trust-badge" role="listitem">
                  <span className="trust-badge__icon" aria-hidden="true">{item.icon}</span>
                  <span className="trust-badge__label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__blob" />
            <div className="hero__flower-display">
              <span className="hero__flower hero__flower--1">🌸</span>
              <span className="hero__flower hero__flower--2">🌹</span>
              <span className="hero__flower hero__flower--3">🌷</span>
              <span className="hero__flower hero__flower--4">🌻</span>
              <span className="hero__flower hero__flower--5">🪷</span>
            </div>
          </div>
        </div>
      </section>
    
      {/* ── Categories ── */}
      {categories.length > 0 && (
        <section className="home-section" aria-labelledby="categories-heading">
          <div className="container">
            <div className="home-section__header">
              <h2 className="home-section__title" id="categories-heading">Browse by Category</h2>
              <p className="home-section__subtitle">Find the perfect bloom for every moment</p>
            </div>
            <div className="categories-grid" role="list">
              {categories.map((cat) => (
                <div key={cat.id} role="listitem">
                  <CategoryCard category={cat} onClick={handleCategoryClick} size="md" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Flowers ── */}
      <section className="home-section home-section--tinted" aria-labelledby="featured-heading">
        <div className="container">
          <div className="home-section__header">
            <h2 className="home-section__title" id="featured-heading">Featured Flowers</h2>
            <p className="home-section__subtitle">Our most-loved arrangements this season</p>
          </div>

          <div className="flowers-grid" role="list">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} role="listitem"><SkeletonCard /></div>
                ))
              : featured.length === 0
              ? <EmptyState icon="🌸" title="No flowers yet" description="Check back soon!" size="sm" />
              : featured.map((flower) => (
                  <div key={flower.id} role="listitem">
                    <FlowerCard
                      flower={flower}
                      onAddToCart={handleAddToCart}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))
            }
          </div>

          <div className="home-section__cta">
            <Button variant="secondary" size="lg" onClick={() => navigate('/flowers')}>
              View All Flowers →
            </Button>
          </div>
        </div>
      </section>

      {/* ── Banner CTA ── */}
      <section className="home-banner" aria-label="Call to action">
        <div className="container home-banner__inner">
          <div className="home-banner__text">
            <h2 className="home-banner__title">Ready to send something beautiful?</h2>
            <p className="home-banner__subtitle">
              Create an account and enjoy exclusive member benefits.
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
            Get Started Free
          </Button>
        </div>
      </section>

    </div>
  )
}

export default HomePage
