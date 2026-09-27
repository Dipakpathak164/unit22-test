import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  basePath: '/admin',
  output: 'standalone',
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
