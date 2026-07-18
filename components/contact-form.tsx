'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react'

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')

    try {
      if (!formData.name.trim()) throw new Error('Please enter your name')
      if (!formData.email.trim()) throw new Error('Please enter your email')
      if (!formData.subject.trim()) throw new Error('Please enter a subject')
      if (!formData.message.trim()) throw new Error('Please enter a message')

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email))
        throw new Error('Please enter a valid email')

      console.log('[Portfolio] Form submission:', {
        timestamp: new Date().toISOString(),
        ...formData,
      })

      await new Promise((resolve) => setTimeout(resolve, 1200))

      setStatus('success')
      setMessage(
        "Thank you! Your message has been received. I'll get back to you soon."
      )
      setFormData({ name: '', email: '', subject: '', message: '' })
      formRef.current?.reset()

      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const inputClasses =
    'floating-input disabled:opacity-50'

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold mb-8 font-heading">Send a Message</h3>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Name field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="floating-input-group"
        >
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
            disabled={isLoading}
            className={inputClasses}
            suppressHydrationWarning
          />
          <label htmlFor="contact-name" className="floating-label">
            Your Name
          </label>
        </motion.div>

        {/* Email field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="floating-input-group"
        >
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
            disabled={isLoading}
            className={inputClasses}
            suppressHydrationWarning
          />
          <label htmlFor="contact-email" className="floating-label">
            Email Address
          </label>
        </motion.div>

        {/* Subject field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="floating-input-group"
        >
          <input
            type="text"
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder=" "
            disabled={isLoading}
            className={inputClasses}
            suppressHydrationWarning
          />
          <label htmlFor="contact-subject" className="floating-label">
            Subject
          </label>
        </motion.div>

        {/* Message field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="floating-input-group"
        >
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder=" "
            disabled={isLoading}
            className={`${inputClasses} resize-none pt-6`}
            suppressHydrationWarning
          />
          <label htmlFor="contact-message" className="floating-label">
            Your Message
          </label>
        </motion.div>

        {/* Status message */}
        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className={`p-4 rounded-xl flex items-center gap-3 ${
                status === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle size={20} className="flex-shrink-0" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0" />
              )}
              <p className="text-sm">{message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden rounded-xl"
            suppressHydrationWarning
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

            <div className="relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </div>
          </button>
        </motion.div>
      </form>
    </div>
  )
}
