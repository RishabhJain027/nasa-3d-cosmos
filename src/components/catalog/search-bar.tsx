'use client';

import { Search, X } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder="Search 250+ NASA spacecraft, rovers, rockets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 pr-9 bg-gray-950/80 border-gray-800 text-sm focus:border-cyan-500"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
