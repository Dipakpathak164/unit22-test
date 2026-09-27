'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { components } from '@monorepo/api';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Flame,
  ArrowRight,
  LayoutGrid,
  Zap,
  ShieldCheck,
  Compass,
  Wrench,
} from 'lucide-react';

type Product = components['schemas']['Product'];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Categories', icon: LayoutGrid },
  { id: 'performance', label: 'Performance & Exhaust', icon: Zap },
  { id: 'brakes', label: 'Brake Systems', icon: ShieldCheck },
  { id: 'touring', label: 'Touring & Luggage', icon: Compass },
  { id: 'garage', label: 'Garage & Care', icon: Wrench },
];

interface FeaturedPerformanceSectionProps {
  products: Product[];
}

export function FeaturedPerformanceSection({ products }: FeaturedPerformanceSectionProps) {
  const [activeTab, setActiveTab] = useState('all');
  const filterRowRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    setActiveTab(tabId);

    // 1. Center clicked filter chip horizontally inside the horizontal scroll track
    const button = e.currentTarget;
    const container = button.parentElement;
    if (container) {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const currentScrollLeft = container.scrollLeft;
      const buttonRelativeLeft = buttonRect.left - containerRect.left + currentScrollLeft;
      const targetScrollLeft = buttonRelativeLeft - container.clientWidth / 2 + button.offsetWidth / 2;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }

    // 2. Adjust vertical window scroll ONLY if product grid top is covered by sticky header/filter row or scrolled out of view
    if (gridContainerRef.current) {
      const gridRect = gridContainerRef.current.getBoundingClientRect();
      const stickyBarRect = filterRowRef.current?.getBoundingClientRect();

      // Compute actual bottom boundary of sticky filter row in viewport
      const stickyBottom = stickyBarRect
        ? stickyBarRect.bottom
        : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 180 : 110);

      // Check if top of product grid is hidden above sticky bar OR scrolled past viewport bottom
      const isGridTopHiddenAbove = gridRect.top < stickyBottom;
      const isGridScrolledFarBelow = gridRect.top > window.innerHeight - 100;

      if (isGridTopHiddenAbove || isGridScrolledFarBelow) {
        const targetWindowY = window.scrollY + gridRect.top - stickyBottom - 16;
        window.scrollTo({
          top: Math.max(0, targetWindowY),
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Filter products based on selected tab (memoized to prevent re-computation delay)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'performance')
        return (
          product.category.slug === 'exhaust' ||
          product.category.name.toLowerCase().includes('performance')
        );
      if (activeTab === 'brakes') return product.category.slug === 'brakes';
      if (activeTab === 'touring') return product.category.slug === 'luggage';
      if (activeTab === 'garage')
        return (
          product.category.slug === 'garage' ||
          product.category.slug === 'lighting'
        );
      return true;
    });
  }, [products, activeTab]);

  return (
    <section className="space-y-6 pt-2">
      {/* Header Row */}
      <div className="flex items-end justify-between border-b border-[#eaeaea] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-primary tracking-widest uppercase">
            <Flame className="w-4 h-4 text-primary" />
            <span>UPGRADE YOUR RIDE WITH UNIT 22</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground font-sans">
            Featured Performance Parts & Accessories
          </h2>
          <p className="text-xs sm:text-sm text-foreground/70">
            Precision-manufactured exhausts, sintered brake systems, and expedition-grade touring gear.
          </p>
        </div>

        <Link
          href="/c/brakes"
          className="text-xs font-extrabold text-primary-hover hover:underline hidden sm:flex items-center gap-1 shrink-0"
        >
          <span>View Category</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Dedicated Next Row for Category Filter Buttons */}
      <div
        ref={filterRowRef}
        className="sticky top-[57px] lg:top-[130px] z-30 bg-[#f7f6f2] -mx-4 py-2 pl-4 pr-0 sm:mx-0 sm:p-2 shadow-xs"
      >
        <div
          className="flex flex-nowrap overflow-x-auto scrollbar-none sm:flex-wrap items-center gap-2 sm:gap-3 py-0.5 touch-manipulation"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => handleTabClick(e, tab.id)}
                className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold transition-colors duration-150 uppercase tracking-wider cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#000000] text-white border-2 border-[#000000] shadow-md'
                    : 'bg-[#fefefe] text-foreground/80 border-2 border-[#e2e1dc] hover:border-black/40 hover:bg-white hover:text-black'
                }`}
              >
                <IconComponent
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-primary' : 'text-foreground/50'
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div ref={gridContainerRef}>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-[#fefefe] border border-[#eaeaea]">
            <p className="text-xs font-bold text-foreground/70 uppercase">
              No products found for this category tab.
            </p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-2 text-xs font-extrabold text-primary underline"
            >
              View All Categories
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
