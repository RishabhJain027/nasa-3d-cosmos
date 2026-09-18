'use client';

import Link from 'next/link';
import { ExternalLink, Heart, GitCompare, Tag, HardDrive, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/app-store';
import { formatFileSize } from '@/lib/utils';
import { getCategoryName } from '@/lib/asset-categories';
import type { Asset } from '@/types/asset';

interface InspectorPanelProps {
  asset: Asset;
}

export function InspectorPanel({ asset }: InspectorPanelProps) {
  const { favorites, toggleFavorite, addToCompare, compareAssets } = useAppStore();
  const isFavorite = favorites.includes(asset.id);
  const isInCompare = compareAssets.some((a) => a.id === asset.id);

  return (
    <div className="h-full overflow-y-auto border-l border-gray-800/50 bg-[#0d0d14]/80 backdrop-blur-sm">
      <div className="p-4 space-y-5">
        {/* Header */}
        <div>
          <h2 className="font-display text-lg font-semibold text-white leading-tight">
            {asset.name}
          </h2>
          <Badge className="mt-2" variant="default">
            {getCategoryName(asset.category)}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant={isFavorite ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleFavorite(asset.id)}
            className="flex-1"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant={isInCompare ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => addToCompare(asset)}
            disabled={isInCompare || compareAssets.length >= 2}
            className="flex-1"
          >
            <GitCompare className="h-4 w-4" />
            Compare
          </Button>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Details</h3>
          <DetailRow icon={<Folder className="h-3.5 w-3.5" />} label="Category" value={getCategoryName(asset.category)} />
          <DetailRow icon={<HardDrive className="h-3.5 w-3.5" />} label="File Size" value={formatFileSize(asset.fileSize)} />
          <DetailRow icon={<Tag className="h-3.5 w-3.5" />} label="Format" value={asset.format.join(', ').toUpperCase()} />
        </div>

        {/* Tags */}
        {asset.tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {asset.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Source</h3>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
            <p className="text-xs text-gray-400 break-all mb-2">{asset.sourcePath}</p>
            <a
              href={`https://github.com/${asset.sourceRepo}/tree/master/${encodeURIComponent(asset.sourcePath.split('/').slice(0, -1).join('/'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
            >
              <ExternalLink className="h-3 w-3" />
              View on GitHub
            </a>
          </div>
          <p className="text-xs text-gray-600">
            Verify the current NASA usage guidance before redistribution.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-400">
        {icon}
        {label}
      </span>
      <span className="text-gray-200 font-mono text-xs">{value}</span>
    </div>
  );
}
