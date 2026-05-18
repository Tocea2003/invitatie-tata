import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

function StartScreen({ onStart }) {
  return (
    <motion.div
      className="start-screen"
      onClick={onStart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="start-screen__content">
        <motion.div
          className="start-screen__icon"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🥂
        </motion.div>
        <p className="start-screen__text">Apasa pentru a incepe</p>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const audio = useAudio()

  const handleStart = useCallback(() => {
    audio.init()
    setStarted(true)
  }, [audio])

  const handleAnimationComplete = useCallback(() => {
    setShowInvitation(true)
    audio.playMusic()
  }, [audio])

  return (
    <div className="app">
      <AmbientParticles />

      <AnimatePresence>
        {!started && <StartScreen onStart={handleStart} />}
      </AnimatePresence>

      {started && !showInvitation && (
        <OpeningAnimation onComplete={handleAnimationComplete} audio={audio} />
      )}

      {showInvitation && <InvitationContent />}

      {showInvitation && audio.isEnabled && (
        <AudioControl isMuted={audio.isMuted} onToggle={audio.toggleMute} />
      )}
    </div>
  )
}
