'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MOCK_BRANDS } from '@monorepo/mocks';
import { Sparkles, ChevronRight } from 'lucide-react';

export function AnnouncementBar() {
  // Real brand logos from mock dataset
  const brandTiles = MOCK_BRANDS.filter(
    (b) =>
      b.logoUrl &&
      !b.logoUrl.includes('product_') &&
      !b.logoUrl.includes('logo.png') &&
      !b.logoUrl.includes('favicon')
  );

  const marqueeMessages = [
    '⚡ FREE PAN-INDIA EXPRESS SHIPPING ON ORDERS OVER ₹2,499',
    '🔥 DIRECT FACTORY MANUFACTURING & DYNO-TESTED PERFORMANCE PARTS',
    '🛡️ 100% GUARANTEED BIKE FITMENT OR INSTANT REFUND',
    '🚚 EXPRESS 24-HOUR FACTORY DISPATCH ACROSS 26,000+ PINCODES',
    '🏁 43+ PREMIUM GLOBAL MOTORCYCLE OEM & AFTERMARKET BRANDS',
  ];

  return (
    <div className="bg-[#ffffff] text-[#000000] border-b border-[#edebe4] font-sans overflow-hidden select-none">
      {/* 1. TOP SMOOTH AUTO-SCROLLING MARQUEE NOTIFICATION TEXT TICKER */}
      <div className="bg-[#000000] lg:bg-[#ffffff] text-white lg:text-black py-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider overflow-hidden relative border-b border-white/10 lg:border-[#edebe4]">
        <div className="animate-marquee flex items-center whitespace-nowrap gap-8 sm:gap-12">
          {marqueeMessages.concat(marqueeMessages).map((msg, idx) => (
            <span key={idx} className="flex items-center gap-3 text-white/95 lg:text-black shrink-0">
              <span>{msg}</span>
              <span className="text-primary font-bold">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. MANUALLY SCROLLABLE BRAND TILES STRIP (ALIGNED WITH HEADER LOGO LEFT PADDING) */}
      <div className="py-2 bg-[#f7f6f2] lg:hidden">
        <div
          className="w-full flex items-center overflow-x-auto scrollbar-none py-0.5 pl-3 sm:pl-6 lg:pl-8 pr-3 sm:pr-6 gap-2 sm:gap-2.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Brand Category Tag */}
          <span className="text-[10px] font-mono font-black uppercase text-foreground/50 shrink-0 flex items-center gap-1 pr-2 border-r border-[#edebe4]">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>BRANDS</span>
          </span>

          {/* Functional Brand Tile Cards (Manual Scroll Only, No Auto-Scroll) */}
          {brandTiles.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              title={`Shop ${brand.name} Parts`}
              className="bg-white hover:bg-black text-foreground hover:text-white border border-[#edebe4] hover:border-black rounded-md h-9 sm:h-10 px-2.5 py-1 flex items-center gap-2 shrink-0 shadow-2xs hover:shadow-md transition-all active:scale-95 group cursor-pointer"
            >
              {brand.logoUrl && (
                <div className="relative w-8 h-8 sm:w-[34px] sm:h-[34px] shrink-0 flex items-center justify-center">
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    fill
                    className="object-contain p-0 scale-105"
                  />
                </div>
              )}
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider group-hover:text-white whitespace-nowrap">
                {brand.name}
              </span>
            </Link>
          ))}

          {/* View All Brands End Tile */}
          <Link
            href="/brands"
            className="text-[10px] font-black uppercase text-primary hover:text-black transition-colors shrink-0 flex items-center gap-1 pl-2 border-l border-[#edebe4] whitespace-nowrap"
          >
            <span>ALL BRANDS</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
