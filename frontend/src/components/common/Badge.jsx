import './Badge.css'

const STATUS_MAP = {
  PENDING:    { label: 'Pending',    className: 'badge--pending'    },
  CONFIRMED:  { label: 'Confirmed',  className: 'badge--confirmed'  },
  CANCELLED:  { label: 'Cancelled',  className: 'badge--cancelled'  },
  IN_SEASON:  { label: 'In Season',  className: 'badge--in-season'  },
  BEST_SELLER:{ label: 'Best Seller',className: 'badge--best-seller'},
  OUT_OF_STOCK:{ label: 'Out of Stock', className: 'badge--cancelled'},
}

function Badge({ status }) {
  const config = STATUS_MAP[status] || { label: status, className: '' }
  return (
    <span className={`badge ${config.className}`}>
      {config.label}
    </span>
  )
}

export default Badge
