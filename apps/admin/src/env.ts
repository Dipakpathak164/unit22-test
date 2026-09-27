import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PUBLIC_SITE_URL: z.string().url(),
    BACKEND_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },
  runtimeEnv: {
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  emptyStringAsUndefined: true,
});
