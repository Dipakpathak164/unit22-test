import React from 'react';
import { MOCK_BRANDS, MOCK_PRODUCTS } from '@monorepo/mocks';
import { ProductCard } from '@/components/product/ProductCard';
import { BrandFilterLayout } from '@/components/brand/BrandFilterLayout';

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const resolvedParams = await params;
  const brandSlug = resolvedParams.brand;
  const brand = MOCK_BRANDS.find((b) => b.slug === brandSlug) || {
    name: brandSlug.toUpperCase(),
    slug: brandSlug,
    productCount: MOCK_PRODUCTS.length,
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-card border border-border p-6 space-y-2">
        <span className="text-xs uppercase font-bold text-primary">Official Brand Partner</span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">{brand.name}</h1>
        <p className="text-xs text-foreground/70">
          Explore genuine {brand.name} motorcycle parts, brake components, and performance upgrades.
        </p>
      </div>

      <BrandFilterLayout>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </BrandFilterLayout>
    </div>
  );
}

