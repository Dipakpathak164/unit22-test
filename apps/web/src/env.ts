import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PUBLIC_SITE_URL: z.string().url(),
    BACKEND_URL: z.string().url(),
    ADMIN_URL: z.string().url().optional(),
    REVALIDATE_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },
  runtimeEnv: {
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    ADMIN_URL: process.env.ADMIN_URL,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  emptyStringAsUndefined: true,
});
