import { useState, useRef } from 'react'
import './SearchBar.css'

/**
 * SearchBar
 * Props:
 *   value       {string}   — controlled value
 *   onChange    {fn}       — called on every keystroke
 *   onSubmit    {fn}       — called when Enter or search icon clicked
 *   onClear     {fn}       — called when × is clicked
 *   placeholder {string}
 *   size        {'sm'|'md'|'lg'}
 *   autoFocus   {boolean}
 *   className   {string}
 */
function SearchBar({
  value = '',
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search flowers…',
  size = 'md',
  autoFocus = false,
  className = '',
}) {
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) onSubmit(value)
    if (e.key === 'Escape' && onClear)  { onClear(); inputRef.current?.blur() }
  }

  const handleClear = () => {
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <div className={`search-bar search-bar--${size} ${className}`} role="search">
      {/* Search icon */}
      <span className="search-bar__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>

      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck="false"
        aria-label={placeholder}
      />

      {/* Clear button */}
      {value && (
        <button
          className="search-bar__clear"
          onClick={handleClear}
          type="button"
          aria-label="Clear search"
          tabIndex={0}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" width="14" height="14" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar
