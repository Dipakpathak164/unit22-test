import type { Metadata } from 'next';
import { StyleguideComponent } from '@monorepo/ui';

export const metadata: Metadata = {
  title: 'Storefront Styleguide & Palette Compliance',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StorefrontStyleguidePage() {
  return <StyleguideComponent />;
}
