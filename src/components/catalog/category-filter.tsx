'use client';

import { CATEGORIES } from '@/lib/asset-categories';
import { useAppStore } from '@/store/app-store';

interface CategoryFilterProps {
  counts?: Record<string, number>;
  totalCount?: number;
}

export function CategoryFilter({ counts = {}, totalCount = 0 }: CategoryFilterProps) {
  const { selectedCategory, setSelectedCategory } = useAppStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
          selectedCategory === null
            ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
            : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
        }`}
      >
        All Assets {totalCount > 0 && `(${totalCount})`}
      </button>

      {CATEGORIES.map((cat) => {
        const count = counts[cat.id] || 0;
        if (count === 0) return null;
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              isSelected
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
            }`}
          >
            {cat.name} ({count})
          </button>
        );
      })}
    </div>
  );
}
