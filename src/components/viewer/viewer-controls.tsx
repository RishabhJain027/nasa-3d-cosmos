'use client';

import {
  RotateCcw,
  Grid3x3,
  Axis3D,
  RefreshCw,
  Maximize,
  Camera,
  Box,
  Eye,
  Paintbrush,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import type { ViewerMode } from '@/types/asset';

const viewerModes: { id: ViewerMode; label: string }[] = [
  { id: 'studio', label: 'Studio' },
  { id: 'mission-control', label: 'Mission Control' },
  { id: 'museum', label: 'Museum' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'deep-space', label: 'Deep Space' },
];

export function ViewerControls() {
  const {
    viewerMode,
    setViewerMode,
    wireframe,
    toggleWireframe,
    showGrid,
    toggleGrid,
    showAxes,
    toggleAxes,
    autoRotate,
    toggleAutoRotate,
  } = useAppStore();

  return (
    <>
      {/* Top-left: viewer mode selector */}
      <div className="absolute left-3 top-3 z-10">
        <div className="glass rounded-lg p-1 flex gap-0.5">
          {viewerModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewerMode(mode.id)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                viewerMode === mode.id
                  ? 'bg-cyan-600/30 text-cyan-300'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right side: tool controls */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
        <div className="glass rounded-lg p-1 flex flex-col gap-0.5">
          <ToolButton
            icon={<Box className="h-4 w-4" />}
            label="Wireframe"
            active={wireframe}
            onClick={toggleWireframe}
          />
          <ToolButton
            icon={<Grid3x3 className="h-4 w-4" />}
            label="Grid"
            active={showGrid}
            onClick={toggleGrid}
          />
          <ToolButton
            icon={<Axis3D className="h-4 w-4" />}
            label="Axes"
            active={showAxes}
            onClick={toggleAxes}
          />
          <ToolButton
            icon={<RefreshCw className="h-4 w-4" />}
            label="Auto-rotate"
            active={autoRotate}
            onClick={toggleAutoRotate}
          />
        </div>
      </div>

      {/* Bottom: camera presets */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <div className="glass rounded-lg px-2 py-1.5 flex items-center gap-1 text-xs">
          <span className="text-gray-500 mr-1 hidden sm:inline">
            <Camera className="h-3.5 w-3.5 inline mr-1" />
            View:
          </span>
          {['Front', 'Back', 'Left', 'Right', 'Top', 'Bottom', 'Iso'].map((preset) => (
            <button
              key={preset}
              className="px-2 py-1 rounded text-gray-400 hover:text-white hover:bg-gray-800/50 transition"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function ToolButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-xs transition ${
        active
          ? 'bg-cyan-600/20 text-cyan-300'
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
      }`}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
