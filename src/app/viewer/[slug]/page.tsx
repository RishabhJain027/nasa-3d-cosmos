import { notFound } from 'next/navigation';
import manifest from '@/data/asset-manifest.json';
import { Asset } from '@/types/asset';
import { ViewerPageClient } from './viewer-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const assets = manifest as unknown as Asset[];
  return assets.map((asset) => ({
    slug: asset.slug,
  }));
}

export default async function ViewerPage({ params }: PageProps) {
  const { slug } = await params;
  const assets = manifest as unknown as Asset[];
  const asset = assets.find((a) => a.slug === slug);

  if (!asset) {
    notFound();
  }

  return <ViewerPageClient asset={asset} />;
}
