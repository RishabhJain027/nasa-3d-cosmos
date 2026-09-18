'use client';

import { Asset } from '@/types/asset';
import { AssetCard } from './asset-card';
import { Skeleton } from '@/components/ui/skeleton';

interface AssetGridProps {
  assets: Asset[];
  isLoading?: boolean;
}

export function AssetGrid({ assets, isLoading }: AssetGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-800 rounded-2xl bg-gray-900/20">
        <div className="text-4xl mb-3">🛸</div>
        <h3 className="text-lg font-semibold text-gray-300">No assets found</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm">
          Try adjusting your search query, filter criteria, or exploring other categories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {assets.map((asset, index) => (
        <AssetCard key={asset.id} asset={asset} index={index} />
      ))}
    </div>
  );
}
