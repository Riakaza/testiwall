'use client'

import { Suspense, lazy, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline').then(mod => ({ default: mod.default })))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`${className} relative`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <Suspense fallback={null}>
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setLoaded(true)}
        />
      </Suspense>
    </div>
  )
}
