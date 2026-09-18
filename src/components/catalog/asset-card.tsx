'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/app-store';
import { formatFileSize } from '@/lib/utils';
import { getCategoryName } from '@/lib/asset-categories';
import type { Asset } from '@/types/asset';

interface AssetCardProps {
  asset: Asset;
  index?: number;
}

export function AssetCard({ asset, index = 0 }: AssetCardProps) {
  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.includes(asset.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
    >
      <Link href={`/viewer/${asset.slug}`} className="group block">
        <div className="relative rounded-xl border border-gray-800/60 bg-gray-900/40 overflow-hidden transition-all duration-300 hover:border-cyan-800/40 hover:bg-gray-900/60 hover:shadow-lg hover:shadow-cyan-500/5">
          {/* Preview Image */}
          <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
            {asset.previewUrl ? (
              <Image
                src={asset.previewUrl}
                alt={asset.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-700">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="text-xs text-gray-600">No preview</p>
                </div>
              </div>
            )}

            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(asset.id);
              }}
              className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-gray-400 transition hover:text-red-400"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-400 text-red-400' : ''}`} />
            </button>

            {/* File size badge */}
            {asset.fileSize > 0 && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2 py-1 text-xs text-gray-300">
                <HardDrive className="h-3 w-3" />
                {formatFileSize(asset.fileSize)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3.5">
            <h3 className="text-sm font-semibold text-gray-200 truncate group-hover:text-cyan-300 transition">
              {asset.name}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {getCategoryName(asset.category)}
              </Badge>
            </div>
            {asset.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {asset.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
