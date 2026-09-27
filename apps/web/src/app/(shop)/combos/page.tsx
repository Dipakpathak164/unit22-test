'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { COMBO_PACKAGES, ComboPackage } from '@monorepo/mocks';
import { LightGridOverlay, DarkGridOverlay } from '@/components/common/SectionGridOverlay';
import { Button } from '@monorepo/ui';
import {
  Tag,
  Star,
  Check,
  ArrowRight,
  Gauge,
  ShieldCheck,
  Trophy,
  Flame,
  Zap,
  ChevronRight,
  PackageCheck,
} from 'lucide-react';

export default function CombosListingPage() {
  const router = useRouter();

  return (
    <div className="bg-[#050507] text-white min-h-screen relative overflow-hidden font-sans">
      {/* Dark Section Edge-Fading Technical Grid */}
      <DarkGridOverlay />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-white/50 overflow-x-auto pb-1">
          <Link href="/" className="hover:text-primary transition-colors uppercase">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <span className="text-white font-bold uppercase tracking-wider">COMBO DEALS</span>
        </nav>

        {/* Page Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 border border-primary/30">
              <Flame className="w-4 h-4 text-primary fill-primary" />
              <span>DIRECT FACTORY SAVINGS & BUNDLE DISCOUNTS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              READY FOR THE ROAD. <span className="text-primary">FACTORY COMBOS.</span>
            </h1>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans pt-1">
              Save up to 15% on pre-configured, dyno-tested performance bundles, track braking kits, and expedition luggage packages designed specifically for your motorcycle.
            </p>
          </div>

          {/* Right Side Technical Highlight Box */}
          <div className="bg-[#111115] border border-white/10 p-4 max-w-sm shrink-0">
            <span className="text-[10px] font-black text-primary tracking-widest uppercase block">
              THE UNIT 22 BUNDLE ADVANTAGE
            </span>
            <p className="text-xs font-bold text-white uppercase mt-1">
              DYNO-MATCHED KITS & SINGLE-CLICK FITMENT
            </p>
            <p className="text-[11px] text-white/60 mt-1 leading-snug font-sans">
              Every combo includes pre-selected compatible hardware, gaskets, and mounting brackets in a single express crate.
            </p>
          </div>
        </div>

        {/* 4 Technical Feature Pillars */}
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

        {/* Combos Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {COMBO_PACKAGES.map((item: ComboPackage) => (
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
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    <span>{item.badge}</span>
                  </span>

                  <div className="flex items-center gap-1.5 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-extrabold text-white">{item.rating}</span>
                    <span className="text-white/40 text-[11px]">({item.reviewsCount} Reviews)</span>
                  </div>
                </div>

                {/* Main Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                  {/* Left Image Box */}
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

              {/* Bottom Footer Row */}
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
    </div>
  );
}
