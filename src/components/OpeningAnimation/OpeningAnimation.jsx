import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import ChampagneBottle from './ChampagneBottle'
import './OpeningAnimation.css'

const PHASES = ['bottle', 'shake', 'cork', 'liquid', 'confetti', 'reveal']
const TIMINGS = { bottle: 1500, shake: 1200, cork: 1200, liquid: 1500, confetti: 2000 }

export default function OpeningAnimation({ onComplete, audio }) {
  const [phase, setPhase] = useState('bottle')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(() => {
        setVisible(false)
        setTimeout(onComplete, 600)
      }, 500)
      return () => clearTimeout(t)
    }

    const currentIndex = PHASES.indexOf(phase)
    if (currentIndex < 0 || currentIndex >= PHASES.length - 1) return

    const nextPhase = PHASES[currentIndex + 1]
    const delay = TIMINGS[phase]
    const t = setTimeout(() => setPhase(nextPhase), delay)
    return () => clearTimeout(t)
  }, [phase, onComplete])

  useEffect(() => {
    if (phase === 'cork' && audio?.isEnabled) {
      audio.playCork()
    }
    if (phase === 'confetti') {
      fireConfetti()
    }
  }, [phase, audio])

  const fireConfetti = useCallback(() => {
    const gold = ['#D4AF37', '#F5E6A3', '#B8860B', '#FFD700', '#FFFFFF']
    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60 + Math.random() * 60,
        spread: 70,
        origin: { x: 0.5, y: 0.4 },
        colors: gold,
        gravity: 0.6,
        scalar: 1.2,
        drift: 0,
        ticks: 200,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: gold,
      gravity: 0.4,
      scalar: 1.4,
      ticks: 300,
    })
  }, [])

  const skip = () => {
    setVisible(false)
    setTimeout(onComplete, 100)
  }

  const isBottleFading = phase === 'confetti' || phase === 'reveal'
  const isShaking = phase === 'shake' || phase === 'cork'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="opening-animation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
        >
          <div className="opening-animation__content">
            {phase === 'bottle' && !audio?.isEnabled && (
              <motion.button
                className="opening-animation__sound-prompt"
                onClick={audio?.init}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                🔊 Apasa pentru sunet
              </motion.button>
            )}

            <motion.div
              className="opening-animation__bottle-wrapper"
              initial={{ opacity: 0, y: 100 }}
              animate={
                isBottleFading
                  ? { opacity: 0, scale: 0.5, y: -50 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                isBottleFading
                  ? { duration: 0.8 }
                  : { duration: 1.2, ease: 'easeOut' }
              }
            >
              {isShaking ? (
                <motion.div
                  className="opening-animation__bottle-shake"
                  animate={
                    phase === 'shake'
                      ? {
                          x: [-3, 4, -5, 3, -4, 5, -3, 4, -2, 3, -4, 5, -3, 0],
                          rotate: [-1, 1.5, -2, 1, -1.5, 2, -1, 1.5, -2, 1, -1.5, 2, -1, 0],
                        }
                      : {
                          x: [-5, 6, -7, 5, 0],
                          rotate: [-2, 3, -2, 1, 0],
                        }
                  }
                  transition={
                    phase === 'shake'
                      ? { duration: 1.1, ease: 'easeInOut' }
                      : { duration: 0.3, ease: 'easeOut' }
                  }
                >
                  <ChampagneBottle phase={phase} />
                </motion.div>
              ) : (
                <ChampagneBottle phase={phase} />
              )}
            </motion.div>

            {(phase === 'confetti' || phase === 'reveal') && (
              <motion.div
                className="opening-animation__number"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <span className="opening-animation__fifty">50</span>
                <span className="opening-animation__years">de ani</span>
              </motion.div>
            )}
          </div>

          <button className="opening-animation__skip" onClick={skip}>
            Sari peste animatie →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
