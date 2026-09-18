'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Sparkles, GitCompare, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-12 pb-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Interactive NASA 3D Digital Twin & Mission Explorer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-white leading-[1.1]">
          Explore the machines that{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            reach beyond Earth.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Step into a living 3D digital museum of NASA hardware, orbiters, telescopes, and rovers.
          Inspect real mission telemetry, compare spacecraft side-by-side, and design your own cosmic missions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link href="/explore">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-lg shadow-cyan-500/25 gap-2">
              <Compass className="h-5 w-5" />
              Explore All 250+ Assets
            </Button>
          </Link>
          <Link href="/compare">
            <Button size="lg" variant="outline" className="border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-200 gap-2">
              <GitCompare className="h-5 w-5" />
              Compare Lab
            </Button>
          </Link>
          <Link href="/builder">
            <Button size="lg" variant="outline" className="border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-200 gap-2">
              <Box className="h-5 w-5" />
              Mission Builder
            </Button>
          </Link>
        </div>

        {/* Live Catalog Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto border-t border-gray-800/60 mt-12">
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white font-display">250+</div>
            <div className="text-xs text-gray-500 mt-1">Official NASA Models</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-display">11</div>
            <div className="text-xs text-gray-500 mt-1">Mission Categories</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white font-display">5</div>
            <div className="text-xs text-gray-500 mt-1">Viewer Render Modes</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-display">100%</div>
            <div className="text-xs text-gray-500 mt-1">Interactive WebGL</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
