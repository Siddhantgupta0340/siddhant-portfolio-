'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

function FloatingGeometry() {
  const meshRef1 = useRef<THREE.Mesh>(null)
  const meshRef2 = useRef<THREE.Mesh>(null)
  const meshRef3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef1.current) {
      meshRef1.current.rotation.x = t * 0.15
      meshRef1.current.rotation.y = t * 0.1
      meshRef1.current.position.y = Math.sin(t * 0.5) * 0.5
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = t * 0.1
      meshRef2.current.rotation.z = t * 0.15
      meshRef2.current.position.y = Math.cos(t * 0.4) * 0.3
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.y = t * 0.12
      meshRef3.current.rotation.z = t * 0.08
      meshRef3.current.position.x = Math.sin(t * 0.3) * 0.4
    }
  })

  const primaryMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6C63FF',
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    []
  )

  const secondaryMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00D4FF',
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      }),
    []
  )

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF6B6B',
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      }),
    []
  )

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef1} position={[-3, 1, -2]} material={primaryMaterial}>
          <octahedronGeometry args={[0.6, 0]} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={meshRef2} position={[3, -1, -3]} material={secondaryMaterial}>
          <icosahedronGeometry args={[0.5, 0]} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh ref={meshRef3} position={[0, 2, -4]} material={accentMaterial}>
          <torusGeometry args={[0.5, 0.15, 8, 20]} />
        </mesh>
      </Float>
    </>
  )
}

function MovingParticles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02
      points.current.rotation.x = state.clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6C63FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export function ParticleBackground() {
  return (
    <div className="three-canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#6C63FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D4FF" />

          <Stars
            radius={80}
            depth={60}
            count={3000}
            factor={3}
            saturation={0}
            fade
            speed={0.8}
          />

          <MovingParticles count={150} />
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    </div>
  )
}
