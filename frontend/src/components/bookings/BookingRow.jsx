import Badge from '../common/Badge'
import Button from '../common/Button'

function BookingRow({ booking, onCancel }) {
  const date = new Date(booking.bookingDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <tr className="booking-row">
      <td className="booking-row__cell booking-row__cell--id">#{booking.id}</td>
      <td className="booking-row__cell booking-row__cell--flower">
        {booking.flower?.name ?? '—'}
      </td>
      <td className="booking-row__cell booking-row__cell--center">{booking.quantity}</td>
      <td className="booking-row__cell">
        <strong>${Number(booking.totalPrice).toFixed(2)}</strong>
      </td>
      <td className="booking-row__cell">{date}</td>
      <td className="booking-row__cell">
        <Badge status={booking.status} />
      </td>
      <td className="booking-row__cell">
        {booking.status === 'PENDING' && (
          <Button type="button" variant="danger" size="sm" onClick={() => onCancel(booking.id)}>
            Cancel
          </Button>
        )}
      </td>
    </tr>
  )
}

export default BookingRow
