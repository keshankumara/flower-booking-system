import { useState } from 'react'
import './AdminTable.css'

/**
 * AdminTable — generic sortable, scrollable data table for admin pages.
 *
 * Props:
 *   columns   Array<{
 *     key:       string,          — data key / sort key
 *     label:     string,          — column header text
 *     sortable?: boolean,
 *     render?:   (value, row) => ReactNode  — custom cell renderer
 *     width?:    string,          — CSS width (e.g. '80px')
 *   }>
 *   rows      Array<object>       — data rows; each must have a unique `id`
 *   loading   boolean
 *   emptyMessage string
 *   defaultSort  { key: string, asc: boolean }
 */
function AdminTable({
  columns = [],
  rows = [],
  loading = false,
  emptyMessage = 'No data found.',
  defaultSort = null,
}) {
  const [sortKey, setSortKey] = useState(defaultSort?.key ?? null)
  const [sortAsc, setSortAsc] = useState(defaultSort?.asc ?? false)

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc((a) => !a)
    else { setSortKey(key); setSortAsc(false) }
  }

  const sorted = [...rows].sort((a, b) => {
    if (!sortKey) return 0
    const va = a[sortKey]
    const vb = b[sortKey]
    if (va == null) return 1
    if (vb == null) return -1
    const cmp = typeof va === 'number'
      ? va - vb
      : String(va).localeCompare(String(vb))
    return sortAsc ? cmp : -cmp
  })

  return (
    <div className="admin-table-wrap" role="region" aria-label="Data table">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : {}}
                className={col.sortable ? 'sortable' : ''}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={
                  col.sortable && sortKey === col.key
                    ? sortAsc ? 'ascending' : 'descending'
                    : col.sortable ? 'none' : undefined
                }
              >
                <span className="admin-table__th-inner">
                  {col.label}
                  {col.sortable && (
                    <span className="admin-table__sort-icon" aria-hidden="true">
                      {sortKey === col.key ? (sortAsc ? ' ↑' : ' ↓') : ' ↕'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={`sk-${i}`} className="admin-table__skeleton-row" aria-hidden="true">
                {columns.map((col) => (
                  <td key={col.key}>
                    <span className="admin-table__skeleton-cell" />
                  </td>
                ))}
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="admin-table__empty"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable
