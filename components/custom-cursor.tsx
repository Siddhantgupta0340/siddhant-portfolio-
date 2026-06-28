'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    const trail = trailRef.current

    if (!cursor || !ring || !trail) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let ringX = 0
    let ringY = 0
    let lastTrailX = 0
    let lastTrailY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Update ring position immediately
      ringX = mouseX - 15
      ringY = mouseY - 15
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'

      // Trail particles
      const distance = Math.sqrt(
        Math.pow(mouseX - lastTrailX, 2) + Math.pow(mouseY - lastTrailY, 2)
      )

      if (distance > 30) {
        const particle = document.createElement('div')
        particle.className = 'absolute rounded-full bg-secondary pointer-events-none'
        particle.style.left = mouseX + 'px'
        particle.style.top = mouseY + 'px'
        particle.style.width = Math.random() * 6 + 2 + 'px'
        particle.style.height = particle.style.width
        particle.style.opacity = '0.8'
        particle.style.transform = 'translate(-50%, -50%)'

        trail.appendChild(particle)

        setTimeout(() => {
          particle.style.opacity = '0'
          particle.style.transition = 'opacity 0.5s ease-out'
          setTimeout(() => particle.remove(), 500)
        }, 50)

        lastTrailX = mouseX
        lastTrailY = mouseY
      }
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const animate = () => {
      // Smooth cursor following
      cursorX += (mouseX - cursorX) * 0.3
      cursorY += (mouseY - cursorY) * 0.3

      cursor.style.left = cursorX - 4 + 'px'
      cursor.style.top = cursorY - 4 + 'px'

      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-secondary rounded-full pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Trail container */}
      <div ref={trailRef} className="fixed inset-0 pointer-events-none z-40" />
    </>
  )
}
