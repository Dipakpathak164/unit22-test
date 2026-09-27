'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MOCK_BRANDS, MOCK_PRODUCTS, CATEGORY_REGISTRY, getCategoryUrl, COMBO_PACKAGES } from '@monorepo/mocks';
import { ProductCard } from '@/components/product/ProductCard';
import { FeaturedPerformanceSection } from '@/components/product/FeaturedPerformanceSection';
import { HeroSlider } from '@/components/hero/HeroSlider';
import { BrandSlider } from '@/components/brand/BrandSlider';
import { BrandProductSection } from '@/components/brand/BrandProductSection';
import { AuxiliaryLightsSlider } from '@/components/product/AuxiliaryLightsSlider';
import { HelmetDarkSlider } from '@/components/product/HelmetDarkSlider';
import { ContactSection } from '@/components/contact/ContactSection';
import { LightGridOverlay, DarkGridOverlay } from '@/components/common/SectionGridOverlay';
import { Button } from '@monorepo/ui';
import {
  Bike,
  Flame,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Zap,
  ShieldCheck,
  Compass,
  Wrench,
  Gauge,
  Cpu,
  Trophy,
  CheckCircle,
  Truck,
  Headphones,
  ChevronRight,
  Star,
  Check,
  Tag,
} from 'lucide-react';

const UPGRADE_STEPS = [
  {
    step: '01',
    title: 'Select Your Bike',
    description: 'Pick your make and model to unlock 100% verified parts.',
    badgeLabel: '100% Verified Fitment',
  },
  {
    step: '02',
    title: 'In-House Crafting',
    description: 'CNC machined with 0.01mm tolerances & dyno benchmarked.',
    badgeLabel: '0.01mm Precision CNC',
  },
  {
    step: '03',
    title: 'Express Dispatch',
    description: 'Packed in custom crates and dispatched within 24 hours.',
    badgeLabel: '24-Hour Pan-India Dispatch',
  },
  {
    step: '04',
    title: 'Bolt-On Fitment',
    description: 'Includes full mounting hardware & master mechanic support.',
    badgeLabel: 'Complete Hardware Included',
  },
];




const TRUST_FEATURES = [
  {
    icon: CheckCircle,
    title: '100% Guaranteed Fitment',
    description: 'Select your bike make & year. If it doesn’t fit, receive a 100% instant refund.',
  },
  {
    icon: ShieldCheck,
    title: 'Direct Factory Warranty',
    description: '1 to 5-year comprehensive manufacturer warranty directly from our workshop.',
  },
  {
    icon: Headphones,
    title: 'Master Mechanic Advice',
    description: 'Speak directly with expert motorcycle mechanics for installation & fitment guidance.',
  },
  {
    icon: Truck,
    title: 'Pan-India Express Dispatch',
    description: 'Factory-direct protective packaging shipped within 24 hours across India.',
  },
];

function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2200,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easedProgress * target));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="inline-block min-w-[1ch]">
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function StorefrontHomePage() {
  const router = useRouter();

  return (
    <div className="bg-white text-foreground min-h-screen">
      {/* 1. Full-Width Interactive Hero Slider */}
      <HeroSlider />

      {/* 2. Main Content Area with Light Creamy White Toned Section Background */}
      <div className="bg-[#f7f6f2] border-b border-[#edebe4] relative overflow-clip">
        {/* Light Section Edge-Fading Technical Grid */}
        <LightGridOverlay />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 space-y-10">
          
          {/* TOP POST-HERO BRAND SECTIONS (REDUCED VERTICAL GAPS, TOP PT-10 PRESERVED) */}
          <div className="space-y-6">
            {/* 1. TOP PERFORMANCE BRANDS LOGO SLIDER (FIRST PLACE, UNFILTERED & INDEPENDENT) */}
            <section>
              <BrandSlider brands={MOCK_BRANDS} />
            </section>

            {/* 2. BRAND PRODUCT SECTION (CUSTOM SEARCHABLE DROPDOWN & 4-CARD PRODUCT SLIDER) */}
            <section>
              <BrandProductSection brands={MOCK_BRANDS} products={MOCK_PRODUCTS} />
            </section>
          </div>

          {/* WHAT ARE YOU LOOKING FOR TODAY? - 6 CATEGORY GRID SECTION */}
          <section className="space-y-6 pt-2">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-foreground tracking-tight">
                What Are You <span className="text-primary">Looking For Today?</span>
              </h2>
              <p className="text-xs text-foreground/60 max-w-md mx-auto">
                Browse our specialized motorcycle performance categories & rider essentials
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
              {CATEGORY_REGISTRY.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={getCategoryUrl(cat.slug)}
                  className="group relative h-48 sm:h-56 lg:h-60 overflow-hidden border border-[#e2e1dc] bg-black hover:-translate-y-2 hover:shadow-[0_20px_45px_-12px_rgba(250,13,19,0.25)] transition-all duration-500 ease-out rounded-none block"
                >
                  {/* Background Image */}
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover w-full h-full opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent group-hover:from-black/95 transition-colors duration-300" />

                  {/* Hover Red Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-3 right-3 text-center z-10 space-y-0.5">
                    <h3 className="font-extrabold text-xs sm:text-sm text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <span className="inline-block text-[10px] text-white/60 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FEATURED PERFORMANCE PARTS & ACCESSORIES */}
          <FeaturedPerformanceSection products={MOCK_PRODUCTS} />

        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-WIDTH MARQUEE RIBBON WITH BLENDING RACING YELLOW TO DARK GRADIENT    */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-b from-[#facc15] via-[#eab308] to-[#050507] text-black font-black uppercase overflow-hidden py-7 sm:py-9 border-t border-black/20 select-none relative shadow-xl">
        <div className="animate-marquee flex items-center whitespace-nowrap gap-10 sm:gap-12 text-base sm:text-lg md:text-xl tracking-widest drop-shadow-xs">
          <span className="flex items-center gap-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black shrink-0" /> PAN-INDIA 24HR EXPRESS DISPATCH
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> 100% GUARANTEED BIKE FITMENT
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> DIRECT FACTORY MANUFACTURING WARRANTY
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> DYNO-TESTED HORSEPOWER GAINS
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Bike className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> 43+ PREMIUM GLOBAL BRANDS
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> 10,000+ COMPATIBLE MOTORCYCLE PARTS
          </span>
          <span className="text-black/40 font-serif">•</span>
          {/* Duplicate loop */}
          <span className="flex items-center gap-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black shrink-0" /> PAN-INDIA 24HR EXPRESS DISPATCH
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> 100% GUARANTEED BIKE FITMENT
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> DIRECT FACTORY MANUFACTURING WARRANTY
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> DYNO-TESTED HORSEPOWER GAINS
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Bike className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> 43+ PREMIUM GLOBAL BRANDS
          </span>
          <span className="text-black/40 font-serif">•</span>
          <span className="flex items-center gap-3">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" /> 10,000+ COMPATIBLE MOTORCYCLE PARTS
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PREMIUM DARK THEME — UNIT 22 FACTORY COMBOS & PERFORMANCE BUNDLES        */}
      {/* ========================================================================= */}
      <section className="bg-[#050507] text-white py-16 border-b border-white/10 relative overflow-hidden">
        {/* Dark Section Edge-Fading Technical Grid */}
        <DarkGridOverlay />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          {/* Section Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
                <Tag className="w-4 h-4 text-primary" />
                <span>FACTORY BUNDLE DISCOUNTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                READY FOR THE ROAD. <span className="text-primary">FACTORY COMBOS.</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans pt-1">
                Save up to 15% on pre-configured, dyno-tested performance bundles & expedition packages designed specifically for your motorcycle.
              </p>
            </div>

            {/* Right Side Technical Highlight Box */}
            <div className="bg-[#111115] border border-white/10 p-4 max-w-sm hidden sm:block shrink-0">
              <span className="text-[10px] font-black text-primary tracking-widest uppercase block">
                THE UNIT 22 BUNDLE ADVANTAGE
              </span>
              <p className="text-xs font-bold text-white uppercase mt-1">
                DYNO-MATCHED KITS & SINGLE-CLICK FITMENT
              </p>
              <p className="text-[11px] text-white/60 mt-1 leading-snug font-sans">
                Every combo includes pre-selected compatible hardware, gaskets, and mounting brackets in a single box.
              </p>
            </div>
          </div>

          {/* 4 Feature Pillars (Subtle Blended Metallic Toolbar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#101014] border border-white/10 p-4 flex items-center gap-3.5 hover:border-white/30 transition-all duration-300">
              <div className="p-2.5 bg-white/[0.06] border border-white/10 text-white/90 shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-white/50 uppercase block">01 / DYNO MAPS</span>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide">Pre-Tuned Dyno Maps</h4>
                <p className="text-[11px] text-white/60 leading-snug">Maximized BHP & torque velocity</p>
              </div>
            </div>

            <div className="bg-[#101014] border border-white/10 p-4 flex items-center gap-3.5 hover:border-white/30 transition-all duration-300">
              <div className="p-2.5 bg-white/[0.06] border border-white/10 text-white/90 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-white/50 uppercase block">02 / FITMENT</span>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide">100% Bolt-On Ready</h4>
                <p className="text-[11px] text-white/60 leading-snug">Single box with all brackets & gaskets</p>
              </div>
            </div>

            <div className="bg-[#101014] border border-white/10 p-4 flex items-center gap-3.5 hover:border-white/30 transition-all duration-300">
              <div className="p-2.5 bg-white/[0.06] border border-white/10 text-white/90 shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-white/50 uppercase block">03 / DIRECT SAVINGS</span>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide">Save Up to 15%</h4>
                <p className="text-[11px] text-white/60 leading-snug">Direct factory combo bundle discounts</p>
              </div>
            </div>

            <div className="bg-[#101014] border border-white/10 p-4 flex items-center gap-3.5 hover:border-white/30 transition-all duration-300">
              <div className="p-2.5 bg-white/[0.06] border border-white/10 text-white/90 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-white/50 uppercase block">04 / WARRANTY</span>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide">Factory Warranty</h4>
                <p className="text-[11px] text-white/60 leading-snug">1 to 5-year replacement coverage</p>
              </div>
            </div>
          </div>

          {/* Featured Combos Cards Grid (Displaying All Featured Combo Packages) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
            {COMBO_PACKAGES.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(item.link)}
                className="bg-[#08080b] border-0 p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-[0_0_20px_rgba(250,13,19,0.14),0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_0_48px_rgba(250,13,19,0.52),0_20px_40px_rgba(0,0,0,0.8)] hover:bg-[#0c0c11] transition-all duration-500 ease-out group cursor-pointer"
              >
                {/* Giant Watermark Background Number */}
                <span className="absolute bottom-2 right-4 text-8xl font-black text-white/[0.03] font-mono select-none pointer-events-none">
                  {item.number}
                </span>

                <div>
                  {/* Top Tag & Rating Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="bg-white/10 text-white font-extrabold text-[10px] px-2.5 py-1 uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                      <span>{item.badge}</span>
                    </span>

                    <div className="flex items-center gap-1.5 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-extrabold text-white">{item.rating}</span>
                      <span className="text-white/40 text-[11px]">({item.reviewsCount} Reviews)</span>
                    </div>
                  </div>

                  {/* Main Content Split (Left Image, Right Details) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                    
                    {/* Left Product Image Box — Borderless & Blended */}
                    <Link
                      href={item.link}
                      onClick={(e) => e.stopPropagation()}
                      className="block relative aspect-square bg-[#0c0c11] border-0 overflow-hidden p-4 group-hover:bg-[#0e0e14] transition-colors"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2.5 group-hover:scale-112 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                      />
                    </Link>

                    {/* Right Details Column */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest block">
                          {item.categoryTag}
                        </span>
                        <h3 className="text-lg font-black uppercase text-white tracking-tight leading-tight mt-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider mt-1">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Specs Bullet List */}
                      <div className="space-y-2 border-t border-white/[0.06] pt-3">
                        {item.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2 text-xs text-white/80 font-sans">
                            <Check className="w-3.5 h-3.5 text-white/50 shrink-0 mt-0.5" />
                            <span className="leading-snug">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Footer Row (Pricing & CTA) */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-white/40 line-through block font-mono">
                      Reg. {item.originalPrice}
                    </span>
                    <span className="text-2xl font-black text-white tracking-tight font-sans">
                      {item.price}
                    </span>
                  </div>

                  <Button
                    variant="secondary"
                    size="md"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                    className="h-10 px-5 text-xs font-extrabold tracking-wider bg-white text-black hover:bg-primary hover:text-black border-0 transition-all duration-300 shrink-0 group shadow-md"
                  >
                    <Link href={item.link} className="flex items-center justify-center gap-2">
                      <span>EXPLORE COMBO BUNDLE</span>
                      <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* AUXILIARY LIGHTS SLIDER SECTION */}
      <AuxiliaryLightsSlider />

      {/* HELMET COLLECTION DARK SLIDER SECTION */}
      <HelmetDarkSlider />

      {/* WHITE SECTION DIVIDER WITH MEANINGFUL LINE */}
      <div className="bg-[#f7f6f2] border-t border-b border-[#edebe4] py-6 sm:py-10 overflow-hidden">
        <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-center gap-2 sm:gap-6">
          <div className="h-px bg-[#d8d8da] flex-1 min-w-[12px]" />
          <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] min-[380px]:text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider sm:tracking-widest text-foreground/70 shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary shrink-0" />
            <span>PRECISION ENGINEERING & IN-HOUSE MANUFACTURING</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary shrink-0" />
          </div>
          <div className="h-px bg-[#d8d8da] flex-1 min-w-[12px]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PREMIUM DARK THEME — THE UNIT 22 ENGINEERING STANDARD                     */}
      {/* ========================================================================= */}
      <section className="bg-[#09090b] text-white py-16 sm:py-20 border-t border-b border-white/10 relative overflow-hidden">
        {/* Dark Section Edge-Fading Technical Grid */}
        <DarkGridOverlay />
        {/* Ambient Red Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Section Header - Center Aligned Single Line Title */}
          <div className="text-center max-w-5xl mx-auto space-y-3 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-xs font-extrabold px-3.5 py-1 uppercase tracking-widest border border-primary/40">
              <Cpu className="w-3.5 h-3.5 text-primary" /> IN-HOUSE MANUFACTURING & DYNO TESTED
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white sm:whitespace-nowrap leading-tight">
              THE UNIT 22 <span className="text-primary">ENGINEERING STANDARD</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              We design, prototype, and manufacture performance exhausts, brake kits, and luggage systems under one roof with zero middleman compromise.
            </p>
          </div>

          {/* 3 Dark Engineering Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Feature 1 */}
            <div className="bg-[#0c0c10] border-0 p-6 space-y-4 shadow-[0_0_20px_rgba(250,13,19,0.14),0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_0_48px_rgba(250,13,19,0.52),0_20px_40px_rgba(0,0,0,0.8)] hover:bg-[#0e0e14] transition-all duration-500 ease-out group">
              <div className="w-12 h-12 bg-white/[0.05] border-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-wide">
                0.01mm Precision CNC Machining
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Crafted from aerospace-grade 6061-T6 aluminum and 304 stainless steel for flawless tolerances and structural endurance on track.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0c0c10] border-0 p-6 space-y-4 shadow-[0_0_20px_rgba(250,13,19,0.14),0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_0_48px_rgba(250,13,19,0.52),0_20px_40px_rgba(0,0,0,0.8)] hover:bg-[#0e0e14] transition-all duration-500 ease-out group">
              <div className="w-12 h-12 bg-white/[0.05] border-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-wide">
                Custom Dyno Map Verification
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Every exhaust system and intake stack is dyno-benchmarked to maximize gas flow velocity, engine torque, and deep exhaust resonance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0c0c10] border-0 p-6 space-y-4 shadow-[0_0_20px_rgba(250,13,19,0.14),0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_0_48px_rgba(250,13,19,0.52),0_20px_40px_rgba(0,0,0,0.8)] hover:bg-[#0e0e14] transition-all duration-500 ease-out group">
              <div className="w-12 h-12 bg-white/[0.05] border-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-wide">
                Rally & Track Proven
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Tested across national motorcycle championships and Himalayan high-altitude pass expeditions before entering serial production.
              </p>
            </div>

          </div>

          {/* Live Metric Stats Bar with IntersectionObserver Count-Up Animations */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/10 text-center font-mono">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-primary">
                <AnimatedCounter target={43} suffix="+" />
              </span>
              <p className="text-[11px] text-white/60 uppercase tracking-widest font-sans">Global Brands</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-white">
                <AnimatedCounter target={10000} suffix="+" />
              </span>
              <p className="text-[11px] text-white/60 uppercase tracking-widest font-sans">Verified Parts</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-primary">
                <AnimatedCounter target={100} suffix="%" />
              </span>
              <p className="text-[11px] text-white/60 uppercase tracking-widest font-sans">Fitment Guarantee</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-white">
                <AnimatedCounter target={24} suffix=" HR" />
              </span>
              <p className="text-[11px] text-white/60 uppercase tracking-widest font-sans">Factory Dispatch</p>
            </div>
          </div>

        </div>
      </section>





      {/* ========================================================================= */}
      {/* LIGHT SECTION: EASY STEPS PERFORMANCE UPGRADE PROCESS (#f7f6f2 Bg)        */}
      {/* ========================================================================= */}
      <section className="bg-[#f7f6f2] py-12 sm:py-16 border-b border-[#edebe4] relative overflow-hidden">
        {/* Light Section Edge-Fading Technical Grid */}
        <LightGridOverlay />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-8 sm:space-y-10">
          
          {/* Section Header Row (Center Aligned) */}
          <div className="text-center max-w-3xl mx-auto space-y-2 pb-6 border-b border-[#eaeaea]">
            <div className="inline-flex items-center justify-center gap-2 text-xs font-black text-primary tracking-widest uppercase">
              <Bike className="w-4 h-4 text-primary" />
              <span>DIRECT FACTORY ORDER & FITMENT WORKFLOW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground font-sans">
              <span className="text-primary">EASY STEPS</span> PERFORMANCE UPGRADE
            </h2>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans max-w-xl mx-auto">
              From bike selection to factory crafting, express dispatch, and guaranteed fitment.
            </p>
          </div>

          {/* 4 Steps Centered Unboxed Timeline Flow */}
          <div className="relative pt-2">
            {/* Desktop Connecting Line Vertically Centered in Step Circles */}
            <div className="hidden lg:block absolute top-[30px] left-[12.5%] right-[12.5%] h-px bg-[#d8d6cc] z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {UPGRADE_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center space-y-3 group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 relative px-3 py-2"
                >
                  {/* Top Node Indicator & Step Badge */}
                  <div className="flex flex-col items-center space-y-1 relative z-10">
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-primary group-hover:border-black transition-all duration-300">
                      <span className="text-[10px] font-mono font-black text-black group-hover:text-white transition-colors">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Step Content (Center Aligned) */}
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="text-base sm:text-lg font-black uppercase text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/70 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Centered Technical Highlight Label */}
                  <div className="pt-2">
                    <span className="inline-block text-[10px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 uppercase tracking-wider group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                      {item.badgeLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Centered CTA Button Below Process Steps */}
            <div className="pt-8 flex justify-center">
              <Button
                variant="primary"
                size="md"
                asChild
                className="h-12 px-8 text-xs sm:text-sm font-black tracking-wider text-white shadow-md border-0 bg-primary hover:bg-black hover:text-white transition-all duration-300 active:scale-95 group"
              >
                <Link href="/c/brakes" className="flex items-center justify-center gap-2 text-white font-black">
                  <span className="text-white font-black">START YOUR BIKE UPGRADE</span>
                  <ArrowRight className="w-4 h-4 text-white font-black group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* PREMIUM DARK THEME — THE UNIT 22 ADVANTAGE (TRUST MATRIX)                 */}
      {/* ========================================================================= */}
      <section className="bg-[#111113] text-white py-16 border-b border-white/10 relative overflow-hidden">
        {/* Dark Section Edge-Fading Technical Grid */}
        <DarkGridOverlay />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>THE UNIT 22 ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              WHY RIDERS TRUST UNIT 22
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              We stand behind every component we manufacture and distribute with complete transparent guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_FEATURES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#18181b] border-0 p-6 space-y-3 shadow-[0_0_20px_rgba(250,13,19,0.14),0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_0_48px_rgba(250,13,19,0.52),0_20px_40px_rgba(0,0,0,0.8)] hover:bg-[#1c1c20] transition-all duration-500 ease-out"
                >
                  <div className="p-3 bg-primary/10 border border-primary/30 w-fit text-primary">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-black uppercase text-white tracking-wide pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* EYE-CATCHY PREMIUM CONTACT SECTION (WHITE THEME, ZERO BORDERS) */}
      <ContactSection />

    </div>
  );
}
