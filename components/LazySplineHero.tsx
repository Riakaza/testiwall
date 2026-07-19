'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

function SplineLoader() {
  return (
    <div className="w-full h-[500px] bg-black/[0.96] rounded-2xl flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  )
}

const SplineSceneBasic = dynamic(
  () => import('@/components/SplineHero').then((mod) => ({ default: mod.SplineSceneBasic })),
  { ssr: false, loading: () => <SplineLoader /> }
)

export function LazySplineHero() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full min-h-[500px] relative">
      {isVisible ? <SplineSceneBasic /> : <SplineLoader />}
    </div>
  )
}
