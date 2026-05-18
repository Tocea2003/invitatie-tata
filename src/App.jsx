import { useState, useCallback, useMemo } from 'react'
import OpeningAnimation from './components/OpeningAnimation/OpeningAnimation'
import InvitationContent from './components/InvitationContent/InvitationContent'
import AudioControl from './components/AudioControl/AudioControl'
import { useAudio } from './hooks/useAudio'
import './App.css'

function AmbientParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.4,
    })),
  [])

  return (
    <div className="ambient-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ambient-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false)
  const audio = useAudio()

  const handleAnimationComplete = useCallback(() => {
    setShowInvitation(true)
    if (audio.isEnabled) {
      audio.playMusic()
    }
  }, [audio])

  return (
    <div className="app">
      <AmbientParticles />

      {!showInvitation && (
        <OpeningAnimation onComplete={handleAnimationComplete} audio={audio} />
      )}

      {showInvitation && <InvitationContent />}

      {showInvitation && audio.isEnabled && (
        <AudioControl isMuted={audio.isMuted} onToggle={audio.toggleMute} />
      )}
    </div>
  )
}
