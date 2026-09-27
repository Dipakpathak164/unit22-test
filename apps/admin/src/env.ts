import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PUBLIC_SITE_URL: z.string().url().optional().default('https://unit22-test-web.vercel.app'),
    BACKEND_URL: z.string().url().optional().default('https://api.example.com'),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('https://unit22-test-web.vercel.app'),
  },
  runtimeEnv: {
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || 'https://unit22-test-web.vercel.app',
    BACKEND_URL: process.env.BACKEND_URL || 'https://api.example.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://unit22-test-web.vercel.app',
  },
  emptyStringAsUndefined: true,
});
