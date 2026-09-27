'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { MobileFilterDrawer, MobileFilterTrigger, MobileStickyFilterBar } from '@/components/common/MobileFilterDrawer';
import { Product, Brand, CategoryConfig } from '@monorepo/mocks';
import {
  ShieldCheck,
  Tag,
  LayoutGrid,
  RotateCcw,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface CategoryProductGridProps {
  category: CategoryConfig;
  products: Product[];
  brands: Brand[];
}

export function CategoryProductGrid({ category, products, brands }: CategoryProductGridProps) {
  const [activeBrandSlug, setActiveBrandSlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const filterRowRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll bounds to dynamically enable/disable desktop navigation arrows
  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [checkScrollState, brands]);

  // Desktop Arrow Scroll Handlers (scrolls horizontal track only)
  const handleScrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  }, []);

  const handleScrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  }, []);

  // Smoothly adjust vertical window scroll IF the top of the product grid is covered by the sticky bar when filtering
  const adjustVerticalScrollIfNeeded = useCallback(() => {
    if (gridContainerRef.current) {
      const gridRect = gridContainerRef.current.getBoundingClientRect();
      const stickyBarRect = filterRowRef.current?.getBoundingClientRect();

      const stickyBottom = stickyBarRect
        ? stickyBarRect.bottom
        : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 180 : 110);

      const isGridTopCovered = gridRect.top < stickyBottom;
      const isGridScrolledFarBelow = gridRect.top > window.innerHeight - 100;

      if (isGridTopCovered || isGridScrolledFarBelow) {
        const targetWindowY = window.scrollY + gridRect.top - stickyBottom - 16;
        window.scrollTo({
          top: Math.max(0, targetWindowY),
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const handleBrandSelect = useCallback(
    (brandSlug: string) => {
      setActiveBrandSlug(brandSlug);
      adjustVerticalScrollIfNeeded();
    },
    [adjustVerticalScrollIfNeeded]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    adjustVerticalScrollIfNeeded();
  };

  const resetAllFilters = useCallback(() => {
    setActiveBrandSlug('all');
    setSearchQuery('');
    adjustVerticalScrollIfNeeded();
  }, [adjustVerticalScrollIfNeeded]);

  // Count active filters for the mobile trigger badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeBrandSlug !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [activeBrandSlug, searchQuery]);

  // Combined fast memoized filtering (brand filter + live search query)
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      // 1. Brand Filter
      if (activeBrandSlug !== 'all' && product.brand?.slug !== activeBrandSlug) {
        return false;
      }
      // 2. Search Query Filter
      if (query !== '') {
        const nameMatch = product.name.toLowerCase().includes(query);
        const brandMatch = product.brand?.name.toLowerCase().includes(query);
        const specValuesMatch = product.specs
          ? Object.values(product.specs).some((val) => String(val).toLowerCase().includes(query))
          : false;
        return nameMatch || brandMatch || specValuesMatch;
      }
      return true;
    });
  }, [products, activeBrandSlug, searchQuery]);

  return (
    <div className="space-y-3.5">
      {/* ─── MOBILE: Smart Sticky Filter Trigger (< lg only) ─── */}
      <MobileStickyFilterBar>
        <MobileFilterTrigger
          onClick={() => setIsFilterDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />
        {activeFilterCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </MobileStickyFilterBar>

      {/* ─── MOBILE: Filter Drawer (< lg only) ─── */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter by Brand"
        activeFilterCount={activeFilterCount}
      >
        {/* Search bar inside drawer */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-foreground/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Search parts in ${category.title}...`}
            className="w-full h-10 pl-9 pr-8 text-xs font-semibold bg-white border border-[#d8d8da] focus:border-black focus:outline-none transition-colors placeholder:text-foreground/50 text-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-black p-0.5"
              aria-label="Clear Search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Vertical brand list */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => handleBrandSelect('all')}
            className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-extrabold transition-colors duration-150 uppercase tracking-wider ${
              activeBrandSlug === 'all'
                ? 'bg-[#000000] text-white'
                : 'bg-[#fafafa] text-foreground/80 border border-[#e2e1dc] hover:border-black/40 hover:bg-white hover:text-black'
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutGrid className="w-3.5 h-3.5 text-primary" />
              All Brands
            </span>
            <span className={`text-[10px] font-mono ${activeBrandSlug === 'all' ? 'text-white/70' : 'text-foreground/50'}`}>
              {products.length}
            </span>
          </button>

          {brands.map((brand) => {
            const isActive = activeBrandSlug === brand.slug;
            const countForBrand = products.filter((p) => p.brand?.slug === brand.slug).length;

            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => handleBrandSelect(brand.slug)}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-extrabold transition-colors duration-150 uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#000000] text-white'
                    : 'bg-[#fafafa] text-foreground/80 border border-[#e2e1dc] hover:border-black/40 hover:bg-white hover:text-black'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-foreground/50'}`} />
                  {brand.name}
                </span>
                {countForBrand > 0 && (
                  <span className={`text-[10px] font-mono ${isActive ? 'text-white/70' : 'text-foreground/50'}`}>
                    {countForBrand}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </MobileFilterDrawer>

      {/* ─── DESKTOP: Sticky Search & Brand Filter Toolbar (lg+ only) ─── */}
      <div
        ref={filterRowRef}
        className="hidden lg:block sticky top-[120px] z-30 bg-[#f7f6f2] sm:p-3.5 border border-[#edebe4] shadow-xs space-y-2.5"
      >
        {/* Top Control Bar: Search Input & Filter Stats */}
        <div className="flex flex-row items-center justify-between gap-3">
          {/* Live Product Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-foreground/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={`Search parts in ${category.title}...`}
              className="w-full h-9 pl-9 pr-8 text-xs font-semibold bg-white border border-[#d8d8da] focus:border-black focus:outline-none transition-colors placeholder:text-foreground/50 text-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  adjustVerticalScrollIfNeeded();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-black p-0.5"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Status Indicator & Reset Button */}
          <div className="flex items-center justify-end gap-3 text-xs">
            <div className="flex items-center gap-2 font-black uppercase tracking-wider text-foreground/80">
              <Tag className="w-4 h-4 text-primary" />
              <span>{brands.length} Official Brands</span>
            </div>
            {(activeBrandSlug !== 'all' || searchQuery.trim() !== '') && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Brand Filter Tags Row with Desktop Navigation Arrows */}
        <div className="flex items-center gap-2 relative">
          {/* Desktop Left Navigation Arrow */}
          <button
            type="button"
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className="flex items-center justify-center shrink-0 w-8 h-8 rounded-none border border-[#d8d8da] bg-white text-black hover:border-black hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-90"
            aria-label="Previous Brand Chips"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Single-Row Scrollbar-Free Track */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollState}
            className="flex flex-nowrap items-center gap-2.5 overflow-x-auto scrollbar-none py-1 touch-manipulation flex-1 pr-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              type="button"
              onClick={() => handleBrandSelect('all')}
              className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-4 py-2 text-xs font-extrabold transition-colors duration-150 uppercase tracking-wider cursor-pointer active:scale-95 ${
                activeBrandSlug === 'all'
                  ? 'bg-[#000000] text-white border-2 border-[#000000] shadow-md'
                  : 'bg-[#fefefe] text-foreground/80 border-2 border-[#e2e1dc] hover:border-black/40 hover:bg-white hover:text-black'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-primary" />
              <span>All Brands ({products.length})</span>
            </button>

            {brands.map((brand) => {
              const isActive = activeBrandSlug === brand.slug;
              const countForBrand = products.filter((p) => p.brand?.slug === brand.slug).length;

              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => handleBrandSelect(brand.slug)}
                  className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-4 py-2 text-xs font-extrabold transition-colors duration-150 uppercase tracking-wider cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#000000] text-white border-2 border-[#000000] shadow-md'
                      : 'bg-[#fefefe] text-foreground/80 border-2 border-[#e2e1dc] hover:border-black/40 hover:bg-white hover:text-black'
                  }`}
                >
                  <ShieldCheck className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-foreground/50'}`} />
                  <span>
                    {brand.name} {countForBrand > 0 ? `(${countForBrand})` : ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Right Navigation Arrow */}
          <button
            type="button"
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className="flex items-center justify-center shrink-0 w-8 h-8 rounded-none border border-[#d8d8da] bg-white text-black hover:border-black hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-90"
            aria-label="Next Brand Chips"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Full-Width Product Grid Container */}
      <main className="space-y-4">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between bg-[#fefefe] border border-[#eaeaea] px-4 py-3 text-xs font-extrabold uppercase">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>
              Showing {filteredProducts.length} of {products.length} Products in {category.title}
            </span>
            {activeBrandSlug !== 'all' && (
              <span className="bg-black text-white text-[10px] px-2 py-0.5 ml-1 font-mono">
                BRAND: {brands.find((b) => b.slug === activeBrandSlug)?.name || activeBrandSlug}
              </span>
            )}
            {searchQuery.trim() !== '' && (
              <span className="bg-primary text-white text-[10px] px-2 py-0.5 font-mono">
                QUERY: &quot;{searchQuery.trim()}&quot;
              </span>
            )}
          </div>

          <span className="text-foreground/50 font-mono text-[11px] hidden sm:inline shrink-0">
            100% Guaranteed Bike Fitment
          </span>
        </div>

        {/* Product Cards Grid (Reverted back to standard site layout 4-column) */}
        <div ref={gridContainerRef}>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="scroll-mt-[130px] lg:scroll-mt-[180px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#fefefe] border border-[#eaeaea] space-y-3">
              <p className="text-sm font-black uppercase text-foreground">
                No products found matching your search or brand filter.
              </p>
              <p className="text-xs text-foreground/60 max-w-sm mx-auto">
                Try clearing your query or selecting &quot;All Brands&quot; to view available items in {category.title}.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-extrabold uppercase hover:bg-black transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Search & Filters</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
