import { useState } from 'react'
import SectionHeader from './SectionHeader'
import useReveal from '../hooks/useReveal'
import { sendEmail } from '../utils/sendEmail'
import './Contact.css'

const STATUS = { IDLE: 'idle', SENDING: 'sending', SENT: 'sent', ERROR: 'error' }

export default function Contact() {
  const formRef  = useReveal()
  const infoRef  = useReveal()

  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(STATUS.IDLE)

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === STATUS.SENDING) return
    setStatus(STATUS.SENDING)
    try {
      await sendEmail(fields)
      setStatus(STATUS.SENT)
      setFields({ name: '', email: '', message: '' })
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section className="contact" id="contact">
      <SectionHeader num="05" title="CONTACT" />
      <div className="contact-body">

        <form ref={formRef} className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="cf-row">
            <div className="cf-field">
              <label className="cf-label">NAME</label>
              <input
                className="cf-input"
                type="text"
                required
                placeholder="Your name"
                value={fields.name}
                onChange={set('name')}
              />
            </div>
            <div className="cf-field">
              <label className="cf-label">EMAIL</label>
              <input
                className="cf-input"
                type="email"
                required
                placeholder="your@email.com"
                value={fields.email}
                onChange={set('email')}
              />
            </div>
          </div>

          <div className="cf-field cf-field--full">
            <label className="cf-label">MESSAGE</label>
            <textarea
              className="cf-textarea"
              required
              rows={6}
              placeholder="What's on your mind?"
              value={fields.message}
              onChange={set('message')}
            />
          </div>

          <div className="cf-footer">
            <button
              className={`cf-submit${status === STATUS.SENDING ? ' cf-submit--loading' : ''}`}
              type="submit"
              disabled={status === STATUS.SENDING}
            >
              {status === STATUS.SENDING ? 'SENDING...' : 'SEND MESSAGE →'}
            </button>

            {status === STATUS.SENT && (
              <span className="cf-status cf-status--ok">MESSAGE SENT.</span>
            )}
            {status === STATUS.ERROR && (
              <span className="cf-status cf-status--err">FAILED — CHECK EMAILJS CONFIG.</span>
            )}
          </div>
        </form>

        <div ref={infoRef} className="contact-info reveal">
          <div className="ci-block">
            <span className="ci-label">GET IN TOUCH</span>
            <a className="ci-value ci-value--link" href="mailto:hello@kodedlabs.com">
              hello@kodedlabs.com
            </a>
          </div>
          <div className="ci-block">
            <span className="ci-label">LOCATION</span>
            <span className="ci-value">Lagos, Nigeria</span>
          </div>
          <div className="ci-block">
            <span className="ci-label">RESPONSE TIME</span>
            <span className="ci-value">Within 24 hours</span>
          </div>
        </div>

      </div>
    </section>
  )
}
