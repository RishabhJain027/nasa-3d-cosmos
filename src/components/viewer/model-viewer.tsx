'use client';

import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Grid,
  GizmoHelper,
  GizmoViewport,
  Stars,
} from '@react-three/drei';
import { ModelLoader } from './model-loader';
import { ViewerControls } from './viewer-controls';
import { LoadingScreen } from './loading-screen';
import { useAppStore } from '@/store/app-store';
import type { ViewerMode } from '@/types/asset';

interface ModelViewerProps {
  modelUrl: string;
  assetName?: string;
  fileSize?: number;
}

function getBackgroundColor(mode: ViewerMode): string {
  switch (mode) {
    case 'studio':
      return '#1a1a24';
    case 'mission-control':
      return '#0d0d14';
    case 'museum':
      return '#111118';
    case 'blueprint':
      return '#0a1628';
    case 'deep-space':
      return '#050508';
    default:
      return '#1a1a24';
  }
}

export function ModelViewer({ modelUrl, assetName, fileSize }: ModelViewerProps) {
  const { viewerMode, wireframe, showGrid, showAxes, autoRotate } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const bgColor = getBackgroundColor(viewerMode);

  const handleError = useCallback((msg: string) => {
    setError(msg);
  }, []);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900/50 rounded-xl p-8 text-center">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Failed to load model</h3>
        <p className="text-sm text-gray-400 max-w-md">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-300 hover:bg-gray-700 transition"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50, near: 0.01, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: bgColor }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
          <directionalLight position={[-3, 4, -5]} intensity={0.3} />

          {/* Environment */}
          <Environment preset="city" background={false} />

          {/* Stars for deep-space mode */}
          {viewerMode === 'deep-space' && (
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          )}

          {/* Model */}
          <ModelLoader
            url={modelUrl}
            wireframe={wireframe}
            onError={handleError}
          />

          {/* Ground */}
          {showGrid && viewerMode !== 'deep-space' && (
            <Grid
              position={[0, -0.01, 0]}
              args={[20, 20]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#1e293b"
              sectionSize={2}
              sectionThickness={1}
              sectionColor="#334155"
              fadeDistance={15}
              infiniteGrid
            />
          )}

          {/* Contact shadows */}
          {viewerMode === 'studio' && (
            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
            />
          )}

          {/* Axes helper */}
          {showAxes && (
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
            </GizmoHelper>
          )}

          {/* Controls */}
          <OrbitControls
            makeDefault
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            enableDamping
            dampingFactor={0.08}
            minDistance={0.5}
            maxDistance={100}
          />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <Suspense fallback={<LoadingScreen name={assetName} fileSize={fileSize} />}>
        <div />
      </Suspense>

      {/* Viewer controls overlay */}
      <ViewerControls />
    </div>
  );
}
