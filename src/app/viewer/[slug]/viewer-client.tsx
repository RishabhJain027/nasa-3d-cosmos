'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { Asset } from '@/types/asset';
import { useAppStore } from '@/store/app-store';
import { InspectorPanel } from '@/components/viewer/inspector-panel';
import { Button } from '@/components/ui/button';
import { getCategoryName } from '@/lib/asset-categories';

const ModelViewer = dynamic(
  () => import('@/components/viewer/model-viewer').then((mod) => mod.ModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-gray-950 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500 mr-3" />
        <span>Initializing WebGL Scene...</span>
      </div>
    ),
  }
);

interface ViewerPageClientProps {
  asset: Asset;
}

export function ViewerPageClient({ asset }: ViewerPageClientProps) {
  const { setSelectedAsset, addToRecentlyViewed } = useAppStore();

  useEffect(() => {
    setSelectedAsset(asset);
    addToRecentlyViewed(asset.id);
  }, [asset, setSelectedAsset, addToRecentlyViewed]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${asset.name} - NASA 3D COSMOS`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Top Breadcrumb Bar */}
      <div className="h-12 border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-md px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/explore" className="hover:text-cyan-400 transition flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Catalog</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
          <span className="text-gray-500">{getCategoryName(asset.category)}</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
          <span className="text-gray-200 font-medium truncate max-w-[200px] sm:max-w-none">
            {asset.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleShare} className="h-8 text-xs gap-1 text-gray-300">
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>

      {/* Main 3D Viewport + Inspector Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 h-[60vh] lg:h-full relative bg-[#050508]">
          <ModelViewer
            modelUrl={asset.modelUrl}
            assetName={asset.name}
            fileSize={asset.fileSize}
          />
        </div>

        {/* Right Inspector Drawer */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0 h-[40vh] lg:h-full overflow-y-auto">
          <InspectorPanel asset={asset} />
        </div>
      </div>
    </div>
  );
}
