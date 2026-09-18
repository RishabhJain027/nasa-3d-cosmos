import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nasa3d.arc.nasa.gov',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['three'],
};

export default nextConfig;
