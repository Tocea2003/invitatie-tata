import { EVENT } from '../../utils/constants'

export default function EventDetails() {
  return (
    <div className="event-details">
      <div className="event-details__item">
        <span className="event-details__icon">📅</span>
        <span className="event-details__text">{EVENT.dateDisplay}</span>
      </div>
      <div className="event-details__item">
        <span className="event-details__icon">🕕</span>
        <span className="event-details__text">Ora {EVENT.time}</span>
      </div>
      <div className="event-details__item">
        <span className="event-details__icon">📍</span>
        <div className="event-details__location">
          <span className="event-details__text event-details__text--bold">{EVENT.location}</span>
          <span className="event-details__text">{EVENT.address}</span>
        </div>
      </div>
    </div>
  )
}
