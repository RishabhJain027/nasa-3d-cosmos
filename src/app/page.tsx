import { HeroSection } from '@/components/home/hero-section';
import { FeaturedAssets } from '@/components/home/featured-assets';
import manifest from '@/data/asset-manifest.json';
import { Asset } from '@/types/asset';

export default function HomePage() {
  const assets = manifest as unknown as Asset[];

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedAssets assets={assets} />
    </div>
  );
}
