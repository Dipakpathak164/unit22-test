import type { Metadata } from 'next';
import { env } from '@/env';
import '@monorepo/ui/globals.css';
import { StoreProvider } from '../lib/store/provider';

export const metadata: Metadata = {
  metadataBase: new URL(env.PUBLIC_SITE_URL),
  title: 'Unit22 | Bike Accessories (Sales & Manufacturing)',
  description: 'Unit22 - Premium motorcycle & bike accessories direct from sales & manufacturing.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col overflow-x-hidden">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
