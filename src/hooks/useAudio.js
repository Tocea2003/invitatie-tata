import { useState, useRef, useCallback } from 'react'

function createCorkPopSound(ctx) {
  const duration = 0.6
  const now = ctx.currentTime

  // Initial pop - short burst of noise
  const bufferSize = ctx.sampleRate * duration
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02))
  }

  const noise = ctx.createBufferSource()
  noise.buffer = noiseBuffer

  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.8, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)

  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = 'bandpass'
  noiseFilter.frequency.setValueAtTime(2000, now)
  noiseFilter.frequency.exponentialRampToValueAtTime(400, now + 0.1)
  noiseFilter.Q.value = 1

  noise.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(ctx.destination)

  // Low thud
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(150, now)
  osc.frequency.exponentialRampToValueAtTime(50, now + 0.2)

  const oscGain = ctx.createGain()
  oscGain.gain.setValueAtTime(0.6, now)
  oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)

  osc.connect(oscGain)
  oscGain.connect(ctx.destination)

  // High fizz (champagne spray)
  const fizzSize = ctx.sampleRate * 1.5
  const fizzBuffer = ctx.createBuffer(1, fizzSize, ctx.sampleRate)
  const fizzData = fizzBuffer.getChannelData(0)
  for (let i = 0; i < fizzSize; i++) {
    fizzData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.5))
  }

  const fizz = ctx.createBufferSource()
  fizz.buffer = fizzBuffer

  const fizzGain = ctx.createGain()
  fizzGain.gain.setValueAtTime(0, now)
  fizzGain.gain.linearRampToValueAtTime(0.15, now + 0.05)
  fizzGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2)

  const fizzFilter = ctx.createBiquadFilter()
  fizzFilter.type = 'highpass'
  fizzFilter.frequency.value = 3000

  fizz.connect(fizzFilter)
  fizzFilter.connect(fizzGain)
  fizzGain.connect(ctx.destination)

  noise.start(now)
  osc.start(now)
  fizz.start(now + 0.02)
  osc.stop(now + duration)
}

function createAmbientMusic(ctx) {
  const masterGain = ctx.createGain()
  masterGain.gain.value = 0.06
  masterGain.connect(ctx.destination)

  const notes = [261.63, 329.63, 392.00, 523.25]
  const oscillators = []

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const gain = ctx.createGain()
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.1 + i * 0.05

    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.3

    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    gain.gain.value = 0.5

    osc.connect(gain)
    gain.connect(masterGain)

    osc.start()
    lfo.start()
    oscillators.push({ osc, lfo, gain })
  })

  return { masterGain, oscillators }
}

export function useAudio() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const ctxRef = useRef(null)
  const musicRef = useRef(null)

  const init = useCallback(() => {
    if (ctxRef.current) return
    ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    setIsEnabled(true)
  }, [])

  const playCork = useCallback(() => {
    if (!ctxRef.current) return
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    createCorkPopSound(ctxRef.current)
  }, [])

  const playMusic = useCallback(() => {
    if (!ctxRef.current || musicRef.current) return
    musicRef.current = createAmbientMusic(ctxRef.current)
  }, [])

  const toggleMute = useCallback(() => {
    if (!musicRef.current) return
    if (isMuted) {
      musicRef.current.masterGain.gain.linearRampToValueAtTime(0.06, ctxRef.current.currentTime + 0.3)
      setIsMuted(false)
    } else {
      musicRef.current.masterGain.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.3)
      setIsMuted(true)
    }
  }, [isMuted])

  return { isEnabled, isMuted, init, playCork, playMusic, toggleMute }
}
