'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Check, X, ShieldCheck, Sparkles } from 'lucide-react';
import { components } from '@monorepo/api';

type Brand = components['schemas']['Brand'];

interface BrandDropdownSelectProps {
  brands: Brand[];
  selectedBrandSlug: string; // 'all' or brand.slug
  onSelectBrandSlug: (slug: string) => void;
}

export function BrandDropdownSelect({
  brands,
  selectedBrandSlug,
  onSelectBrandSlug,
}: BrandDropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find active brand object
  const activeBrand = useMemo(() => {
    if (selectedBrandSlug === 'all') return null;
    return brands.find((b) => b.slug === selectedBrandSlug) || null;
  }, [brands, selectedBrandSlug]);

  // Filter brand list based on internal dropdown search query
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return brands;
    const q = searchQuery.toLowerCase().trim();
    return brands.filter(
      (b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q)
    );
  }, [brands, searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      {/* Custom Dropdown Trigger Button */}
      <div className="relative flex items-center">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-11 pl-4 pr-3 bg-[#fefefe] border border-[#d8d8da] hover:border-black transition-all flex items-center justify-between gap-3 text-xs font-extrabold uppercase tracking-wider shadow-2xs cursor-pointer rounded-none min-w-[240px] sm:min-w-[280px] ${
            activeBrand ? 'border-primary/50 bg-primary/5' : ''
          }`}
          aria-expanded={isOpen}
          aria-label="Filter products by brand"
        >
          <div className="flex items-center gap-2.5 truncate">
            <ShieldCheck className={`w-4 h-4 shrink-0 ${activeBrand ? 'text-primary' : 'text-foreground/70'}`} />
            {activeBrand ? (
              <div className="flex items-center gap-2 truncate">
                <span className="text-foreground/60 font-mono text-[10px]">Brand:</span>
                <span className="text-foreground font-black truncate">{activeBrand.name}</span>
              </div>
            ) : (
              <span className="text-foreground">All Brands & Accessories</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {activeBrand && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBrandSlug('all');
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onSelectBrandSlug('all');
                    setIsOpen(false);
                  }
                }}
                className="p-1 hover:bg-black hover:text-white rounded-none transition-colors text-foreground/50 hover:text-white"
                title="Clear brand filter"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 text-foreground/60 transition-transform duration-300 shrink-0 ${
                isOpen ? 'rotate-180 text-black' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Custom Searchable Dropdown Overlay Drawer */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 bg-white border-2 border-black shadow-2xl z-50 overflow-hidden divide-y divide-[#eaeaea] animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Dropdown Header Search Input */}
          <div className="p-2.5 bg-[#faf9f6]">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-foreground/40 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand name..."
                autoFocus
                className="w-full h-8 pl-8 pr-7 bg-white border border-[#d8d8da] focus:border-black text-xs font-medium text-foreground placeholder:text-foreground/40 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-1 text-foreground/40 hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-[#f2f1ed]">
            
            {/* Default "All Brands & Accessories" Option */}
            <button
              onClick={() => {
                onSelectBrandSlug('all');
                setIsOpen(false);
                setSearchQuery('');
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-[#faf9f6] transition-colors text-left cursor-pointer ${
                selectedBrandSlug === 'all' ? 'bg-primary/10 font-black' : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-extrabold uppercase text-foreground">
                  All Brands & Accessories
                </span>
              </div>
              {selectedBrandSlug === 'all' && <Check className="w-4 h-4 text-primary shrink-0" />}
            </button>

            {/* Individual Brand Options */}
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => {
                const isSelected = selectedBrandSlug === brand.slug;
                return (
                  <button
                    key={brand.id}
                    onClick={() => {
                      onSelectBrandSlug(brand.slug);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-[#faf9f6] transition-colors text-left cursor-pointer group ${
                      isSelected ? 'bg-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 bg-white border border-[#e5e5e5] p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={brand.logoUrl || '/logo.png'}
                          alt={brand.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {brand.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-mono text-foreground/50">
                        {brand.productCount}+ Parts
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-foreground/60">
                No brand matching &quot;{searchQuery}&quot;
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
