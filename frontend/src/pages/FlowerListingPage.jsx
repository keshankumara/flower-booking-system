import { useState, useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFlowers }    from '../hooks/useFlowers'
import { useCategories } from '../hooks/useCategories'
import { useCart }       from '../context/CartContext'
import FlowerCard        from '../components/flowers/FlowerCard'
import SkeletonCard      from '../components/common/SkeletonCard'
import FilterSidebar     from '../components/flowers/FilterSidebar'
import EmptyState        from '../components/common/EmptyState'
import Button            from '../components/common/Button'
import './FlowerListingPage.css'

function ActiveFilters({ searchQuery, selectedCategory, categories, minPrice, maxPrice,
  onClear, onClearCategory, onClearSearch, onClearPrice }) {
  const hasFilters = searchQuery || selectedCategory || minPrice || maxPrice
  if (!hasFilters) return null
  const catName = categories.find((c) => String(c.id) === String(selectedCategory))?.name

  return (
    <div className="active-filters" role="status" aria-live="polite" aria-label="Active filters">
      <span className="active-filters__label">Active:</span>
      {searchQuery && (
        <button className="filter-tag" onClick={onClearSearch} type="button">
          Search: "{searchQuery}" ✕
        </button>
      )}
      {catName && (
        <button className="filter-tag" onClick={onClearCategory} type="button">
          {catName} ✕
        </button>
      )}
      {(minPrice || maxPrice) && (
        <button className="filter-tag" onClick={onClearPrice} type="button">
          ${minPrice || '0'} – ${maxPrice || '∞'} ✕
        </button>
      )}
      <button className="active-filters__clear-all" onClick={onClear} type="button">
        Clear all
      </button>
    </div>
  )
}

function FlowerListingPage() {
  const navigate        = useNavigate()
  const [searchParams]  = useSearchParams()
  const { addItem }     = useCart()

  const [searchQuery,       setSearchQuery]       = useState('')
  const [selectedCategory,  setSelectedCategory]  = useState(searchParams.get('category') || '')
  const [minPrice,          setMinPrice]          = useState('')
  const [maxPrice,          setMaxPrice]          = useState('')
  const [sidebarOpen,       setSidebarOpen]       = useState(false)

  const { flowers, loading, error } = useFlowers({ query: searchQuery, categoryId: selectedCategory, minPrice, maxPrice })
  const { categories } = useCategories()

  const clearAll      = useCallback(() => { setSearchQuery(''); setSelectedCategory(''); setMinPrice(''); setMaxPrice('') }, [])
  const clearSearch   = useCallback(() => setSearchQuery(''), [])
  const clearCategory = useCallback(() => setSelectedCategory(''), [])
  const clearPrice    = useCallback(() => { setMinPrice(''); setMaxPrice('') }, [])

  const handleCategoryChange = useCallback((id) => { setSelectedCategory(id); setSearchQuery('') }, [])
  const handleSearchChange   = useCallback((val) => { setSearchQuery(val); setSelectedCategory('') }, [])

  const flowerGrid = useMemo(() => flowers.map((flower) => (
    <div key={flower.id} role="listitem">
      <FlowerCard
        flower={flower}
        onAddToCart={(f) => addItem(f, 1)}
        onViewDetails={(id) => navigate(`/flowers/${id}`)}
      />
    </div>
  )), [flowers, addItem, navigate])

  return (
    <div className="listing-page">
      <div className="container listing-page__inner">

        {/* ── Sidebar ── */}
        <FilterSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          categories={categories}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchClear={clearSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPrice={setMinPrice}
          onMaxPrice={setMaxPrice}
          onClearAll={clearAll}
        />

        {/* ── Main ── */}
        <div className="listing-main">
          {/* Toolbar */}
          <div className="listing-toolbar">
            <div className="listing-toolbar__left">
              <button
                className="listing-filter-toggle"
                onClick={() => setSidebarOpen((o) => !o)}
                aria-expanded={sidebarOpen}
                aria-label="Toggle filters"
                type="button"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="8" y1="12" x2="20" y2="12"/>
                  <line x1="12" y1="18" x2="20" y2="18"/>
                </svg>
                Filters
              </button>
              {!loading && (
                <p className="listing-count" aria-live="polite">
                  {flowers.length} {flowers.length === 1 ? 'flower' : 'flowers'} found
                </p>
              )}
            </div>
          </div>

          <ActiveFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onClear={clearAll}
            onClearCategory={clearCategory}
            onClearSearch={clearSearch}
            onClearPrice={clearPrice}
          />

          {error && (
            <div className="listing-error" role="alert">⚠ {error}</div>
          )}

          {loading ? (
            <div className="flowers-grid" aria-busy="true" aria-label="Loading flowers">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : flowers.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No flowers found"
              description="Try adjusting your filters or search term."
              action={<Button variant="primary" onClick={clearAll}>Show all flowers</Button>}
            />
          ) : (
            <div className="flowers-grid" role="list" aria-label="Flower catalog">
              {flowerGrid}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlowerListingPage
