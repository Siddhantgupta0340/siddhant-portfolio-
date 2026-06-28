'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-background z-[9999] flex items-center justify-center pointer-events-none">
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50" />

      {/* Animated circles */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-secondary animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent border-l-primary animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-secondary glow-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 text-center">
        <p className="text-muted-foreground text-sm">Loading Portfolio</p>
        <div className="flex gap-1 justify-center mt-2">
          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" />
          <div className="w-1 h-1 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  )
}
