import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PUBLIC_SITE_URL: z.string().url().optional().default('https://unit22-test-web.vercel.app'),
    BACKEND_URL: z.string().url().optional().default('https://api.example.com'),
    ADMIN_URL: z.string().url().optional(),
    REVALIDATE_SECRET: z.string().min(1).optional().default('default_revalidate_secret'),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('https://unit22-test-web.vercel.app'),
  },
  runtimeEnv: {
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || 'https://unit22-test-web.vercel.app',
    BACKEND_URL: process.env.BACKEND_URL || 'https://api.example.com',
    ADMIN_URL: process.env.ADMIN_URL,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET || 'default_revalidate_secret',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://unit22-test-web.vercel.app',
  },
  emptyStringAsUndefined: true,
});
