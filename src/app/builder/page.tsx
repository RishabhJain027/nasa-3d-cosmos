import { MissionBuilder } from '@/components/builder/mission-builder';

export default function BuilderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Mission Scene Sandbox</h1>
        <p className="text-xs text-gray-400">
          Compose multi-spacecraft missions, station dockings, and planetary landing scenes using live NASA hardware assets.
        </p>
      </div>

      <MissionBuilder />
    </div>
  );
}
