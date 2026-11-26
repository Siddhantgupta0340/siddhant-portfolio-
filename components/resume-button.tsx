'use client'

import { Check, Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { downloadResume } from '@/lib/resume'
import { cn } from '@/lib/utils'

type Props = {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline'
  className?: string
  fullWidth?: boolean
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:shadow-[0_0_32px_var(--glow)]',
  outline: 'border border-white/15 bg-white/[0.03] text-white hover:border-primary/50 hover:text-primary',
}

export function ResumeButton({ label = 'Resume', size = 'md', variant = 'primary', className, fullWidth }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const onClick = async () => {
    if (status === 'loading') return
    setStatus('loading')
    const res = await downloadResume()
    setStatus(res.ok ? 'done' : 'error')
    window.setTimeout(() => setStatus('idle'), 2500)
  }

  const Icon = status === 'loading' ? Loader2 : status === 'done' ? Check : Download

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status === 'loading'}
      aria-label="Download Siddhant Gupta resume (PDF)"
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-300 active:scale-[0.97] disabled:cursor-wait',
        sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{status === 'error' ? 'Try again' : label}</span>
      <Icon className={cn('relative h-4 w-4', status === 'loading' && 'animate-spin')} aria-hidden="true" />
    </button>
  )
}
