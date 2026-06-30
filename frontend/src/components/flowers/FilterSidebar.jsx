import { useEffect } from 'react'
import SearchBar from '../common/SearchBar'
import './FilterSidebar.css'

/**
 * FilterSidebar
 * Props:
 *   isOpen          boolean
 *   onClose         () => void
 *   categories      Category[]
 *   searchQuery     string
 *   onSearchChange  (val: string) => void
 *   onSearchClear   () => void
 *   selectedCategory string | number
 *   onCategoryChange (id) => void
 *   minPrice        string
 *   maxPrice        string
 *   onMinPrice      (val: string) => void
 *   onMaxPrice      (val: string) => void
 *   onClearAll      () => void
 */
function FilterSidebar({
  isOpen,
  onClose,
  categories = [],
  searchQuery,
  onSearchChange,
  onSearchClear,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
  onClearAll,
}) {
  // Lock scroll when open on mobile
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return ()  => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && isOpen) onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const hasFilters = searchQuery || selectedCategory || minPrice || maxPrice

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="filter-sidebar__backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`filter-sidebar${isOpen ? ' filter-sidebar--open' : ''}`}
        aria-label="Search and filter"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="filter-sidebar__header">
          <h2 className="filter-sidebar__title">Filters</h2>
          <button
            className="filter-sidebar__close"
            onClick={onClose}
            aria-label="Close filters"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" width="18" height="18" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="filter-group">
          <p className="filter-group__label">Search</p>
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onSearchClear}
            placeholder="Search flowers…"
          />
        </div>

        {/* Category */}
        {categories.length > 0 && (
          <div className="filter-group">
            <p className="filter-group__label">Category</p>
            <div className="filter-category-list" role="group" aria-label="Filter by category">
              <button
                className={`filter-category-btn${!selectedCategory ? ' filter-category-btn--active' : ''}`}
                onClick={() => onCategoryChange?.('')}
                aria-pressed={!selectedCategory}
                type="button"
              >
                All Flowers
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-category-btn${String(selectedCategory) === String(cat.id) ? ' filter-category-btn--active' : ''}`}
                  onClick={() => onCategoryChange?.(cat.id)}
                  aria-pressed={String(selectedCategory) === String(cat.id)}
                  type="button"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price range */}
        <div className="filter-group">
          <p className="filter-group__label">Price Range</p>
          <div className="filter-price-row">
            <div className="filter-price-input">
              <span className="filter-price-input__prefix">$</span>
              <input
                type="number"
                className="filter-price-input__field"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => onMinPrice?.(e.target.value)}
                min={0}
                aria-label="Minimum price"
              />
            </div>
            <span className="filter-price-sep" aria-hidden="true">—</span>
            <div className="filter-price-input">
              <span className="filter-price-input__prefix">$</span>
              <input
                type="number"
                className="filter-price-input__field"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => onMaxPrice?.(e.target.value)}
                min={0}
                aria-label="Maximum price"
              />
            </div>
          </div>
        </div>

        {/* Clear all */}
        {hasFilters && (
          <button
            className="filter-sidebar__clear-btn"
            onClick={onClearAll}
            type="button"
          >
            Clear all filters
          </button>
        )}
      </aside>
    </>
  )
}

export default FilterSidebar
