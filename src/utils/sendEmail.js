import emailjs from '@emailjs/browser'

// Configure via .env:
//   VITE_EMAILJS_SERVICE_ID   — your Gmail service ID from EmailJS dashboard
//   VITE_EMAILJS_TEMPLATE_ID  — your email template ID
//   VITE_EMAILJS_PUBLIC_KEY   — your public (user) key
//
// EmailJS template fields to set:
//   Reply To  → {{from_email}}
//   Content   → include {{from_name}}, {{from_email}}, {{message}}
// Template variables sent: from_name, from_email, message

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export async function sendEmail({ name, email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS env vars not configured. See src/utils/sendEmail.js for setup.')
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { from_name: name, from_email: email, message },
    { publicKey: PUBLIC_KEY }
  )
}
