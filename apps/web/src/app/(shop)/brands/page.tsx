import React from 'react';
import Link from 'next/link';
import { MOCK_BRANDS } from '@monorepo/mocks';

export default function BrandsIndexPage() {
  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Motorcycle & Accessory Brands</h1>
        <p className="text-xs text-foreground/70 mt-1">
          Browse products by official brand manufacturers (43+ brands available)
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {MOCK_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="bg-card border border-border p-6 text-center hover:border-foreground transition-all duration-200"
          >
            <h3 className="font-bold text-base text-foreground mb-1">{brand.name}</h3>
            <span className="text-xs text-foreground/60 font-mono">{brand.productCount} Items Available</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
