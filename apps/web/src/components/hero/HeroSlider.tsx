'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@monorepo/ui';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  accentTag: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-exhaust',
    title: 'TITANIUM PERFORMANCE EXHAUSTS & HEADERS',
    subtitle: 'Crafted in-house for optimum gas flow, deep exhaust note, and weight reduction.',
    badge: 'DIRECT FROM MANUFACTURING',
    ctaText: 'EXPLORE EXHAUSTS',
    ctaLink: '/c/exhaust',
    image: '/images/hero_banner_exhaust.png',
    accentTag: 'Custom Dyno Tested',
  },
  {
    id: 'slide-brakes',
    title: 'PRECISION CERAMIC BRAKE DISCS & PADS',
    subtitle: 'Engineered for extreme thermal resistance and instant stopping power on track and highway.',
    badge: 'UNIT22 RACING SPEC',
    ctaText: 'SHOP BRAKE SYSTEMS',
    ctaLink: '/c/brakes',
    image: '/images/hero_banner_brakes.png',
    accentTag: '100% Guaranteed Fitment',
  },
  {
    id: 'slide-touring',
    title: 'EXPEDITION-READY ALUMINUM PANNIERS & GEAR',
    subtitle: 'Heavy-duty luggage, crash guards, and auxiliary lighting for long-distance touring riders.',
    badge: 'PAN-INDIA EXPEDITION',
    ctaText: 'DISCOVER TOURING GEAR',
    ctaLink: '/c/luggage',
    image: '/images/hero_banner_touring.png',
    accentTag: 'Weatherproof & Lockable',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#000000] text-white shadow-2xl border-b border-[#ffffff]/10"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slide Images & Overlays Container with comfortable height */}
      <div className="relative h-[520px] sm:h-[600px] md:h-[660px] w-full overflow-hidden">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Ken Burns Zoom Effect */}
              <div className="absolute inset-0 bg-black">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Vignette Overlays for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              </div>

              {/* Slide Content Box with bottom padding to avoid control overlap */}
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pb-24 pt-8">
                <div
                  className={`max-w-xl space-y-5 transition-all duration-700 delay-150 ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-primary text-white text-xs font-black px-3 py-1 uppercase tracking-widest border border-primary shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-black">{slide.badge}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#eae7e1] leading-tight font-sans drop-shadow-sm">
                    {slide.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-[#d8d5ce] text-sm sm:text-base leading-relaxed font-medium max-w-lg drop-shadow">
                    {slide.subtitle}
                  </p>

                  {/* Accent Tag */}
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c5c2bc] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>{slide.accentTag}</span>
                  </div>

                  {/* CTAs Responsive Row / Column */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      asChild
                      className="h-11 sm:h-10 px-4 text-xs font-black tracking-wider border-2 border-primary bg-primary hover:bg-primary-hover hover:border-primary-hover shadow-lg w-full sm:w-auto text-white flex items-center justify-center shrink-0"
                    >
                      <Link href={slide.ctaLink} className="flex items-center justify-center gap-2 text-white font-black">
                        <span className="text-white font-black">{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4 text-white font-black group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-11 sm:h-10 px-4 text-xs font-extrabold tracking-wider border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg w-full sm:w-auto flex items-center justify-center shrink-0"
                    >
                      <Link href="/brands" className="flex items-center justify-center gap-2">
                        <span>Browse All 43+ Brands</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Bar at Bottom with Clear Gap */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Slide Numbers & Dot Indicators */}
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/20">
            <span className="font-mono text-xs font-extrabold tracking-widest text-white">
              0{currentSlide + 1} <span className="text-white/40">/ 0{SLIDES.length}</span>
            </span>

            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all duration-300 rounded-none focus-visible:ring-2 focus-visible:ring-white ${
                    idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 p-1">
            <button
              onClick={prevSlide}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              aria-label={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-primary" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={nextSlide}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animated Slide Progress Bar */}
        {isPlaying && (
          <div className="w-full bg-white/10 h-1 mt-3 overflow-hidden">
            <div
              key={currentSlide}
              className="bg-primary h-full"
              style={{
                animation: 'progress 5500ms linear',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
