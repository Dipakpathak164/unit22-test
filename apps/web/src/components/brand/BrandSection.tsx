'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { components } from '@monorepo/api';
import { BrandFilterBar } from './BrandFilterBar';
import { BrandSlider } from './BrandSlider';

type Brand = components['schemas']['Brand'];

interface BrandSectionProps {
  brands: Brand[];
}

export function BrandSection({ brands }: BrandSectionProps) {
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Find currently selected brand object if a specific brand is selected
  const activeBrandObj = useMemo(() => {
    if (selectedBrandSlug === 'all') return null;
    return brands.find((b) => b.slug === selectedBrandSlug) || null;
  }, [brands, selectedBrandSlug]);

  // Filter brand list based on selected direct brand slug & search query
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      // Direct brand selection match
      let matchesBrand = true;
      if (selectedBrandSlug !== 'all') {
        matchesBrand = brand.slug === selectedBrandSlug;
      }

      // Search query match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch =
          brand.name.toLowerCase().includes(q) || brand.slug.toLowerCase().includes(q);
      }

      return matchesBrand && matchesSearch;
    });
  }, [brands, selectedBrandSlug, searchQuery]);

  const handleReset = () => {
    setSelectedBrandSlug('all');
    setSearchQuery('');
  };

  return (
    <section className="space-y-4">
      {/* Brand Search & Direct Brand-Level Pill Selector */}
      <BrandFilterBar
        brands={brands}
        selectedBrandSlug={selectedBrandSlug}
        searchQuery={searchQuery}
        onSelectBrandSlug={setSelectedBrandSlug}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
      />

      {/* Featured Banner when a specific Direct Brand Pill is selected */}
      {activeBrandObj && (
        <div className="bg-[#fefefe] border-2 border-primary/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md mb-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#faf9f6] border border-[#d8d8da] p-2 shrink-0 flex items-center justify-center">
              <Image
                src={activeBrandObj.logoUrl || '/logo.png'}
                alt={activeBrandObj.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-foreground font-sans">
                  Selected Brand: <span className="text-primary">{activeBrandObj.name}</span>
                </span>
                <span className="bg-primary text-black font-mono font-black text-[10px] px-2 py-0.5 uppercase">
                  Authorized Partner
                </span>
              </div>
              <p className="text-xs text-foreground/70 mt-0.5">
                Browse {activeBrandObj.productCount}+ verified products and motorcycle-specific performance parts.
              </p>
            </div>
          </div>

          <Link
            href={`/brands/${activeBrandObj.slug}`}
            className="w-full sm:w-auto h-10 px-5 bg-black text-white hover:bg-primary hover:text-black font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2 shrink-0"
          >
            <span>Shop {activeBrandObj.name} Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Filtered Brand Logos Slider Track */}
      <BrandSlider
        brands={filteredBrands}
        activeCategoryLabel={activeBrandObj ? activeBrandObj.name : 'All Brands'}
      />
    </section>
  );
}
