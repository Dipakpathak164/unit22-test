'use client';

import React, { useState } from 'react';
import { FilterSidebar, useFilterActiveCount } from '@/components/product/FilterSidebar';
import { MobileFilterDrawer, MobileFilterTrigger, MobileStickyFilterBar } from '@/components/common/MobileFilterDrawer';

/**
 * Client-side wrapper for the brand page's filter layout.
 * On desktop (lg+): renders FilterSidebar as a normal sidebar column.
 * On mobile (< lg): hides the sidebar, shows a compact trigger button
 * (with smart sticky scroll behavior) that opens FilterSidebar's content
 * in the shared MobileFilterDrawer.
 */
export function BrandFilterLayout({ children }: { children: React.ReactNode }) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const activeFilterCount = useFilterActiveCount();

  return (
    <>
      {/* Mobile: Smart Sticky Filter Trigger + Drawer (< lg only) */}
      <MobileStickyFilterBar>
        <MobileFilterTrigger
          onClick={() => setIsFilterDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />
      </MobileStickyFilterBar>

      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter Parts"
        activeFilterCount={activeFilterCount}
      >
        <FilterSidebar variant="drawer" />
      </MobileFilterDrawer>

      {/* Desktop + Mobile product grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Desktop sidebar (hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Product grid */}
        <div className="lg:col-span-4 space-y-6">
          {children}
        </div>
      </div>
    </>
  );
}

