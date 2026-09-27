import dynamic from 'next/dynamic';

// Dynamically import the (shop) page to avoid generating a duplicate
// page_client-reference-manifest.js that conflicts with the route group.
const StorefrontHomePage = dynamic(() => import('./(shop)/page'), {
  ssr: true,
});

// Dynamically import the (shop) layout
const ShopLayout = dynamic(() => import('./(shop)/layout'), {
  ssr: true,
});

export const revalidate = 0;

export default function Page() {
  return (
    <ShopLayout>
      <StorefrontHomePage />
    </ShopLayout>
  );
}
