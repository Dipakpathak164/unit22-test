'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@monorepo/ui';
import { DarkGridOverlay } from '@/components/common/SectionGridOverlay';
import { useAppDispatch } from '@/lib/store/store';
import { addToCart } from '@/features/cart/slice';

export interface HelmetProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviewsCount: number;
  cert: string;
  image: string;
}

export const MOCK_HELMET_PRODUCTS: HelmetProduct[] = [
  {
    id: 'helm-1',
    name: 'SMK Titan Carbon Fiber Full-Face Track Helmet',
    slug: 'smk-titan-carbon-track-helmet',
    brand: 'SMK Racing',
    price: '₹14,999',
    originalPrice: '₹18,500',
    discount: 'Save 19%',
    rating: 4.9,
    reviewsCount: 42,
    cert: 'ECE 22.06 & DOT Certified',
    image: '/images/hero_banner_touring.png',
  },
  {
    id: 'helm-2',
    name: 'Arai Tour-X4 Expedition Dual-Sport Helmet',
    slug: 'arai-tour-x4-expedition-helmet',
    brand: 'Arai Japan',
    price: '₹48,999',
    originalPrice: '₹55,000',
    discount: 'Save 11%',
    rating: 5.0,
    reviewsCount: 28,
    cert: 'Snell M2020 & ECE Approved',
    image: '/images/hero_banner_touring.png',
  },
  {
    id: 'helm-3',
    name: 'AGV K6 S Ultra Carbon Aerodynamic Road Helmet',
    slug: 'agv-k6-s-ultra-carbon-helmet',
    brand: 'AGV Italy',
    price: '₹36,499',
    originalPrice: '₹42,000',
    discount: 'Save 13%',
    rating: 4.8,
    reviewsCount: 35,
    cert: 'ECE 22.06 & FIM Homologated',
    image: '/images/hero_banner_touring.png',
  },
  {
    id: 'helm-4',
    name: 'Shoei Hornet ADV Touring Dual-Visor Helmet',
    slug: 'shoei-hornet-adv-touring-helmet',
    brand: 'Shoei Japan',
    price: '₹52,999',
    originalPrice: '₹60,000',
    discount: 'Save 12%',
    rating: 4.9,
    reviewsCount: 19,
    cert: 'JIS & ECE 22.06 Certified',
    image: '/images/hero_banner_touring.png',
  },
  {
    id: 'helm-5',
    name: 'LS2 Thunder Carbon GP Race Edition Helmet',
    slug: 'ls2-thunder-carbon-gp-helmet',
    brand: 'LS2 Helmets',
    price: '₹28,999',
    originalPrice: '₹34,000',
    discount: 'Save 15%',
    rating: 4.7,
    reviewsCount: 51,
    cert: 'FIM Racing & ECE 22.06',
    image: '/images/hero_banner_touring.png',
  },
  {
    id: 'helm-6',
    name: 'MT Jarama Vintage Retro Full-Face Helmet',
    slug: 'mt-jarama-vintage-retro-helmet',
    brand: 'MT Helmets Spain',
    price: '₹8,499',
    originalPrice: '₹10,500',
    discount: 'Save 19%',
    rating: 4.8,
    reviewsCount: 64,
    cert: 'ECE 22.06 & DOT Certified',
    image: '/images/hero_banner_touring.png',
  },
];

export function HelmetDarkSlider() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (e: React.MouseEvent, helmet: HelmetProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const pricePaise = parseInt(helmet.price.replace(/[^\d]/g, ''), 10) * 100 || 1499900;
    dispatch(
      addToCart({
        product: {
          id: helmet.id,
          name: helmet.name,
          slug: helmet.slug,
          basePricePaise: pricePaise,
          images: [helmet.image],
          brand: {
            id: 'b-helm',
            name: helmet.brand,
            slug: helmet.brand.toLowerCase().replace(/\s+/g, '-'),
            productCount: 10,
          },
          category: {
            id: 'c-helmets',
            name: 'Helmets & Riding Gear',
            slug: 'helmets',
          },
          variants: [
            {
              id: `var-${helmet.id}`,
              sku: `SKU-${helmet.id.toUpperCase()}`,
              name: 'Standard Fit',
              pricePaise: pricePaise,
              stock: 15,
              attributes: { certification: helmet.cert },
            },
          ],
          compatibleBikeIds: [],
          specs: { Certification: helmet.cert },
          inStock: true,
          rating: helmet.rating,
          reviewCount: helmet.reviewsCount,
        },
      })
    );
  };

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
    <section className="bg-[#050507] text-white py-16 sm:py-20 border-t border-b border-white/10 relative overflow-hidden">
      {/* Dark Section Edge-Fading Technical Grid */}
      <DarkGridOverlay />
      {/* Ambient Red Glow in Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-xs font-black px-3 py-1 uppercase tracking-widest border border-primary/40">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>MAXIMUM HEAD PROTECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
              RACE & TOUR <span className="text-primary">HELMET COLLECTION</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              ECE 22.06 & FIM certified carbon fiber helmets, dual-visor adventure lids & high-speed aero helmets.
            </p>
          </div>

          <Link
            href="/c/helmets"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All Helmets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Slider Track Container with Centered Side Navigation Arrows */}
        <div className="relative group/slider -mr-4 sm:mr-0 pl-1 sm:px-0">
          
          {/* Centered Left Navigation Arrow (Hidden on Mobile) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-[#121218] text-white border border-white/20 hover:border-primary hover:bg-primary hover:text-black transition-all shadow-2xl items-center justify-center rounded-none cursor-pointer active:scale-90"
            aria-label="Previous Slide"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Centered Right Navigation Arrow (Hidden on Mobile) */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-[#121218] text-white border border-white/20 hover:border-primary hover:bg-primary hover:text-black transition-all shadow-2xl items-center justify-center rounded-none cursor-pointer active:scale-90"
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
            {MOCK_HELMET_PRODUCTS.map((helmet) => (
              <div
                key={helmet.id}
                className="w-[78%] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] shrink-0 flex"
              >
                {/* Premium Dark Theme Helmet Card: Refined Resting Red Ambient Glow + Intense Hover Flare */}
                <div
                  onClick={() => router.push(`/product/${helmet.slug}`)}
                  className="bg-[#0b0b10] border-0 shadow-[0_0_20px_rgba(250,13,19,0.14),0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_0_48px_rgba(250,13,19,0.52),0_20px_40px_rgba(0,0,0,0.8)] hover:bg-[#0d0d14] transition-all duration-500 ease-out flex flex-col justify-between p-4 sm:p-5 group w-full relative cursor-pointer"
                >
                  
                  {/* 3D Corner-Folded Fishtail Ribbon Clip Badge (Standardized Racing Yellow #facc15) */}
                  <div className="absolute -left-2.5 top-3.5 z-20 flex items-center select-none pointer-events-none drop-shadow-md">
                    {/* Under-card corner fold triangle shadow */}
                    <div
                      className="absolute -bottom-2 left-0 w-2.5 h-2 bg-[#ca8a04]"
                      style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                    />

                    {/* Main Racing Yellow Ribbon Body with Right Fishtail Cutout */}
                    <div
                      className="bg-[#facc15] text-black font-black text-[10px] uppercase tracking-wider pl-3.5 pr-6 py-1 flex items-center gap-1 leading-none shadow-sm border-t border-b border-black/20"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 84% 50%, 100% 100%, 0 100%)' }}
                    >
                      <span>{helmet.discount}</span>
                    </div>
                  </div>

                  {/* Top Tag Row */}
                  <div className="flex items-center justify-end gap-2 z-10 mb-2 pt-1">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest bg-white/5 px-2 py-0.5 border border-white/10">
                      {helmet.brand}
                    </span>
                  </div>

                  {/* Helmet Image Box */}
                  <Link
                    href={`/product/${helmet.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="block relative aspect-square bg-black/40 border-0 p-0 overflow-hidden mb-4"
                  >
                    <Image
                      src={helmet.image}
                      alt={helmet.name}
                      fill
                      className="object-cover p-2 opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 ease-out"
                    />
                  </Link>

                  {/* Helmet Details */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Safety Certification Badge */}
                      <span className="text-[10px] font-mono font-bold text-primary block tracking-wider uppercase mb-1">
                        {helmet.cert}
                      </span>
                      
                      <Link href={`/product/${helmet.slug}`} onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-extrabold text-xs sm:text-sm text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                          {helmet.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-white">{helmet.rating}</span>
                        <span className="text-[10px] text-white/50">({helmet.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Pricing & CTA Button */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <span className="text-[10px] text-white/40 line-through block font-mono">
                          {helmet.originalPrice}
                        </span>
                        <span className="text-base font-black text-white tracking-tight">
                          {helmet.price}
                        </span>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => handleAddToCart(e, helmet)}
                        className="bg-white text-black hover:bg-primary hover:text-black font-extrabold text-[11px] px-3.5 py-1.5 transition-colors border-0 shrink-0 gap-1.5 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-black" />
                        <span>ADD</span>
                      </Button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
