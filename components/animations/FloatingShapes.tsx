'use client'

import { motion } from 'framer-motion'

interface Shape {
  id: number
  type: 'circle' | 'triangle' | 'hexagon' | 'square'
  x: string
  y: string
  size: number
  color: string
  animClass: string
  delay: number
}

const shapes: Shape[] = [
  { id: 1, type: 'circle', x: '10%', y: '20%', size: 6, color: 'var(--primary)', animClass: 'shape-float-1', delay: 0 },
  { id: 2, type: 'triangle', x: '85%', y: '15%', size: 8, color: 'var(--secondary)', animClass: 'shape-float-2', delay: 2 },
  { id: 3, type: 'hexagon', x: '75%', y: '70%', size: 10, color: 'var(--accent)', animClass: 'shape-float-3', delay: 4 },
  { id: 4, type: 'square', x: '15%', y: '75%', size: 5, color: 'var(--secondary)', animClass: 'shape-float-2', delay: 1 },
  { id: 5, type: 'circle', x: '50%', y: '10%', size: 4, color: 'var(--accent)', animClass: 'shape-float-1', delay: 3 },
  { id: 6, type: 'triangle', x: '90%', y: '50%', size: 7, color: 'var(--primary)', animClass: 'shape-float-3', delay: 5 },
  { id: 7, type: 'circle', x: '5%', y: '50%', size: 3, color: 'var(--primary)', animClass: 'shape-float-2', delay: 2 },
  { id: 8, type: 'square', x: '60%', y: '85%', size: 5, color: 'var(--secondary)', animClass: 'shape-float-1', delay: 4 },
]

function ShapeElement({ shape }: { shape: Shape }) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: shape.x,
    top: shape.y,
    width: shape.size,
    height: shape.size,
    animationDelay: `${shape.delay}s`,
    opacity: 0.15,
  }

  if (shape.type === 'circle') {
    return (
      <div
        className={shape.animClass}
        style={{
          ...baseStyle,
          borderRadius: '50%',
          backgroundColor: shape.color,
          boxShadow: `0 0 ${shape.size * 2}px ${shape.color}`,
        }}
      />
    )
  }

  if (shape.type === 'triangle') {
    return (
      <div
        className={shape.animClass}
        style={{
          ...baseStyle,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${shape.color}`,
          filter: `drop-shadow(0 0 ${shape.size}px ${shape.color})`,
        }}
      />
    )
  }

  if (shape.type === 'hexagon') {
    return (
      <div
        className={shape.animClass}
        style={{
          ...baseStyle,
          backgroundColor: shape.color,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          boxShadow: `0 0 ${shape.size * 2}px ${shape.color}`,
        }}
      />
    )
  }

  // square
  return (
    <div
      className={shape.animClass}
      style={{
        ...baseStyle,
        backgroundColor: shape.color,
        borderRadius: '2px',
        boxShadow: `0 0 ${shape.size * 2}px ${shape.color}`,
      }}
    />
  )
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape) => (
        <ShapeElement key={shape.id} shape={shape} />
      ))}
    </div>
  )
}
