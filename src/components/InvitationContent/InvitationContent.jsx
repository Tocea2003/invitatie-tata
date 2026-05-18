import { motion } from 'framer-motion'
import EventDetails from './EventDetails'
import CountdownTimer from './CountdownTimer'
import ActionButtons from '../ActionButtons/ActionButtons'
import { EVENT } from '../../utils/constants'
import './InvitationContent.css'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

function GoldDivider() {
  return (
    <div className="gold-divider">
      <span className="gold-divider__line" />
      <span className="gold-divider__ornament">✦</span>
      <span className="gold-divider__line" />
    </div>
  )
}

export default function InvitationContent() {
  return (
    <motion.div
      className="invitation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="invitation__card">
        <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.8 }}>
          <GoldDivider />
        </motion.div>

        <motion.div className="invitation__header" {...fadeUp} transition={{ delay: 0.3, duration: 0.8 }}>
          <p className="invitation__subtitle">Esti invitat la sarbatorirea a</p>
          <div className="invitation__age-badge">
            <span className="invitation__age">50</span>
            <span className="invitation__age-text">de ani</span>
          </div>
          <h1 className="invitation__name">{EVENT.honoree}</h1>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.5, duration: 0.8 }}>
          <GoldDivider />
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.7, duration: 0.8 }}>
          <EventDetails />
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.9, duration: 0.8 }}>
          <GoldDivider />
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 1.1, duration: 0.8 }}>
          <p className="invitation__countdown-label">Numaratoare inversa</p>
          <CountdownTimer />
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 1.3, duration: 0.8 }}>
          <GoldDivider />
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 1.5, duration: 0.8 }}>
          <ActionButtons />
        </motion.div>

        <motion.div className="invitation__deadline" {...fadeUp} transition={{ delay: 1.7, duration: 0.8 }}>
          <p className="invitation__deadline-text">
            Te rugam sa confirmi prezenta pana pe
            <strong> {EVENT.rsvpDeadline}</strong>
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 1.9, duration: 0.8 }}>
          <GoldDivider />
        </motion.div>

        <motion.p className="invitation__footer" {...fadeUp} transition={{ delay: 2.1, duration: 0.8 }}>
          Te asteptam cu drag!
        </motion.p>
      </div>
    </motion.div>
  )
}
