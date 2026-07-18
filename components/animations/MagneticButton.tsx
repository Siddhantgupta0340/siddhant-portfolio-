'use client'

import { useRef, useCallback, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  magneticStrength?: number
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  magneticStrength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * magneticStrength
      const deltaY = (e.clientY - centerY) * magneticStrength
      x.set(deltaX)
      y.set(deltaY)
    },
    [magneticStrength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Ripple effect
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const ripple = document.createElement('span')
      const diameter = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = `${diameter}px`
      ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`
      ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`
      ripple.className = 'ripple'
      el.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)

      onClick?.()
    },
    [onClick]
  )

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:shadow-primary/30',
    outline:
      'border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-secondary/50',
    ghost: 'text-primary hover:bg-primary/5',
  }

  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }

  const btnClasses = `relative overflow-hidden rounded-xl font-semibold transition-all duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={btnClasses} onClick={handleClick}>
          {children}
        </a>
      ) : (
        <button
          className={btnClasses}
          onClick={handleClick}
          suppressHydrationWarning
        >
          {children}
        </button>
      )}
    </motion.div>
  )

  return content
}
