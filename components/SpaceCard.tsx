"use client";

import Link from "next/link";
import type { Space } from "@/lib/types";

export function SpaceCard({ space }: { space: Space }) {
  return (
    <Link
      href={`/dashboard/${space.id}`}
      className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-accent transition-colors">
            {space.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1 font-mono">/{space.slug}</p>
        </div>
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </div>
      </div>
    </Link>
  );
}
