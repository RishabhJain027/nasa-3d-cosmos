import Link from 'next/link';
import { Rocket, Code2, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-[#08080d]">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-400">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="font-display text-base font-bold text-white">
                NASA 3D <span className="text-cyan-400">COSMOS</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Explore the machines that reach beyond Earth. An interactive 3D space exploration platform.
            </p>
          </div>

          {/* Source */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Source</h4>
            <div className="space-y-2">
              <a
                href="https://github.com/nasa/NASA-3D-Resources"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition"
              >
                <Code2 className="h-4 w-4" />
                NASA 3D Resources Repository
              </a>
              <a
                href="https://nasa3d.arc.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition"
              >
                <ExternalLink className="h-4 w-4" />
                NASA 3D Resources Interface
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Explore</h4>
            <div className="space-y-2">
              <Link href="/explore" className="block text-sm text-gray-400 hover:text-cyan-400 transition">
                Browse Assets
              </Link>
              <Link href="/compare" className="block text-sm text-gray-400 hover:text-cyan-400 transition">
                Compare Models
              </Link>
              <Link href="/builder" className="block text-sm text-gray-400 hover:text-cyan-400 transition">
                Mission Builder
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800/50 pt-6">
          <p className="text-xs text-gray-600 leading-relaxed">
            This project uses 3D models from the{' '}
            <a
              href="https://github.com/nasa/NASA-3D-Resources"
              className="text-gray-500 hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              NASA 3D Resources
            </a>{' '}
            collection. This is an independent project and is not affiliated with, endorsed by,
            or sponsored by NASA. Verify the current NASA usage guidance before redistribution.
          </p>
        </div>
      </div>
    </footer>
  );
}
