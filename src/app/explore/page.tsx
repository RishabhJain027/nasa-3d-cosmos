'use client';

import { useMemo } from 'react';
import manifest from '@/data/asset-manifest.json';
import { Asset } from '@/types/asset';
import { useAppStore } from '@/store/app-store';
import { searchAssets } from '@/lib/search';
import { AssetGrid } from '@/components/catalog/asset-grid';
import { SearchBar } from '@/components/catalog/search-bar';
import { CategoryFilter } from '@/components/catalog/category-filter';

export default function ExplorePage() {
  const assets = manifest as unknown as Asset[];
  const { searchQuery, selectedCategory } = useAppStore();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of assets) {
      counts[a.category] = (counts[a.category] || 0) + 1;
    }
    return counts;
  }, [assets]);

  const filteredAssets = useMemo(() => {
    return searchAssets(assets, searchQuery, {
      category: selectedCategory || undefined,
    });
  }, [assets, searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">3D Asset Universe</h1>
          <p className="text-sm text-gray-400 mt-1">
            Search, filter, and inspect {assets.length} official NASA 3D assets
          </p>
        </div>
        <SearchBar />
      </div>

      <CategoryFilter counts={categoryCounts} totalCount={assets.length} />

      <div className="pt-2">
        <div className="text-xs text-gray-500 mb-4 font-mono">
          Showing {filteredAssets.length} of {assets.length} items
        </div>
        <AssetGrid assets={filteredAssets} />
      </div>
    </div>
  );
}
