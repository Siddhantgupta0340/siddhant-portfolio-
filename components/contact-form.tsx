'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')

    try {
      // Validate form
      if (!formData.name.trim()) throw new Error('Please enter your name')
      if (!formData.email.trim()) throw new Error('Please enter your email')
      if (!formData.subject.trim()) throw new Error('Please enter a subject')
      if (!formData.message.trim()) throw new Error('Please enter a message')

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) throw new Error('Please enter a valid email')

      // Log form data to console (in production, this would be sent to backend)
      console.log('[v0] Form submission received:', {
        timestamp: new Date().toISOString(),
        ...formData,
      })

      // Simulate sending delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      setStatus('success')
      setMessage('Thank you! Your message has been received. I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      formRef.current?.reset()

      // Auto-clear success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Name field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Siddhant Gupta"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
          />
        </motion.div>

        {/* Email field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
          />
        </motion.div>

        {/* Subject field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Project Inquiry"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
          />
        </motion.div>

        {/* Message field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell me about your project..."
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 resize-none disabled:opacity-50"
          />
        </motion.div>

        {/* Status message */}
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg flex items-center gap-3 ${
              status === 'success'
                ? 'bg-green-500/10 border border-green-500/50 text-green-400'
                : 'bg-red-500/10 border border-red-500/50 text-red-400'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle size={20} className="flex-shrink-0" />
            ) : (
              <AlertCircle size={20} className="flex-shrink-0" />
            )}
            <p>{message}</p>
          </motion.div>
        )}

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
            className="w-full relative group"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
            <div className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </div>
          </button>
        </motion.div>

       
      </form>
    </div>
  )
}
