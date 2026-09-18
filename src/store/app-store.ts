'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Asset, ViewerMode } from '@/types/asset';

interface AppState {
  // Asset selection
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Filtering
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;

  // Viewer
  viewerMode: ViewerMode;
  setViewerMode: (mode: ViewerMode) => void;

  // Layout
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  inspectorOpen: boolean;
  toggleInspector: () => void;

  // Compare
  compareMode: boolean;
  setCompareMode: (mode: boolean) => void;
  compareAssets: Asset[];
  addToCompare: (asset: Asset) => void;
  removeFromCompare: (assetId: string) => void;
  clearCompare: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (assetId: string) => void;

  // Recently viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (assetId: string) => void;

  // Language
  language: string;
  setLanguage: (lang: string) => void;

  // Viewer state
  wireframe: boolean;
  toggleWireframe: () => void;
  showGrid: boolean;
  toggleGrid: () => void;
  showAxes: boolean;
  toggleAxes: () => void;
  autoRotate: boolean;
  toggleAutoRotate: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedAsset: null,
      setSelectedAsset: (asset) => set({ selectedAsset: asset }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      viewerMode: 'studio',
      setViewerMode: (mode) => set({ viewerMode: mode }),

      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      inspectorOpen: true,
      toggleInspector: () => set((s) => ({ inspectorOpen: !s.inspectorOpen })),

      compareMode: false,
      setCompareMode: (mode) => set({ compareMode: mode }),
      compareAssets: [],
      addToCompare: (asset) =>
        set((s) => {
          if (s.compareAssets.length >= 2) return s;
          if (s.compareAssets.find((a) => a.id === asset.id)) return s;
          return { compareAssets: [...s.compareAssets, asset] };
        }),
      removeFromCompare: (assetId) =>
        set((s) => ({
          compareAssets: s.compareAssets.filter((a) => a.id !== assetId),
        })),
      clearCompare: () => set({ compareAssets: [] }),

      favorites: [],
      toggleFavorite: (assetId) =>
        set((s) => ({
          favorites: s.favorites.includes(assetId)
            ? s.favorites.filter((id) => id !== assetId)
            : [...s.favorites, assetId],
        })),

      recentlyViewed: [],
      addToRecentlyViewed: (assetId) =>
        set((s) => ({
          recentlyViewed: [
            assetId,
            ...s.recentlyViewed.filter((id) => id !== assetId),
          ].slice(0, 20),
        })),

      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      wireframe: false,
      toggleWireframe: () => set((s) => ({ wireframe: !s.wireframe })),
      showGrid: true,
      toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
      showAxes: false,
      toggleAxes: () => set((s) => ({ showAxes: !s.showAxes })),
      autoRotate: false,
      toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
    }),
    {
      name: 'nasa-3d-cosmos-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
        language: state.language,
        viewerMode: state.viewerMode,
      }),
    }
  )
);
