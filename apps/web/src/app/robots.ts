import type { MetadataRoute } from 'next';
import { env } from '@/env';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.PUBLIC_SITE_URL;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
