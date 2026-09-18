'use client';

import { motion } from 'framer-motion';
import { Loader2, Rocket } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

interface LoadingScreenProps {
  name?: string;
  fileSize?: number;
}

export function LoadingScreen({ name, fileSize }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0a0f]/90 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <Rocket className="h-7 w-7 text-cyan-400 animate-float" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-300 font-medium">
            {name ? `Loading ${name}` : 'Loading model'}
          </p>
          {fileSize && fileSize > 0 && (
            <p className="text-xs text-gray-500 mt-1">{formatFileSize(fileSize)}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
