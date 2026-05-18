import { motion } from 'framer-motion'

export default function ChampagneBottle({ phase }) {
  const showCork = phase === 'bottle' || phase === 'shake' || phase === 'cork'
  const corkPopping = phase === 'cork'
  const showSpray = phase === 'cork' || phase === 'liquid'
  const showLiquid = phase === 'liquid' || phase === 'confetti'
  const isShaking = phase === 'shake'

  return (
    <svg
      viewBox="0 0 120 400"
      className="champagne-bottle"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3a1a" />
          <stop offset="50%" stopColor="#2d4a22" />
          <stop offset="100%" stopColor="#1a3a1a" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F5E6A3" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5E6A3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Bottle body */}
      <path
        d="M30,340 L30,200 Q30,180 35,165 L35,165 Q38,155 42,148 L42,100 Q42,90 48,85 L48,60 Q48,55 50,53 L50,53 Q60,48 60,48 L60,48 Q60,48 70,53 L70,53 Q72,55 72,60 L72,85 Q78,90 78,100 L78,148 Q82,155 85,165 L85,165 Q90,180 90,200 L90,340 Q90,350 80,350 L40,350 Q30,350 30,340 Z"
        fill="url(#bottleGrad)"
        stroke="#1a3a1a"
        strokeWidth="0.5"
      />

      {/* Bottle highlight */}
      <path
        d="M40,340 L40,205 Q40,185 44,170 L44,170 Q46,162 48,155 L48,105 Q48,97 52,92"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Label area */}
      <rect x="35" y="220" width="50" height="70" rx="3" fill="#1A1A1A" stroke="url(#goldGrad)" strokeWidth="1.5" />
      <rect x="38" y="223" width="44" height="64" rx="2" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.5" />

      {/* "50" on label */}
      <text x="60" y="262" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="32" fontWeight="900" fill="url(#goldGrad)">
        50
      </text>
      <text x="60" y="280" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill="#D4AF37" letterSpacing="3">
        ANI
      </text>

      {/* Foil/capsule */}
      <rect x="46" y="48" width="28" height="18" rx="2" fill="url(#goldGrad)" />
      <line x1="50" y1="50" x2="50" y2="64" stroke="#B8860B" strokeWidth="0.5" opacity="0.5" />
      <line x1="55" y1="50" x2="55" y2="64" stroke="#B8860B" strokeWidth="0.5" opacity="0.5" />
      <line x1="65" y1="50" x2="65" y2="64" stroke="#B8860B" strokeWidth="0.5" opacity="0.5" />
      <line x1="70" y1="50" x2="70" y2="64" stroke="#B8860B" strokeWidth="0.5" opacity="0.5" />

      {/* Neck ring */}
      <ellipse cx="60" cy="85" rx="18" ry="3" fill="url(#goldGrad)" opacity="0.7" />

      {/* Pressure bubbles inside neck during shake */}
      {isShaking && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={`pressure-${i}`}
              cx={55 + i * 2}
              cy={55}
              r={1.5}
              fill="#F5E6A3"
              opacity={0.5}
              animate={{
                y: [0, -(5 + i * 3), 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                delay: i * 0.08,
              }}
            />
          ))}
        </>
      )}

      {/* Cork — flies off dramatically on pop */}
      {showCork && (
        <motion.g
          initial={false}
          animate={
            corkPopping
              ? {
                  y: -350,
                  x: 15,
                  rotate: 1080,
                  opacity: [1, 1, 1, 0.8, 0],
                }
              : isShaking
                ? {
                    y: [0, -4, 0, -3, 0, -5, 0, -3, 0],
                  }
                : { y: 0 }
          }
          transition={
            corkPopping
              ? { duration: 0.9, ease: [0.2, 0, 0.2, 1] }
              : isShaking
                ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
          }
        >
          {/* Cork body */}
          <rect x="51" y="30" width="18" height="22" rx="3" fill="#C4A35A" />
          {/* Cork top (wider mushroom shape) */}
          <rect x="48" y="24" width="24" height="10" rx="3" fill="#B8960F" />
          {/* Cork wire cage */}
          <path d="M50,34 L48,28 M70,34 L72,28" stroke="#888" strokeWidth="0.7" fill="none" />
          <path d="M52,34 L55,26 M68,34 L65,26" stroke="#888" strokeWidth="0.5" fill="none" opacity="0.6" />
          {/* Cork texture lines */}
          <line x1="55" y1="33" x2="55" y2="50" stroke="#A08830" strokeWidth="0.5" opacity="0.4" />
          <line x1="60" y1="33" x2="60" y2="50" stroke="#A08830" strokeWidth="0.5" opacity="0.4" />
          <line x1="65" y1="33" x2="65" y2="50" stroke="#A08830" strokeWidth="0.5" opacity="0.4" />
        </motion.g>
      )}

      {/* Big spray burst when cork pops */}
      {showSpray && (
        <>
          {/* Central spray jet */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`spray-${i}`}
              cx={56 + Math.sin(i * 0.8) * 6}
              cy={40}
              r={2 + (i % 3)}
              fill="#F5E6A3"
              initial={{ y: 0, scale: 0, opacity: 0.9 }}
              animate={{
                y: -(40 + i * 20 + Math.random() * 30),
                x: (Math.sin(i * 1.5)) * 25,
                scale: [0, 1.8, 0.5],
                opacity: [0.9, 0.7, 0],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.5,
                delay: i * 0.04,
                ease: 'easeOut',
              }}
            />
          ))}
          {/* Side spray droplets */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={`drop-${i}`}
              cx={60}
              cy={38}
              r={1 + Math.random() * 1.5}
              fill="#D4AF37"
              initial={{ opacity: 0.8 }}
              animate={{
                y: -(20 + Math.random() * 60),
                x: (i % 2 === 0 ? 1 : -1) * (15 + Math.random() * 25),
                opacity: 0,
              }}
              transition={{
                duration: 0.6 + Math.random() * 0.4,
                delay: 0.1 + i * 0.05,
                ease: 'easeOut',
              }}
            />
          ))}
          {/* Foam burst at opening */}
          <motion.ellipse
            cx={60}
            cy={48}
            rx={8}
            ry={4}
            fill="#F5E6A3"
            opacity={0.6}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 2.5, 3], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 0.8 }}
          />
        </>
      )}

      {/* Liquid overflow */}
      {showLiquid && (
        <motion.g>
          {/* Main left stream */}
          <motion.path
            d="M55,48 Q52,60 48,80 Q44,110 42,150 Q39,190 38,230"
            fill="none"
            stroke="url(#liquidGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.8 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          {/* Main right stream */}
          <motion.path
            d="M65,48 Q68,60 72,80 Q76,110 78,150 Q81,190 82,230"
            fill="none"
            stroke="url(#liquidGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.7 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.15 }}
          />
          {/* Center drip */}
          <motion.path
            d="M60,48 Q60,65 59,90 Q58,120 60,160"
            fill="none"
            stroke="url(#liquidGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
          {/* Rising bubbles */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={`bubble-${i}`}
              cx={48 + Math.random() * 24}
              cy={50 + Math.random() * 40}
              r={1 + Math.random() * 2.5}
              fill="#F5E6A3"
              opacity={0.6}
              initial={{ y: 0, opacity: 0.6 }}
              animate={{ y: -(25 + Math.random() * 35), opacity: 0 }}
              transition={{
                duration: 0.8 + Math.random() * 1,
                delay: Math.random() * 1.2,
                repeat: 2,
                repeatType: 'loop',
              }}
            />
          ))}
        </motion.g>
      )}
    </svg>
  )
}
