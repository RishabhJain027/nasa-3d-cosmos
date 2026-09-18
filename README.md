# NASA 3D COSMOS

Interactive space digital twin and mission explorer built on the public [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) collection.

## Features

- **250+ NASA 3D Models**: Complete automated ingestion and pre-rendering of all official `.glb` models.
- **Universal 3D Viewer**: Built with Next.js, Three.js, React Three Fiber, and Drei. Supports 5 rendering modes (Studio, Mission Control, Museum, Blueprint, Deep Space), OrbitControls, wireframe, grid, lighting, and camera presets.
- **Interactive Inspector**: Inspect component hierarchy, metadata, file sizes, and direct GitHub source attribution.
- **Comparison Lab**: Side-by-side synchronized 3D comparison with dual viewports and a telemetry/metadata matrix.
- **Mission Builder Sandbox**: Interactive 3D scene builder to place, rotate, translate multiple NASA assets, and export scene JSON.
- **Fast Fuzzy Search & Filtering**: Powered by Fuse.js with real-time category filtering and tagging.
- **Multi-language UI**: Supports English, Hindi, Gujarati, Marathi, Spanish, French, and Japanese.

## Getting Started

```bash
# Navigate to project
cd nasa-3d-cosmos

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Attribution & Source Notice

All 3D assets are sourced from the public [NASA 3D Resources repository](https://github.com/nasa/NASA-3D-Resources). This project is an independent space education platform and is not affiliated with or endorsed by NASA.
