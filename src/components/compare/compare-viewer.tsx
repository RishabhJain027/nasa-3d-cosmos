'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Asset } from '@/types/asset';
import { getCategoryName } from '@/lib/asset-categories';
import { formatFileSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X, ArrowLeftRight } from 'lucide-react';

const ModelViewer = dynamic(
  () => import('@/components/viewer/model-viewer').then((mod) => mod.ModelViewer),
  { ssr: false }
);

interface CompareViewerProps {
  assetA: Asset | null;
  assetB: Asset | null;
  onRemoveA: () => void;
  onRemoveB: () => void;
}

export function CompareViewer({ assetA, assetB, onRemoveA, onRemoveB }: CompareViewerProps) {
  return (
    <div className="space-y-6">
      {/* Side-by-side 3D Viewports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[55vh] min-h-[400px]">
        {/* Slot A */}
        <div className="relative rounded-xl border border-gray-800 bg-gray-950 overflow-hidden flex flex-col">
          {assetA ? (
            <>
              <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-800 flex items-center justify-between w-[calc(100%-24px)]">
                <div>
                  <div className="text-xs text-cyan-400 font-mono">OBJECT A</div>
                  <div className="text-sm font-semibold text-white truncate max-w-[200px]">
                    {assetA.name}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onRemoveA} className="h-7 w-7 text-gray-400 hover:text-red-400">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 w-full h-full">
                <ModelViewer modelUrl={assetA.modelUrl} assetName={assetA.name} fileSize={assetA.fileSize} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
              <ArrowLeftRight className="h-8 w-8 mb-2 opacity-40 text-cyan-400" />
              <p className="text-sm">Select First Model from below to compare</p>
            </div>
          )}
        </div>

        {/* Slot B */}
        <div className="relative rounded-xl border border-gray-800 bg-gray-950 overflow-hidden flex flex-col">
          {assetB ? (
            <>
              <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-800 flex items-center justify-between w-[calc(100%-24px)]">
                <div>
                  <div className="text-xs text-amber-400 font-mono">OBJECT B</div>
                  <div className="text-sm font-semibold text-white truncate max-w-[200px]">
                    {assetB.name}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onRemoveB} className="h-7 w-7 text-gray-400 hover:text-red-400">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 w-full h-full">
                <ModelViewer modelUrl={assetB.modelUrl} assetName={assetB.name} fileSize={assetB.fileSize} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
              <ArrowLeftRight className="h-8 w-8 mb-2 opacity-40 text-amber-400" />
              <p className="text-sm">Select Second Model from below to compare</p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Metrics Matrix */}
      {(assetA || assetB) && (
        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 overflow-x-auto">
          <h3 className="text-sm font-semibold text-gray-200 mb-4 font-display">
            Telemetry & Metadata Matrix
          </h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase">
                <th className="pb-3 w-1/3">Metric / Property</th>
                <th className="pb-3 w-1/3 text-cyan-400">Model A</th>
                <th className="pb-3 w-1/3 text-amber-400">Model B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-mono text-xs">
              <tr>
                <td className="py-2.5 text-gray-400">Asset Name</td>
                <td className="py-2.5 text-white">{assetA?.name ?? '—'}</td>
                <td className="py-2.5 text-white">{assetB?.name ?? '—'}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-400">Mission Category</td>
                <td className="py-2.5 text-gray-300">{assetA ? getCategoryName(assetA.category) : '—'}</td>
                <td className="py-2.5 text-gray-300">{assetB ? getCategoryName(assetB.category) : '—'}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-400">Package Size</td>
                <td className="py-2.5 text-gray-300">{assetA ? formatFileSize(assetA.fileSize) : '—'}</td>
                <td className="py-2.5 text-gray-300">{assetB ? formatFileSize(assetB.fileSize) : '—'}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-400">Format Standard</td>
                <td className="py-2.5 text-gray-300">{assetA?.format.join(', ').toUpperCase() ?? '—'}</td>
                <td className="py-2.5 text-gray-300">{assetB?.format.join(', ').toUpperCase() ?? '—'}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-400">Repository Origin</td>
                <td className="py-2.5 text-gray-300">{assetA?.sourceRepo ?? '—'}</td>
                <td className="py-2.5 text-gray-300">{assetB?.sourceRepo ?? '—'}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[11px] text-gray-500 mt-4">
            * Geometric properties derived directly from public NASA 3D assets.
          </p>
        </div>
      )}
    </div>
  );
}
