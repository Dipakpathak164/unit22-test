'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { components } from '@monorepo/api';

type Brand = components['schemas']['Brand'];

interface BrandSliderProps {
  brands: Brand[];
  activeCategoryLabel?: string;
}

export function BrandSlider({ brands, activeCategoryLabel }: BrandSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Only display real downloaded brand logos in top brand slider (filter out older placeholder product images)
  const realBrands = useMemo(() => {
    return brands.filter(
      (b) =>
        b.logoUrl &&
        !b.logoUrl.includes('product_') &&
        !b.logoUrl.includes('logo.png') &&
        !b.logoUrl.includes('favicon')
    );
  }, [brands]);

  // Repeat brands to allow continuous seamless looping
  const duplicatedBrands = useMemo(() => {
    if (realBrands.length === 0) return [];
    if (realBrands.length < 5) {
      return [...realBrands, ...realBrands, ...realBrands, ...realBrands, ...realBrands];
    }
    return [...realBrands, ...realBrands, ...realBrands];
  }, [realBrands]);

  // Smooth scroll handler for arrows and auto-slide
  const scrollByAmount = useCallback((amount: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Loop check for infinite scroll feel
    if (amount > 0 && currentScroll >= maxScroll - 20) {
      container.scrollTo({ left: 0, behavior: 'instant' });
      container.scrollBy({ left: amount, behavior: 'smooth' });
    } else if (amount < 0 && currentScroll <= 20) {
      container.scrollTo({ left: maxScroll / 2, behavior: 'instant' });
      container.scrollBy({ left: amount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }, []);

  const handlePrev = () => {
    setIsPaused(true);
    scrollByAmount(-300);
  };

  const handleNext = () => {
    setIsPaused(true);
    scrollByAmount(300);
  };

  // Auto-slide effect every 2.2 seconds when not paused
  useEffect(() => {
    if (isPaused || realBrands.length === 0) return;

    const interval = setInterval(() => {
      scrollByAmount(280);
    }, 2200);

    return () => clearInterval(interval);
  }, [isPaused, scrollByAmount, realBrands.length]);

  return (
    <div className="relative group/slider select-none">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#e5e5e5] pb-3 mb-4 gap-2 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-xs min-[400px]:text-sm sm:text-xl font-black uppercase text-foreground tracking-tight flex items-center gap-1.5 sm:gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <span className="whitespace-nowrap">TOP PERFORMANCE BRANDS</span>
            {activeCategoryLabel && activeCategoryLabel !== 'All Brands' && (
              <span className="text-[10px] sm:text-xs font-mono font-bold bg-primary text-black px-1.5 sm:px-2 py-0.5 ml-1 sm:ml-2 uppercase shrink-0">
                {activeCategoryLabel}
              </span>
            )}
          </h2>
          <p className="text-[11px] sm:text-xs text-foreground/60 mt-0.5 leading-tight">
            Authorized global OEM & aftermarket performance partners ({realBrands.length} brand{realBrands.length !== 1 ? 's' : ''} shown)
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-0 border-[#e5e5e5]/60">
          <Link
            href="/brands"
            className="text-[11px] sm:text-xs font-extrabold text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Global Brands</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Slider Track with Edge Gradients & Side Centered Navigation Arrows */}
      {realBrands.length > 0 ? (
        <div
          className="relative w-full px-2 sm:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Centered Left Side Navigation Arrow */}
          <button
            onClick={handlePrev}
            disabled={realBrands.length === 0}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white text-black border border-[#d8d8da] hover:border-black hover:bg-black hover:text-white transition-all shadow-md flex items-center justify-center rounded-none cursor-pointer active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous Brands"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Centered Right Side Navigation Arrow */}
          <button
            onClick={handleNext}
            disabled={realBrands.length === 0}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white text-black border border-[#d8d8da] hover:border-black hover:bg-black hover:text-white transition-all shadow-md flex items-center justify-center rounded-none cursor-pointer active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Next Brands"
            title="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Left & Right Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f5f2eb] via-[#f5f2eb]/90 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f5f2eb] via-[#f5f2eb]/90 to-transparent z-10" />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-1 scroll-smooth cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedBrands.map((brand, idx) => (
              <Link
                key={`${brand.id}-${idx}`}
                href={`/brands/${brand.slug}`}
                title={brand.name}
                className="bg-[#fefefe] border border-[#e2e2e2] min-w-[210px] sm:min-w-[260px] h-32 sm:h-38 shrink-0 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_45px_-12px_rgba(250,13,19,0.18)] transition-all duration-500 ease-out group/card"
              >
                {/* Subtle top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                {/* Brand Logo Image Only */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={brand.logoUrl || '/logo.png'}
                    alt={`${brand.name} logo`}
                    width={240}
                    height={120}
                    className="max-h-24 sm:max-h-28 max-w-[180px] sm:max-w-[230px] w-auto h-auto object-contain group-hover/card:scale-112 group-hover/card:-translate-y-1 transition-transform duration-500 ease-out"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-[#fefefe] border border-dashed border-[#d8d8da] my-2 space-y-2">
          <ShieldCheck className="w-8 h-8 text-primary mx-auto" />
          <p className="text-sm font-bold text-foreground">No matching brands found</p>
          <p className="text-xs text-foreground/60">Try searching for another brand name or reset your filters.</p>
        </div>
      )}
    </div>
  );
}
