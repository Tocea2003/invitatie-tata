import { EVENT } from './constants'

export function getGoogleCalendarURL() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Ziua de nastere - ${EVENT.honoree} - ${EVENT.age} ani`,
    dates: '20260821T150000Z/20260822T000000Z',
    location: `${EVENT.location}, ${EVENT.address}`,
    details: `Sarbatorim impreuna ${EVENT.age} de ani!\nTe asteptam cu drag la ${EVENT.location}.\n\nAdresa: ${EVENT.address}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function getWhatsAppURL() {
  const message = encodeURIComponent(
    `Buna! Confirm prezenta la petrecerea de ${EVENT.age} de ani a lui ${EVENT.honoree}, pe ${EVENT.dateDisplay}. Ne vedem acolo! 🎉`
  )
  return `https://wa.me/${EVENT.phone}?text=${message}`
}

export function getMapsURL() {
  return `https://www.google.com/maps/search/?api=1&query=${EVENT.mapsQuery}`
}
