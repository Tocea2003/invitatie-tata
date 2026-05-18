import { useCountdown } from '../../hooks/useCountdown'

function TimeUnit({ value, label }) {
  return (
    <div className="countdown__unit">
      <span className="countdown__number">{String(value).padStart(2, '0')}</span>
      <span className="countdown__label">{label}</span>
    </div>
  )
}

export default function CountdownTimer() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown()

  if (isExpired) {
    return (
      <div className="countdown countdown--expired">
        <span className="countdown__message">Evenimentul a avut loc!</span>
      </div>
    )
  }

  return (
    <div className="countdown">
      <TimeUnit value={days} label="zile" />
      <span className="countdown__separator">:</span>
      <TimeUnit value={hours} label="ore" />
      <span className="countdown__separator">:</span>
      <TimeUnit value={minutes} label="min" />
      <span className="countdown__separator">:</span>
      <TimeUnit value={seconds} label="sec" />
    </div>
  )
}
