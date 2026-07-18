'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Download, FileText, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { downloadResume } from '@/lib/resume'

type ResumeButtonProps = {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
  pulse?: boolean
  fullWidth?: boolean
  showStatus?: boolean
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base sm:text-lg',
}

const variantClasses = {
  primary:
    'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg shadow-primary/20 hover:shadow-[0_0_34px_rgba(108,99,255,0.45)]',
  outline:
    'border border-primary/40 bg-primary/5 text-primary hover:border-secondary/60 hover:bg-secondary/10 hover:text-secondary',
  ghost:
    'border border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-primary',
}

export function ResumeButton({
  label = 'Resume',
  size = 'md',
  variant = 'primary',
  className = '',
  pulse = false,
  fullWidth = false,
  showStatus = true,
}: ResumeButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleDownload = async () => {
    if (status === 'loading') return

    setStatus('loading')
    setMessage('')

    const result = await downloadResume()
    setStatus(result.ok ? 'success' : 'error')
    setMessage(result.message)

    window.setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 3200)
  }

  const Icon = status === 'loading' ? Loader2 : status === 'success' ? Check : Download

  return (
    <div className={`relative inline-flex flex-col items-center ${fullWidth ? 'w-full' : ''}`}>
      <motion.button
        type="button"
        onClick={handleDownload}
        disabled={status === 'loading'}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.96 }}
        animate={pulse ? { boxShadow: ['0 0 0 rgba(108,99,255,0)', '0 0 36px rgba(108,99,255,0.34)', '0 0 0 rgba(108,99,255,0)'] } : {}}
        transition={pulse ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold transition-all duration-300 disabled:cursor-wait disabled:opacity-80 ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
        aria-label={`${label} - download Siddhant Gupta resume PDF`}
        suppressHydrationWarning
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <FileText className="relative h-4 w-4 opacity-80" aria-hidden="true" />
        <span className="relative">{label}</span>
        <Icon
          className={`relative h-4 w-4 ${status === 'loading' ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
      </motion.button>

      <AnimatePresence>
        {showStatus && message && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            className={`absolute top-full z-50 mt-2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium backdrop-blur-xl ${
              status === 'error'
                ? 'border-red-500/30 bg-red-500/10 text-red-300'
                : 'border-green-500/30 bg-green-500/10 text-green-300'
            }`}
            role="status"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
