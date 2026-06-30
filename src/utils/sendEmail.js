// Dynamic import so @emailjs/browser never loads during SSR prerendering
let _emailjs

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export async function sendEmail({ name, email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS env vars not configured. See src/utils/sendEmail.js for setup.')
  }

  if (!_emailjs) {
    const mod = await import('@emailjs/browser')
    _emailjs = mod.default ?? mod
  }

  return _emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { from_name: name, from_email: email, message },
    { publicKey: PUBLIC_KEY }
  )
}
