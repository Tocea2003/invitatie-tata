import { EVENT } from './constants'

export function downloadICS() {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Invitatie Lavu Ioan//RO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'DTSTART:20260821T150000Z',
    'DTEND:20260822T000000Z',
    `SUMMARY:Ziua de nastere - ${EVENT.honoree} - ${EVENT.age} ani`,
    `DESCRIPTION:Sarbatorim impreuna ${EVENT.age} de ani! Te asteptam cu drag.`,
    `LOCATION:${EVENT.location}\\, ${EVENT.address}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Maine: Petrecerea lui ${EVENT.honoree}!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'invitatie-lavu-ioan-50.ics'
  link.click()
  URL.revokeObjectURL(url)
}
