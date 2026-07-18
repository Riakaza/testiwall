'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden rounded-2xl border-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Preuve sociale.
            <br />
            <span className="text-3xl md:text-4xl">Sans effort.</span>
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg leading-relaxed">
            Collecte les témoignages de tes clients et affiche-les sur ton site en quelques clics. Gratuit, rapide, sans code.
          </p>
        </div>

        {/* Right content - 3D Scene */}
        <div className="flex-1 relative hidden md:block">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
