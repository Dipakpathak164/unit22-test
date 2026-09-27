'use client';

import React, { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Flame, ArrowRight, ShieldCheck, RotateCcw, X } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { BrandDropdownSelect } from './BrandDropdownSelect';
import { components } from '@monorepo/api';

type Brand = components['schemas']['Brand'];
type Product = components['schemas']['Product'];

interface BrandProductSectionProps {
  brands: Brand[];
  products: Product[];
}

export function BrandProductSection({ brands, products }: BrandProductSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('all');

  // Filter products based on selected brand
  const filteredProducts = useMemo(() => {
    if (selectedBrandSlug === 'all') return products;
    return products.filter((p) => p.brand && p.brand.slug === selectedBrandSlug);
  }, [products, selectedBrandSlug]);

  // If filtered products list is small, repeat products so the slider feels full
  const displayProducts = useMemo(() => {
    if (filteredProducts.length === 0) return [];
    if (filteredProducts.length < 4) {
      return [...filteredProducts, ...filteredProducts, ...filteredProducts, ...filteredProducts];
    }
    return filteredProducts;
  }, [filteredProducts]);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: -containerWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: containerWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="space-y-2">
      
      {/* Section Title & Subtitle Header */}
      <div className="space-y-1 pb-1">
        <div className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
          <Flame className="w-4 h-4 text-primary fill-primary" />
          <span>BRAND PERFORMANCE ACCESSORIES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-foreground tracking-tight">
          FEATURED BRAND <span className="text-primary">PARTS & ACCESSORIES</span>
        </h2>
        <p className="text-xs sm:text-sm text-foreground/70">
          Dyno-tested exhausts, sintered brake kits, expedition panniers & high-lumen auxiliary pods.
        </p>
      </div>

      {/* Filter Row Below Title containing Dropdown, Clear Filter & View All Link */}
      <div className="sticky top-[57px] z-30 md:static -mx-4 px-4 md:mx-0 md:px-0 bg-[#f7f6f2] flex flex-wrap items-center justify-between gap-3 border-y border-[#eaeaea] py-2">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Custom Dropdown Search & Select */}
          <BrandDropdownSelect
            brands={brands}
            selectedBrandSlug={selectedBrandSlug}
            onSelectBrandSlug={setSelectedBrandSlug}
          />

          {/* Clear Filter Engineering Action */}
          {selectedBrandSlug !== 'all' && (
            <button
              onClick={() => setSelectedBrandSlug('all')}
              className="h-11 px-3.5 bg-black hover:bg-primary text-white hover:text-black border border-black transition-all duration-200 flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer shadow-xs group animate-in fade-in zoom-in-95 duration-150"
              title="Reset Brand Filter to All Products"
            >
              <RotateCcw className="w-3.5 h-3.5 text-primary group-hover:text-black group-hover:-rotate-90 transition-transform duration-300" />
              <span>Clear Filter</span>
              <span className="w-4 h-4 bg-white/20 group-hover:bg-black/20 rounded-full flex items-center justify-center text-[10px] font-mono ml-0.5">
                <X className="w-3 h-3" />
              </span>
            </button>
          )}
        </div>

        {/* View All Button with Original Primary Color & Style */}
        <Link
          href="/c/brakes"
          className="text-xs font-bold text-primary-hover hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View All Accessories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Product Slider Track (Exact Auxiliary Lights Slider Reference Style) */}
      <div className="relative group/slider -mr-4 sm:mr-0 pl-1 sm:px-0">
        
        {/* Centered Left Side Navigation Arrow (Hidden on Mobile) */}
        <button
          onClick={handlePrev}
          disabled={displayProducts.length === 0}
          className="hidden sm:flex absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white text-black border border-[#d8d8da] hover:border-black hover:bg-black hover:text-white transition-all shadow-md items-center justify-center rounded-none cursor-pointer active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Previous Products"
          title="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Centered Right Side Navigation Arrow (Hidden on Mobile) */}
        <button
          onClick={handleNext}
          disabled={displayProducts.length === 0}
          className="hidden sm:flex absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white text-black border border-[#d8d8da] hover:border-black hover:bg-black hover:text-white transition-all shadow-md items-center justify-center rounded-none cursor-pointer active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Next Products"
          title="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Track (4 Cards Visible Per View on Desktop, 78% width on Mobile with zero right margin) */}
        {displayProducts.length > 0 ? (
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-2.5 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pt-1 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayProducts.map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="w-[78%] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] shrink-0 flex"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-[#fefefe] border border-dashed border-[#d8d8da] my-2 space-y-3">
            <ShieldCheck className="w-8 h-8 text-primary mx-auto" />
            <p className="text-sm font-bold text-foreground">No accessories found for this brand</p>
            <p className="text-xs text-foreground/60">Try selecting another brand from the dropdown or clear the active filter.</p>
            <button
              onClick={() => setSelectedBrandSlug('all')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-primary text-white hover:text-black text-xs font-black uppercase transition-colors group cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-primary group-hover:text-black" />
              <span>Clear Brand Filter</span>
            </button>
          </div>
        )}

      </div>

    </section>
  );
}
