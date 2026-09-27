'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Filter, Check, ArrowRight } from 'lucide-react';
import { components } from '@monorepo/api';

type Brand = components['schemas']['Brand'];

interface BrandFilterBarProps {
  brands: Brand[];
  selectedBrandSlug: string; // 'all' or brand.slug
  searchQuery: string;
  onSelectBrandSlug: (slug: string) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export function BrandFilterBar({
  brands,
  selectedBrandSlug,
  searchQuery,
  onSelectBrandSlug,
  onSearchChange,
  onReset,
}: BrandFilterBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Filter brand pills based on search query
  const visibleBrandPills = useMemo(() => {
    if (!searchQuery.trim()) return brands;
    const q = searchQuery.toLowerCase().trim();
    return brands.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q)
    );
  }, [brands, searchQuery]);

  // Quick Autocomplete Results for search input
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return brands.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q)
    );
  }, [brands, searchQuery]);

  return (
    <div className="bg-[#fefefe] border border-[#e2e2e2] p-4 sm:p-5 shadow-xs mb-6 space-y-4">
      
      {/* Top Filter Header & Search Input */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Title Badge */}
        <div className="space-y-1 shrink-0">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black uppercase text-foreground tracking-wider font-sans">
              Select Brand Direct Filter
            </h3>
          </div>
          <p className="text-[11px] text-foreground/60">
            Select a motorcycle brand manufacturer or performance partner directly
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-foreground/40 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search brand (e.g. Royal Enfield, KTM, TVS, Brembo...)"
              className="w-full h-10 pl-10 pr-9 bg-[#faf9f6] border border-[#d8d8da] focus:border-black text-xs font-medium text-foreground placeholder:text-foreground/40 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 text-foreground/50 hover:text-foreground transition-colors"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Quick Results Dropdown */}
          {isFocused && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-[#eaeaea]">
              {searchResults.length > 0 ? (
                searchResults.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      onSelectBrandSlug(brand.slug);
                      onSearchChange('');
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-[#faf9f6] transition-colors group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#faf9f6] border border-[#e5e5e5] p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={brand.logoUrl || '/logo.png'}
                          alt={brand.name}
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                        {brand.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-foreground/50">
                      {brand.productCount}+ Parts →
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-3.5 text-center text-xs text-foreground/60">
                  No brands matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Direct Brand-Level Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#eaeaea]">
        <div className="flex flex-wrap items-center gap-2">
          {/* ALL BRANDS PILL */}
          <button
            onClick={() => onSelectBrandSlug('all')}
            className={`text-xs font-extrabold px-3.5 py-1.5 uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              selectedBrandSlug === 'all'
                ? 'bg-black text-white border border-black shadow-xs'
                : 'bg-[#faf9f6] text-foreground/75 border border-[#e2e2e2] hover:border-black hover:text-black'
            }`}
          >
            {selectedBrandSlug === 'all' && <Check className="w-3.5 h-3.5 text-primary" />}
            <span>All Brands</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 ${
                selectedBrandSlug === 'all'
                  ? 'bg-primary text-black font-black'
                  : 'bg-black/5 text-foreground/50'
              }`}
            >
              {brands.length}
            </span>
          </button>

          {/* INDIVIDUAL DIRECT BRAND PILLS */}
          {visibleBrandPills.map((brand) => {
            const isSelected = selectedBrandSlug === brand.slug;
            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrandSlug(brand.slug)}
                className={`text-xs font-extrabold px-3 py-1.5 uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-black text-white border border-black shadow-xs'
                    : 'bg-[#faf9f6] text-foreground/80 border border-[#e2e2e2] hover:border-black hover:text-black'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                <span>{brand.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 ${
                    isSelected
                      ? 'bg-primary text-black font-black'
                      : 'bg-black/5 text-foreground/50'
                  }`}
                >
                  {brand.productCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Clear Reset Button */}
        {(selectedBrandSlug !== 'all' || searchQuery !== '') && (
          <button
            onClick={onReset}
            className="text-[11px] font-mono font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <X className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

    </div>
  );
}
