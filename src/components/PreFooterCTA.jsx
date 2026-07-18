import { useState } from 'react'
import Model3D from './shared/Model3DLazy'
import GlowGradient from './shared/GlowGradient'
import { sendEmail } from '../utils/sendEmail'
import './PreFooterCTA.css'

const STATUS = { IDLE: 'idle', SENDING: 'sending', SENT: 'sent', ERROR: 'error' }

export default function PreFooterCTA() {
  const [fields, setFields] = useState({ email: '', message: '' })
  const [status, setStatus] = useState(STATUS.IDLE)

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === STATUS.SENDING) return
    setStatus(STATUS.SENDING)
    try {
      await sendEmail({ name: fields.email, email: fields.email, message: fields.message })
      setStatus(STATUS.SENT)
      setFields({ email: '', message: '' })
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section className="prefooter-cta">
      <GlowGradient size={720} opacity={0.22} />
      <Model3D
        modelUrl="/models/pur-0.glb"
        scale={2.8}
        rotationY={0}
        idle="none"
        height={480}
        cameraDistance={6}
        placeholderLabel="MASCOT"
        className="prefooter-mascot"
      />

      <h2 className="prefooter-title">Got something to build?</h2>
      <p className="prefooter-subtext">
        Tell me what you're working on — I read every message myself.
      </p>

      <form className="prefooter-form" onSubmit={handleSubmit}>
        <input
          className="prefooter-input"
          type="email"
          required
          placeholder="your@email.com"
          value={fields.email}
          onChange={set('email')}
        />
        <input
          className="prefooter-input"
          type="text"
          required
          placeholder="What are you building?"
          value={fields.message}
          onChange={set('message')}
        />
        <button
          className="prefooter-submit"
          type="submit"
          disabled={status === STATUS.SENDING}
        >
          {status === STATUS.SENDING ? 'SENDING…' : 'Send →'}
        </button>
      </form>

      {status === STATUS.SENT  && <span className="prefooter-status prefooter-status--ok">Message sent.</span>}
      {status === STATUS.ERROR && <span className="prefooter-status prefooter-status--err">Failed — check EmailJS config.</span>}
    </section>
  )
}
