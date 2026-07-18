'use client'

import dynamic from 'next/dynamic'

const SplineSceneBasic = dynamic(
  () => import('@/components/SplineHero').then((mod) => ({ default: mod.SplineSceneBasic })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-black/[0.96] rounded-2xl flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    ),
  }
)

export function LazySplineHero() {
  return <SplineSceneBasic />
}
