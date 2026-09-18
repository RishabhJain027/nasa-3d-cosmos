'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Asset } from '@/types/asset';
import { AssetCard } from '@/components/catalog/asset-card';

interface FeaturedAssetsProps {
  assets: Asset[];
}

export function FeaturedAssets({ assets }: FeaturedAssetsProps) {
  const featured = assets.slice(0, 8);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Featured Highlights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Iconic Spacecraft & Hardware
          </h2>
        </div>
        <Link
          href="/explore"
          className="hidden sm:inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 font-medium group"
        >
          View all models
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featured.map((asset, i) => (
          <AssetCard key={asset.id} asset={asset} index={i} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 font-medium"
        >
          View all 250+ models
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
