import type { NextConfig } from 'next';
import path from 'path';

const isVercel = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: 'standalone' }),
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@monorepo/ui', '@monorepo/api', '@monorepo/config', '@monorepo/mocks'],
  async rewrites() {
    const adminUrl = process.env.ADMIN_URL;
    if (!adminUrl) {
      return [];
    }
    return [
      {
        source: '/admin',
        destination: `${adminUrl}/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `${adminUrl}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
