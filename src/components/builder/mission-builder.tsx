'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Asset, SceneObject } from '@/types/asset';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, RotateCw, Move, Layers, Download } from 'lucide-react';
import manifest from '@/data/asset-manifest.json';

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);
const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
);
const Environment = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Environment),
  { ssr: false }
);
const Stars = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Stars),
  { ssr: false }
);
const Grid = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Grid),
  { ssr: false }
);
const ModelLoader = dynamic(
  () => import('@/components/viewer/model-loader').then((mod) => mod.ModelLoader),
  { ssr: false }
);

export function MissionBuilder() {
  const allAssets = manifest as unknown as Asset[];
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const addObject = (asset: Asset) => {
    const newObj: SceneObject = {
      id: `${asset.id}-${Date.now()}`,
      asset,
      position: [
        (Math.random() - 0.5) * 4,
        0,
        (Math.random() - 0.5) * 4,
      ],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
    setSceneObjects((prev) => [...prev, newObj]);
    setSelectedObjectId(newObj.id);
  };

  const removeObject = (id: string) => {
    setSceneObjects((prev) => prev.filter((o) => o.id !== id));
    if (selectedObjectId === id) setSelectedObjectId(null);
  };

  const moveSelected = (dx: number, dy: number, dz: number) => {
    if (!selectedObjectId) return;
    setSceneObjects((prev) =>
      prev.map((obj) => {
        if (obj.id !== selectedObjectId) return obj;
        return {
          ...obj,
          position: [
            obj.position[0] + dx,
            obj.position[1] + dy,
            obj.position[2] + dz,
          ],
        };
      })
    );
  };

  const rotateSelected = (deg: number) => {
    if (!selectedObjectId) return;
    setSceneObjects((prev) =>
      prev.map((obj) => {
        if (obj.id !== selectedObjectId) return obj;
        return {
          ...obj,
          rotation: [
            obj.rotation[0],
            obj.rotation[1] + (deg * Math.PI) / 180,
            obj.rotation[2],
          ],
        };
      })
    );
  };

  const exportScene = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sceneObjects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nasa-mission-scene-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-140px)]">
      {/* 3D Scene Viewport */}
      <div className="lg:col-span-3 rounded-xl border border-gray-800 bg-[#050508] relative overflow-hidden flex flex-col">
        <div className="flex-1 w-full h-full">
          <Canvas
            camera={{ position: [5, 5, 8], fov: 50 }}
            style={{ background: '#050508' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <Environment preset="city" />
            <Stars radius={80} count={2000} speed={0.5} />
            <Grid
              args={[30, 30]}
              cellSize={0.5}
              cellColor="#1e293b"
              sectionSize={2}
              sectionColor="#334155"
              fadeDistance={20}
              infiniteGrid
            />
            <OrbitControls makeDefault enableDamping dampingFactor={0.05} />

            {sceneObjects.map((obj) => (
              <group
                key={obj.id}
                position={obj.position}
                rotation={obj.rotation}
                scale={obj.scale}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedObjectId(obj.id);
                }}
              >
                <ModelLoader url={obj.asset.modelUrl} />
              </group>
            ))}
          </Canvas>
        </div>

        {/* Builder Toolbar */}
        <div className="absolute bottom-4 left-4 z-10 bg-gray-900/80 backdrop-blur-md border border-gray-800 p-2 rounded-xl flex items-center gap-2">
          {selectedObjectId ? (
            <>
              <span className="text-xs text-cyan-400 font-mono pl-2">Selected Controls:</span>
              <Button size="sm" variant="outline" onClick={() => moveSelected(0.5, 0, 0)} className="h-7 text-xs">
                +X
              </Button>
              <Button size="sm" variant="outline" onClick={() => moveSelected(-0.5, 0, 0)} className="h-7 text-xs">
                -X
              </Button>
              <Button size="sm" variant="outline" onClick={() => moveSelected(0, 0.5, 0)} className="h-7 text-xs">
                +Y
              </Button>
              <Button size="sm" variant="outline" onClick={() => moveSelected(0, -0.5, 0)} className="h-7 text-xs">
                -Y
              </Button>
              <Button size="sm" variant="outline" onClick={() => moveSelected(0, 0, 0.5)} className="h-7 text-xs">
                +Z
              </Button>
              <Button size="sm" variant="outline" onClick={() => moveSelected(0, 0, -0.5)} className="h-7 text-xs">
                -Z
              </Button>
              <Button size="sm" variant="outline" onClick={() => rotateSelected(45)} className="h-7 text-xs gap-1">
                <RotateCw className="h-3 w-3" /> 45°
              </Button>
              <Button size="sm" variant="destructive" onClick={() => removeObject(selectedObjectId)} className="h-7 text-xs">
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <span className="text-xs text-gray-500 px-2 font-mono">
              Click any placed object or add hardware from the right panel
            </span>
          )}
        </div>

        {sceneObjects.length > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <Button size="sm" onClick={exportScene} className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs gap-1 font-medium">
              <Download className="h-3.5 w-3.5" /> Export Scene JSON
            </Button>
          </div>
        )}
      </div>

      {/* Right Hardware Palette */}
      <div className="rounded-xl border border-gray-800 bg-gray-950 p-4 flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-white font-display">NASA Asset Palette</h2>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Add spacecraft, stations, rovers, and telescopes into your mission sandbox.
        </p>

        {/* Current Placed List */}
        {sceneObjects.length > 0 && (
          <div className="mb-4">
            <div className="text-[11px] font-mono text-gray-500 uppercase mb-1">
              Active In Scene ({sceneObjects.length})
            </div>
            <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
              {sceneObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObjectId(obj.id)}
                  className={`px-2 py-1 rounded text-xs flex items-center justify-between cursor-pointer border ${
                    selectedObjectId === obj.id
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                      : 'border-gray-800 bg-gray-900 text-gray-300'
                  }`}
                >
                  <span className="truncate">{obj.asset.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeObject(obj.id);
                    }}
                    className="text-gray-500 hover:text-red-400 pl-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Asset Catalog List */}
        <div className="text-[11px] font-mono text-gray-500 uppercase mb-1">Add NASA Hardware</div>
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          {allAssets.slice(0, 40).map((asset) => (
            <div
              key={asset.id}
              className="p-2 rounded-lg border border-gray-800/80 bg-gray-900/40 flex items-center justify-between text-xs hover:border-gray-700"
            >
              <div className="truncate mr-2">
                <div className="font-medium text-gray-200 truncate">{asset.name}</div>
                <div className="text-[10px] text-gray-500">{asset.category}</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => addObject(asset)}
                className="h-6 w-6 p-0 text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
