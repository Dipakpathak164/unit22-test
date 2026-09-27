'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPaise } from '@monorepo/api';
import {
  Search,
  Package,
  Bike,
  Tag,
  Clock,
  TrendingUp,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface SearchSuggestionsOverlayProps {
  query: string;
  searchResults: {
    products: Array<{
      id: string;
      name: string;
      slug: string;
      brand: { name: string };
      basePricePaise: number;
      images: string[];
    }>;
    brands: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    fitmentBikes: Array<{
      id: string;
      make: string;
      model: string;
      year: number;
    }>;
  };
  recentSearches: string[];
  onSelectSearchTerm: (term: string) => void;
  onRemoveRecentSearch: (term: string) => void;
  onClose: () => void;
}

export function SearchSuggestionsOverlay({
  query,
  searchResults,
  recentSearches,
  onSelectSearchTerm,
  onRemoveRecentSearch,
  onClose,
}: SearchSuggestionsOverlayProps) {
  const trendingSearches = [
    'Interceptor 650 Brake Pads',
    'Akrapovic Titanium Exhaust',
    'Expedition Aluminum Panniers',
    'Motul 300V Engine Oil',
  ];

  const hasResults =
    searchResults.products.length > 0 ||
    searchResults.brands.length > 0 ||
    searchResults.fitmentBikes.length > 0;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-[#ffffff] border border-[#edebe4] shadow-2xl z-50 p-4 font-sans text-xs animate-in fade-in zoom-in-95 duration-150">
      {/* CASE 1: Query is Empty — Show Recent Searches & Trending Keywords */}
      {!query.trim() ? (
        <div className="space-y-4">
          {recentSearches.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-foreground/60 uppercase">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> RECENT SEARCHES
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <div
                    key={term}
                    className="inline-flex items-center gap-1.5 bg-[#f7f6f2] hover:bg-[#edebe4] border border-[#d8d8da] px-2.5 py-1 text-xs font-bold text-foreground transition-colors group cursor-pointer"
                  >
                    <button
                      onClick={() => {
                        onSelectSearchTerm(term);
                        onClose();
                      }}
                      className="text-left"
                    >
                      {term}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveRecentSearch(term);
                      }}
                      className="text-foreground/40 hover:text-red-600 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold text-foreground/60 uppercase flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-primary" /> TRENDING SEARCHES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    onSelectSearchTerm(term);
                    onClose();
                  }}
                  className="p-2 bg-[#f9f9f8] hover:bg-primary/10 border border-[#edebe4] text-left font-bold text-foreground flex items-center justify-between transition-colors group"
                >
                  <span className="group-hover:text-primary transition-colors">{term}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : !hasResults ? (
        /* CASE 2: Query has no matches */
        <div className="py-6 text-center space-y-2 font-sans">
          <p className="font-bold text-foreground">No matches found for &quot;{query}&quot;</p>
          <p className="text-foreground/60 text-[11px]">
            Try searching by bike model (e.g. Interceptor 650), brand name, or part type.
          </p>
        </div>
      ) : (
        /* CASE 3: Query has matches — Render Grouped Multi-Entity Results */
        <div className="space-y-4">
          {/* Matching Products */}
          {searchResults.products.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                <Package className="w-3.5 h-3.5" /> MATCHING PARTS & SKUS ({searchResults.products.length})
              </div>
              <div className="space-y-1">
                {searchResults.products.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/p/${prod.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2 hover:bg-[#f7f6f2] border border-transparent hover:border-[#edebe4] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative bg-[#f9f9f8] border border-[#edebe4] shrink-0">
                        <Image
                          src={prod.images[0] || '/images/product_brake_pads.png'}
                          alt={prod.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors block line-clamp-1">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-foreground/60 font-mono">
                          Brand: {prod.brand.name}
                        </span>
                      </div>
                    </div>

                    <span className="font-black text-foreground font-sans shrink-0 ml-2">
                      {formatPaise(prod.basePricePaise)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Matching Brands */}
          {searchResults.brands.length > 0 && (
            <div className="space-y-2 border-t border-[#edebe4] pt-3">
              <div className="text-[10px] font-mono font-bold text-foreground/60 uppercase tracking-widest flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-primary" /> MATCHING OFFICIAL BRANDS
              </div>
              <div className="flex flex-wrap gap-2">
                {searchResults.brands.map((b) => (
                  <Link
                    key={b.id}
                    href={`/brands/${b.slug}`}
                    onClick={onClose}
                    className="px-3 py-1.5 bg-[#f7f6f2] hover:bg-black hover:text-white border border-[#d8d8da] font-bold text-foreground text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>{b.name}</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Matching Compatible Motorcycles */}
          {searchResults.fitmentBikes.length > 0 && (
            <div className="space-y-2 border-t border-[#edebe4] pt-3">
              <div className="text-[10px] font-mono font-bold text-foreground/60 uppercase tracking-widest flex items-center gap-1">
                <Bike className="w-3.5 h-3.5 text-primary" /> COMPATIBLE MOTORCYCLES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                {searchResults.fitmentBikes.map((bike) => (
                  <Link
                    key={bike.id}
                    href={`/search?q=${encodeURIComponent(`${bike.make} ${bike.model}`)}`}
                    onClick={onClose}
                    className="p-2 bg-[#f9f9f8] hover:bg-primary/10 border border-[#edebe4] flex items-center justify-between text-xs font-bold text-foreground transition-colors group"
                  >
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{bike.make} {bike.model}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* View All Search Results CTA */}
          <div className="pt-2 border-t border-[#edebe4] text-center">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-xs font-black uppercase text-primary hover:underline inline-flex items-center gap-1 py-1"
            >
              <span>SEE ALL SEARCH RESULTS FOR &quot;{query}&quot;</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
