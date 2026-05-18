import { motion } from 'framer-motion'

export default function ChampagneBottle({ phase }) {
  return (
    <svg
      viewBox="0 0 120 360"
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
        <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a3a1a" />
          <stop offset="50%" stopColor="#3a5a2a" />
          <stop offset="100%" stopColor="#1a3a1a" />
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

      {/* Cork */}
      {(phase === 'bottle' || phase === 'cork') && (
        <motion.g
          animate={
            phase === 'cork'
              ? { y: -300, x: 30, rotate: 720, opacity: 0 }
              : {}
          }
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <rect x="51" y="30" width="18" height="22" rx="3" fill="#C4A35A" />
          <rect x="49" y="26" width="22" height="8" rx="2" fill="#B8960F" />
          <line x1="55" y1="32" x2="55" y2="50" stroke="#A08830" strokeWidth="0.5" opacity="0.4" />
          <line x1="60" y1="32" x2="60" y2="50" stroke="#A08830" strokeWidth="0.5" opacity="0.4" />
          <line x1="65" y1="32" x2="65" y2="50" stroke="#A08830" strokeWidth="0.5" opacity="0.4" />
        </motion.g>
      )}

      {/* Spray mist when cork pops */}
      {phase === 'cork' && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx={55 + Math.random() * 10}
              cy={35}
              r={2 + Math.random() * 3}
              fill="#F5E6A3"
              opacity={0.8}
              initial={{ y: 0, scale: 0, opacity: 0.8 }}
              animate={{
                y: -(30 + Math.random() * 40),
                x: (Math.random() - 0.5) * 40,
                scale: 1.5,
                opacity: 0,
              }}
              transition={{ duration: 0.6 + Math.random() * 0.4, delay: Math.random() * 0.2 }}
            />
          ))}
        </>
      )}

      {/* Liquid overflow */}
      {(phase === 'liquid' || phase === 'confetti') && (
        <motion.g>
          <motion.path
            d="M52,48 Q50,55 48,70 Q45,90 43,120 Q40,160 38,200"
            fill="none"
            stroke="url(#liquidGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.8 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.path
            d="M68,48 Q70,55 72,70 Q75,90 77,120 Q80,160 82,200"
            fill="none"
            stroke="url(#liquidGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.7 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          />
          {/* Bubbles */}
          {[...Array(10)].map((_, i) => (
            <motion.circle
              key={`bubble-${i}`}
              cx={50 + Math.random() * 20}
              cy={50 + Math.random() * 30}
              r={1.5 + Math.random() * 2}
              fill="#F5E6A3"
              opacity={0.6}
              initial={{ y: 0, opacity: 0.6 }}
              animate={{ y: -(20 + Math.random() * 30), opacity: 0 }}
              transition={{
                duration: 1 + Math.random() * 1,
                delay: Math.random() * 1,
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
