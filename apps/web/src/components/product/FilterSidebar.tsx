'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@monorepo/ui';
import { MOCK_BRANDS } from '@monorepo/mocks';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  /** 'default' renders the full sticky aside (desktop). 'drawer' renders just the filter content for embedding in MobileFilterDrawer. */
  variant?: 'default' | 'drawer';
}

export function FilterSidebar({ variant = 'default' }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get('brand') || '';
  const currentInStock = searchParams.get('inStock') === 'true';
  const currentFitmentOnly = searchParams.get('fitment') === 'true';
  const currentSort = searchParams.get('sort') || 'popular';

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  /** Count of currently active filters (for mobile drawer badge) */
  const activeFilterCount =
    (currentBrand ? 1 : 0) +
    (currentInStock ? 1 : 0) +
    (currentFitmentOnly ? 1 : 0) +
    (currentSort !== 'popular' ? 1 : 0);

  const filterContent = (
    <>
      {/* Sort Options */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider block text-foreground/80">Sort By</label>
        <select
          value={currentSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full h-9 border border-input bg-background px-3 text-xs focus-visible:ring-2 focus-visible:ring-black"
        >
          <option value="popular">Most Popular</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>

      {/* Fitment Filter */}
      <div className="space-y-2 border-t border-border pt-4">
        <label className="font-bold uppercase tracking-wider block text-foreground/80">Fitment</label>
        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input
            type="checkbox"
            checked={currentFitmentOnly}
            onChange={(e) => updateParam('fitment', e.target.checked ? 'true' : null)}
            className="w-4 h-4 border border-input accent-primary"
          />
          Show Compatible Parts Only
        </label>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2 border-t border-border pt-4">
        <label className="font-bold uppercase tracking-wider block text-foreground/80">Availability</label>
        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : null)}
            className="w-4 h-4 border border-input accent-primary"
          />
          In Stock Only
        </label>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2 border-t border-border pt-4">
        <label className="font-bold uppercase tracking-wider block text-foreground/80">Brand</label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {MOCK_BRANDS.map((b) => (
            <label key={b.id} className="flex items-center justify-between cursor-pointer font-medium hover:text-primary">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="brand"
                  checked={currentBrand === b.slug}
                  onChange={() => updateParam('brand', currentBrand === b.slug ? null : b.slug)}
                  className="w-3.5 h-3.5 accent-primary"
                />
                <span>{b.name}</span>
              </div>
              <span className="text-[10px] text-foreground/50">({b.productCount})</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  // Drawer variant: return just the content + a reset button, no aside wrapper
  if (variant === 'drawer') {
    return (
      <div className="space-y-6 text-xs">
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset All Filters
          </button>
        )}
        {filterContent}
      </div>
    );
  }

  // Default variant: full sticky aside for desktop
  return (
    <aside className="space-y-6 text-xs bg-card border border-border p-5 h-fit sticky top-24">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm">
          <Filter className="w-4 h-4 text-primary" /> Filter Parts
        </div>
        <button
          onClick={clearAll}
          className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>
      {filterContent}
    </aside>
  );
}

/** Returns the count of active filters for use by external components (e.g., MobileFilterTrigger badge). */
export function useFilterActiveCount(): number {
  const searchParams = useSearchParams();
  const currentBrand = searchParams.get('brand') || '';
  const currentInStock = searchParams.get('inStock') === 'true';
  const currentFitmentOnly = searchParams.get('fitment') === 'true';
  const currentSort = searchParams.get('sort') || 'popular';

  return (
    (currentBrand ? 1 : 0) +
    (currentInStock ? 1 : 0) +
    (currentFitmentOnly ? 1 : 0) +
    (currentSort !== 'popular' ? 1 : 0)
  );
}

