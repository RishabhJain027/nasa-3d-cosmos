'use client';

import { useState } from 'react';
import manifest from '@/data/asset-manifest.json';
import { Asset } from '@/types/asset';
import { useAppStore } from '@/store/app-store';
import { CompareViewer } from '@/components/compare/compare-viewer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getCategoryName } from '@/lib/asset-categories';
import { Search } from 'lucide-react';

export default function ComparePage() {
  const allAssets = manifest as unknown as Asset[];
  const { compareAssets, removeFromCompare, addToCompare } = useAppStore();
  const [search, setSearch] = useState('');

  const assetA = compareAssets[0] || null;
  const assetB = compareAssets[1] || null;

  const filteredAssets = allAssets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-white">Spacecraft Comparison Lab</h1>
        <p className="text-sm text-gray-400 mt-1">
          Select any two NASA assets to inspect telemetry, structure, and scale side-by-side.
        </p>
      </div>

      <CompareViewer
        assetA={assetA}
        assetB={assetB}
        onRemoveA={() => assetA && removeFromCompare(assetA.id)}
        onRemoveB={() => assetB && removeFromCompare(assetB.id)}
      />

      {/* Asset Picker Section */}
      <div className="space-y-4 pt-6 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white font-display">
            Select Models to Load ({compareAssets.length}/2 active)
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Filter available models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-800 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto pr-1">
          {filteredAssets.slice(0, 36).map((asset) => {
            const isSelected = compareAssets.some((a) => a.id === asset.id);
            return (
              <button
                key={asset.id}
                onClick={() => {
                  if (isSelected) {
                    removeFromCompare(asset.id);
                  } else {
                    addToCompare(asset);
                  }
                }}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-gray-200 line-clamp-2">
                    {asset.name}
                  </div>
                  <Badge variant="secondary" className="mt-2 text-[10px] px-1.5 py-0">
                    {getCategoryName(asset.category)}
                  </Badge>
                </div>
                <div className="text-[10px] text-gray-500 mt-3 font-mono">
                  {isSelected ? '✓ In comparison' : '+ Click to add'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
