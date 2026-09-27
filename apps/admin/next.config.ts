import type { NextConfig } from 'next';
import path from 'path';

const isVercel = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  basePath: '/admin',
  // Vercel handles its own build output; standalone is for Docker/PM2 self-hosting
  ...(isVercel ? {} : { output: 'standalone' }),
  // Always set outputFileTracingRoot for monorepo dependency tracing
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@monorepo/ui', '@monorepo/api', '@monorepo/config', '@monorepo/mocks'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
