'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true)
      return
    }

    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Ring follows immediately
      ring.style.left = mouseX - 20 + 'px'
      ring.style.top = mouseY - 20 + 'px'
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
      ring.style.opacity = '0'
    }

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[data-cursor="pointer"]')

      setIsHovering(!!isInteractive)
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.25
      cursorY += (mouseY - cursorY) * 0.25

      cursor.style.left = cursorX - 4 + 'px'
      cursor.style.top = cursorY - 4 + 'px'

      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleElementHover)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleElementHover)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-0 transition-all duration-200"
        style={{
          backgroundColor: isHovering ? 'var(--secondary)' : 'var(--primary)',
          boxShadow: isHovering
            ? '0 0 15px var(--glow-secondary)'
            : '0 0 10px var(--glow-primary)',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[9998] opacity-0 transition-all duration-300"
        style={{
          border: isHovering
            ? '2px solid var(--secondary)'
            : '1.5px solid var(--primary)',
          boxShadow: isHovering
            ? '0 0 20px var(--glow-secondary)'
            : '0 0 15px var(--glow-primary)',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}
