'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { LightGridOverlay } from '@/components/common/SectionGridOverlay';
import { components } from '@monorepo/api';

type Product = components['schemas']['Product'];

export const AUXILIARY_LIGHT_PRODUCTS: Product[] = [
  {
    id: 'aux-1',
    name: 'Denali D4 Dual-Tone LED Auxiliary Pod Kit',
    slug: 'denali-d4-aux-pod-kit',
    brand: { id: 'b-6', name: 'Denali', slug: 'denali', productCount: 15 },
    category: { id: 'c-6', name: 'Lighting', slug: 'lighting' },
    basePricePaise: 1499900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      { id: 'v-aux-1', sku: 'DEN-D4-KIT', name: 'Dual Pod Kit', pricePaise: 1499900, stock: 14, attributes: {} },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2', 'bike-3'],
    specs: { Output: '8,760 Lumens', Beam: 'Hybrid Spot / Flood' },
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
  },
  {
    id: 'aux-2',
    name: 'Clearwater Erica Extreme 12,000 Lumen LED Pods',
    slug: 'clearwater-erica-extreme-pods',
    brand: { id: 'b-7', name: 'Clearwater', slug: 'clearwater', productCount: 8 },
    category: { id: 'c-6', name: 'Lighting', slug: 'lighting' },
    basePricePaise: 1949900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      { id: 'v-aux-2', sku: 'CW-ERICA-12K', name: 'Extreme Kit', pricePaise: 1949900, stock: 9, attributes: {} },
    ],
    compatibleBikeIds: ['bike-1', 'bike-3'],
    specs: { Output: '12,000 Lumens', Housing: 'CNC Billet Aluminum' },
    inStock: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: 'aux-3',
    name: 'Baja Designs Squadron Pro Amber Fog Pod Pair',
    slug: 'baja-designs-squadron-pro-amber',
    brand: { id: 'b-8', name: 'Baja Designs', slug: 'baja-designs', productCount: 12 },
    category: { id: 'c-6', name: 'Lighting', slug: 'lighting' },
    basePricePaise: 1289900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      { id: 'v-aux-3', sku: 'BD-SQPRO-AMB', name: 'Amber Lens Pair', pricePaise: 1289900, stock: 22, attributes: {} },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2'],
    specs: { Output: '4,900 Lumens', Color: 'Selective Yellow / Amber' },
    inStock: true,
    rating: 5.0,
    reviewCount: 41,
  },
  {
    id: 'aux-4',
    name: 'Rigid Industries D-Series Pro Heavy-Duty Spot Pods',
    slug: 'rigid-industries-d-series-pro',
    brand: { id: 'b-9', name: 'Rigid', slug: 'rigid', productCount: 18 },
    category: { id: 'c-6', name: 'Lighting', slug: 'lighting' },
    basePricePaise: 1629900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      { id: 'v-aux-4', sku: 'RI-DSERIES-PRO', name: 'Spot Beam Pair', pricePaise: 1629900, stock: 11, attributes: {} },
    ],
    compatibleBikeIds: ['bike-2', 'bike-3'],
    specs: { Output: '6,336 Lumens', Rating: 'IP68 Waterproof' },
    inStock: true,
    rating: 4.7,
    reviewCount: 15,
  },
  {
    id: 'aux-5',
    name: 'Unit 22 CNC Billet Crash Guard Light Clamp Mounts',
    slug: 'unit-22-crash-guard-light-mounts',
    brand: { id: 'b-10', name: 'Unit 22', slug: 'unit-22', productCount: 45 },
    category: { id: 'c-6', name: 'Lighting', slug: 'lighting' },
    basePricePaise: 349900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      { id: 'v-aux-5', sku: 'U22-CLAMP-32MM', name: '32-38mm Clamp Pair', pricePaise: 349900, stock: 40, attributes: {} },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2', 'bike-3'],
    specs: { Material: 'T6-6061 Aluminum', Fitment: '22mm to 38mm Crash Bars' },
    inStock: true,
    rating: 4.9,
    reviewCount: 52,
  },
  {
    id: 'aux-6',
    name: 'Smart CANbus Auxiliary Light Wiring Harness & Relay',
    slug: 'smart-canbus-auxiliary-wiring-harness',
    brand: { id: 'b-10', name: 'Unit 22', slug: 'unit-22', productCount: 45 },
    category: { id: 'c-6', name: 'Lighting', slug: 'lighting' },
    basePricePaise: 499900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      { id: 'v-aux-6', sku: 'U22-HARNESS-CANBUS', name: 'Plug & Play Kit', pricePaise: 499900, stock: 25, attributes: {} },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2', 'bike-3'],
    specs: { Trigger: 'Pass Light & Horn Sync', Harness: 'Weatherproof Sealed' },
    inStock: true,
    rating: 4.8,
    reviewCount: 29,
  },
];

export function AuxiliaryLightsSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section className="bg-[#f7f6f2] border-t border-b border-[#edebe4] py-14 sm:py-16 relative overflow-hidden">
      {/* Light Section Edge-Fading Technical Grid */}
      <LightGridOverlay />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e5e5e5] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
              <Zap className="w-4 h-4 text-primary fill-primary" />
              <span>NIGHT EXPEDITION LIGHTING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-foreground tracking-tight">
              UNIT 22 <span className="text-primary">AUXILIARY LIGHTS</span> & PODS
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70">
              High-lumen dual-beam LED pods, CNC billet mounting brackets & plug-and-play wiring harnesses.
            </p>
          </div>

          <Link
            href="/c/lighting"
            className="text-xs font-bold text-primary-hover hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All Auxiliary Lighting</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Slider Track Container with Centered Side Navigation Arrows */}
        <div className="relative group/slider -mr-4 sm:mr-0 pl-1 sm:px-0">
          
          {/* Centered Left Arrow (Hidden on Mobile) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white text-black border border-[#d8d8da] hover:border-black hover:bg-black hover:text-white transition-all shadow-md items-center justify-center rounded-none cursor-pointer active:scale-90"
            aria-label="Previous Slide"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Centered Right Arrow (Hidden on Mobile) */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white text-black border border-[#d8d8da] hover:border-black hover:bg-black hover:text-white transition-all shadow-md items-center justify-center rounded-none cursor-pointer active:scale-90"
            aria-label="Next Slide"
            title="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Track (4 Cards Visible Per Slide on Desktop, 78% width on Mobile with zero right margin) */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-2.5 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {AUXILIARY_LIGHT_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="w-[78%] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] shrink-0 flex"
              >
                <ProductCard product={product} className="w-full flex flex-col justify-between" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
