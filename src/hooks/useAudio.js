import { useState, useRef, useCallback } from 'react'

const NOTE_FREQS = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46,
}

const HAPPY_BIRTHDAY = [
  ['C4', 0.75], ['C4', 0.25],
  ['D4', 1], ['C4', 1], ['F4', 1], ['E4', 1.8], [null, 0.2],

  ['C4', 0.75], ['C4', 0.25],
  ['D4', 1], ['C4', 1], ['G4', 1], ['F4', 1.8], [null, 0.2],

  ['C4', 0.75], ['C4', 0.25],
  ['C5', 1], ['A4', 1], ['F4', 1], ['E4', 1], ['D4', 1.8], [null, 0.2],

  ['Bb4', 0.75], ['Bb4', 0.25],
  ['A4', 1], ['F4', 1], ['G4', 1], ['F4', 2.5],
]

function playPianoNote(ctx, freq, startTime, duration, masterGain) {
  const fundamental = ctx.createOscillator()
  fundamental.type = 'sine'
  fundamental.frequency.value = freq

  const second = ctx.createOscillator()
  second.type = 'sine'
  second.frequency.value = freq * 2
  const secondGain = ctx.createGain()
  secondGain.gain.value = 0.3

  const third = ctx.createOscillator()
  third.type = 'sine'
  third.frequency.value = freq * 3
  const thirdGain = ctx.createGain()
  thirdGain.gain.value = 0.1

  const fourth = ctx.createOscillator()
  fourth.type = 'sine'
  fourth.frequency.value = freq * 4
  const fourthGain = ctx.createGain()
  fourthGain.gain.value = 0.04

  const noteGain = ctx.createGain()
  const attack = 0.01
  const decay = 0.15
  const sustainLevel = 0.4
  const release = Math.min(duration * 0.4, 0.3)

  noteGain.gain.setValueAtTime(0, startTime)
  noteGain.gain.linearRampToValueAtTime(0.7, startTime + attack)
  noteGain.gain.exponentialRampToValueAtTime(sustainLevel, startTime + attack + decay)
  noteGain.gain.setValueAtTime(sustainLevel, startTime + duration - release)
  noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

  fundamental.connect(noteGain)
  second.connect(secondGain)
  secondGain.connect(noteGain)
  third.connect(thirdGain)
  thirdGain.connect(noteGain)
  fourth.connect(fourthGain)
  fourthGain.connect(noteGain)
  noteGain.connect(masterGain)

  fundamental.start(startTime)
  fundamental.stop(startTime + duration + 0.05)
  second.start(startTime)
  second.stop(startTime + duration + 0.05)
  third.start(startTime)
  third.stop(startTime + duration + 0.05)
  fourth.start(startTime)
  fourth.stop(startTime + duration + 0.05)
}

function playHappyBirthday(ctx, masterGain) {
  const tempo = 100
  const beatDuration = 60 / tempo

  let currentTime = ctx.currentTime + 0.3
  let totalDuration = 0

  for (const [note, beats] of HAPPY_BIRTHDAY) {
    const dur = beats * beatDuration
    if (note) {
      playPianoNote(ctx, NOTE_FREQS[note], currentTime, dur * 0.9, masterGain)
    }
    currentTime += dur
    totalDuration += dur
  }

  return totalDuration
}

function scheduleLoop(ctx, masterGain, isStoppedRef) {
  if (isStoppedRef.current) return
  const duration = playHappyBirthday(ctx, masterGain)
  setTimeout(() => {
    scheduleLoop(ctx, masterGain, isStoppedRef)
  }, (duration + 1.5) * 1000)
}

function createCorkPopSound(ctx) {
  const now = ctx.currentTime

  const bufferSize = ctx.sampleRate * 0.6
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

  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(150, now)
  osc.frequency.exponentialRampToValueAtTime(50, now + 0.2)
  const oscGain = ctx.createGain()
  oscGain.gain.setValueAtTime(0.6, now)
  oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)
  osc.connect(oscGain)
  oscGain.connect(ctx.destination)

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
  osc.stop(now + 0.6)
}

export function useAudio() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const ctxRef = useRef(null)
  const masterGainRef = useRef(null)
  const isStoppedRef = useRef(false)

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
    if (!ctxRef.current || masterGainRef.current) return
    const gain = ctxRef.current.createGain()
    gain.gain.value = 0.25
    gain.connect(ctxRef.current.destination)
    masterGainRef.current = gain
    isStoppedRef.current = false
    scheduleLoop(ctxRef.current, gain, isStoppedRef)
  }, [])

  const toggleMute = useCallback(() => {
    if (!masterGainRef.current) return
    const ctx = ctxRef.current
    if (isMuted) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3)
      setIsMuted(false)
    } else {
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
      setIsMuted(true)
    }
  }, [isMuted])

  return { isEnabled, isMuted, init, playCork, playMusic, toggleMute }
}
