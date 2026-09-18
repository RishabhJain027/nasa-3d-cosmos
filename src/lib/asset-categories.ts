import { CategoryInfo } from '@/types/asset';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'spacecraft',
    name: 'Spacecraft',
    description: 'Crewed and uncrewed spacecraft, probes, and vehicles',
    icon: 'Rocket',
    keywords: ['spacecraft', 'probe', 'vehicle', 'capsule', 'module', 'orbiter'],
  },
  {
    id: 'satellites',
    name: 'Satellites',
    description: 'Earth-observing and scientific satellites',
    icon: 'Satellite',
    keywords: ['satellite', 'landsat', 'goes', 'terra', 'aqua', 'aura'],
  },
  {
    id: 'rockets',
    name: 'Rockets',
    description: 'Launch vehicles and boosters',
    icon: 'Flame',
    keywords: ['atlas', 'sls', 'saturn', 'ares', 'rocket', 'delta', 'titan'],
  },
  {
    id: 'rovers',
    name: 'Rovers',
    description: 'Planetary surface exploration rovers',
    icon: 'Car',
    keywords: ['rover', 'msl', 'perseverance', 'curiosity'],
  },
  {
    id: 'astronaut-equipment',
    name: 'Astronaut Equipment',
    description: 'Spacesuits, tools, and astronaut gear',
    icon: 'User',
    keywords: ['suit', 'glove', 'astronaut', 'eva', 'emu', 'helmet'],
  },
  {
    id: 'telescopes',
    name: 'Telescopes',
    description: 'Space telescopes and observatories',
    icon: 'Telescope',
    keywords: ['hubble', 'telescope', 'webb', 'jwst', 'spitzer', 'chandra'],
  },
  {
    id: 'instruments',
    name: 'Instruments',
    description: 'Scientific instruments and detectors',
    icon: 'Microscope',
    keywords: ['spectrograph', 'instrument', 'detector', 'sensor'],
  },
  {
    id: 'ground-systems',
    name: 'Ground Systems',
    description: 'Launch pads, crawlers, and ground equipment',
    icon: 'Building',
    keywords: ['crawler', 'base station', 'launch pad', 'mobile launcher'],
  },
  {
    id: 'space-stations',
    name: 'Space Stations',
    description: 'Orbital habitats and stations',
    icon: 'Globe',
    keywords: ['iss', 'station', 'skylab', 'habitat', 'gateway'],
  },
  {
    id: 'planetary-objects',
    name: 'Planetary Objects',
    description: 'Asteroids, moons, comets, and stellar objects',
    icon: 'Sun',
    keywords: ['asteroid', 'moon', 'mars', 'earth', 'planet', 'supernova', 'comet'],
  },
  {
    id: 'cubesats',
    name: 'CubeSats',
    description: 'Miniaturized satellites for space research',
    icon: 'Box',
    keywords: ['cubesat'],
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Other NASA assets and models',
    icon: 'Package',
    keywords: [],
  },
];

export function getCategoryById(id: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryName(id: string): string {
  return getCategoryById(id)?.name ?? id;
}
