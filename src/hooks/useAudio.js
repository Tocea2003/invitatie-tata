import { useState, useRef, useCallback } from 'react'
import { Howl } from 'howler'

export function useAudio() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const corkSound = useRef(null)
  const bgMusic = useRef(null)

  const init = useCallback(() => {
    if (corkSound.current) return
    corkSound.current = new Howl({
      src: [new URL('/sounds/cork-pop.mp3', import.meta.url).href],
      volume: 0.7,
    })
    bgMusic.current = new Howl({
      src: [new URL('/sounds/background.mp3', import.meta.url).href],
      volume: 0.15,
      loop: true,
    })
    setIsEnabled(true)
  }, [])

  const playCork = useCallback(() => {
    corkSound.current?.play()
  }, [])

  const playMusic = useCallback(() => {
    bgMusic.current?.play()
  }, [])

  const toggleMute = useCallback(() => {
    if (!bgMusic.current) return
    if (bgMusic.current.playing()) {
      bgMusic.current.pause()
      setIsMuted(true)
    } else {
      bgMusic.current.play()
      setIsMuted(false)
    }
  }, [])

  return { isEnabled, isMuted, init, playCork, playMusic, toggleMute }
}
