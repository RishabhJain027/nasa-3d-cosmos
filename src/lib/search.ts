import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Asset } from '@/types/asset';

const fuseOptions: IFuseOptions<Asset> = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'tags', weight: 0.3 },
    { name: 'category', weight: 0.2 },
    { name: 'sourcePath', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<Asset> | null = null;

export function getSearchIndex(assets: Asset[]): Fuse<Asset> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(assets, fuseOptions);
  }
  return fuseInstance;
}

export function searchAssets(
  assets: Asset[],
  query: string,
  filters?: { category?: string; format?: string }
): Asset[] {
  let results: Asset[];

  if (!query.trim()) {
    results = [...assets];
  } else {
    const fuse = getSearchIndex(assets);
    results = fuse.search(query).map((r) => r.item);
  }

  if (filters?.category) {
    results = results.filter((a) => a.category === filters.category);
  }

  if (filters?.format) {
    results = results.filter((a) => a.format.includes(filters.format!));
  }

  return results;
}

export type SortOption = 'name' | 'fileSize' | 'category';

export function sortAssets(assets: Asset[], sort: SortOption, desc = false): Asset[] {
  const sorted = [...assets].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'fileSize':
        return a.fileSize - b.fileSize;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });
  return desc ? sorted.reverse() : sorted;
}
