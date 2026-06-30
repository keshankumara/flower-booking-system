import './Pagination.css'

/**
 * Pagination
 * Props:
 *   currentPage  number   (1-indexed)
 *   totalPages   number
 *   onPageChange (page: number) => void
 *   showEdges    boolean  — show first/last page buttons
 *   siblingCount number   — pages to show on each side of current (default 1)
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showEdges = true,
  siblingCount = 1,
}) {
  if (totalPages <= 1) return null

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  // Build the page number array with ellipsis markers
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const buildPages = () => {
    const total  = totalPages
    const curr   = currentPage
    const siblings = siblingCount
    const showCount = siblings * 2 + 5 // siblings + curr + 2 edges + 2 dots

    if (total <= showCount) return range(1, total)

    const leftSib  = Math.max(curr - siblings, 1)
    const rightSib = Math.min(curr + siblings, total)

    const showLeft  = leftSib  > 2
    const showRight = rightSib < total - 1

    if (!showLeft && showRight)  return [...range(1, rightSib + 1), '…', total]
    if (showLeft  && !showRight) return [1, '…', ...range(leftSib - 1, total)]
    return [1, '…', ...range(leftSib, rightSib), '…', total]
  }

  const pages = buildPages()

  return (
    <nav className="pagination" aria-label="Page navigation" role="navigation">
      {/* Prev */}
      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        type="button"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === '…' ? (
          <span key={`dots-${i}`} className="pagination__dots" aria-hidden="true">…</span>
        ) : (
          <button
            key={page}
            className={`pagination__btn${page === currentPage ? ' pagination__btn--active' : ''}`}
            onClick={() => goTo(page)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            type="button"
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        type="button"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
        </svg>
      </button>
    </nav>
  )
}

export default Pagination
