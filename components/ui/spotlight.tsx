'use client'
import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

type SpotlightProps = {
  className?: string;
  size?: number;
}

export function Spotlight({ className, size = 600 }: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    const parent = el?.parentElement
    if (!el || !parent) return

    parent.style.position = 'relative'
    parent.style.overflow = 'hidden'

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`
    }

    const handleMouseEnter = () => { el.style.opacity = '1' }
    const handleMouseLeave = () => { el.style.opacity = '0' }

    parent.addEventListener('mousemove', handleMouseMove)
    parent.addEventListener('mouseenter', handleMouseEnter)
    parent.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseenter', handleMouseEnter)
      parent.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [size])

  return (
    <div
      ref={spotlightRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl from-zinc-50 via-zinc-100 to-zinc-200',
        className
      )}
      style={{
        width: size,
        height: size,
        opacity: 0,
        transition: 'opacity 0.3s ease, transform 0.1s ease-out',
      }}
    />
  )
}
