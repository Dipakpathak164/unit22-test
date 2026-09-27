import type { Metadata } from 'next';
import '@monorepo/ui/globals.css';
import { StoreProvider } from '../lib/store/provider';

export const metadata: Metadata = {
  title: 'Unit22 Admin Portal | Sales & Manufacturing',
  description: 'Unit22 Management portal for catalog, inventory, sales, and manufacturing.',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      { url: '/admin/favicon.ico' },
      { url: '/admin/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/admin/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/admin/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/admin/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
