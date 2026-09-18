export interface Asset {
  id: string;
  name: string;
  slug: string;
  category: string;
  tags: string[];
  sourceRepo: string;
  sourcePath: string;
  modelUrl: string;
  previewUrl: string | null;
  format: string[];
  fileSize: number;
  metadata: Record<string, unknown>;
}

export interface SearchResult {
  item: Asset;
  score: number;
  refIndex: number;
}

export type ViewerMode = 'studio' | 'mission-control' | 'museum' | 'blueprint' | 'deep-space';

export type CameraPreset = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'isometric';

export interface ViewerState {
  wireframe: boolean;
  grid: boolean;
  axes: boolean;
  autoRotate: boolean;
  selectedMesh: string | null;
  exploded: boolean;
  xray: boolean;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
  count?: number;
}

export interface ComparisonItem {
  asset: Asset;
  slot: 'A' | 'B';
}

export interface SceneObject {
  id: string;
  asset: Asset;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface MissionScene {
  id: string;
  name: string;
  objects: SceneObject[];
  camera: {
    position: [number, number, number];
    target: [number, number, number];
  };
  background: string;
  lighting: string;
  createdAt: string;
  updatedAt: string;
}
