import React from 'react';
import { MOCK_PRODUCTS } from '@monorepo/mocks';
import { ProductCard } from '@/components/product/ProductCard';

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-extrabold uppercase tracking-tight">
          Search Results for: <span className="text-primary">&quot;{query}&quot;</span>
        </h1>
        <p className="text-xs text-foreground/70 mt-1">
          Showing products matching your search term and motorcycle fitment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
