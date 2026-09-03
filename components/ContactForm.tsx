'use client'

import { useState, useRef, FormEvent } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setSending(true)
    setError('')

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSent(true)
      formRef.current.reset()
    } catch {
      setError('Something went wrong. Please try again or email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {sent && (
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] text-sm text-emerald-400">
          ✓ Thanks for reaching out! I'll get back to you soon.
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.03] text-sm text-red-400">
          {error}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          required
          className="input-glass"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          required
          className="input-glass"
        />
      </div>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        className="input-glass"
      />
      <textarea
        name="message"
        rows={4}
        placeholder="Message"
        required
        className="input-glass resize-none"
      />
      <button
        type="submit"
        disabled={sending}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? (
          'Sending...'
        ) : (
          <>
            Send Message
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polyline points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}