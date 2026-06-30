import CategoryCard from '../CategoryCard/CategoryCard';
import './OccasionSection.css';

/**
 * OccasionSection Component
 * Combines the horizontal filter pills and the product grid safely.
 */
function OccasionSection({ categories, activeCategoryId, handleCategoryClick }) {
  // Safe guard: If there are no categories, render nothing without crashing
  if (!categories || categories.length === 0) return null;

  return (
    <section className="home-section" aria-labelledby="categories-heading">
      <div className="container">
        
        {/* TOP PILL FILTER HEADER */}
        <div className="occasion-filter-header">
          <h2 className="occasion-filter-header__title" id="categories-heading">
            Shop by Occasion
          </h2>
          
          <div className="occasion-filter-header__pills no-scrollbar" role="tablist">
            {categories.map((cat) => {
              const isActive = activeCategoryId === cat.id; 
              
              return (
                <button
                  key={`pill-${cat.id}`}
                  className={`occasion-filter-header__pill ${isActive ? 'occasion-filter-header__pill--active' : ''}`}
                  onClick={() => handleCategoryClick?.(cat.id)}
                  aria-pressed={isActive}
                  role="tab"
                  type="button"
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCT DISPLAY GRID */}
        <div className="categories-grid" role="list">
          {categories.map((cat) => (
            <div key={cat.id} role="listitem">
              <CategoryCard 
                category={cat} 
                onClick={handleCategoryClick} 
                active={activeCategoryId === cat.id} 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default OccasionSection;