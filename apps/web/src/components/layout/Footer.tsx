'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DarkGridOverlay } from '@/components/common/SectionGridOverlay';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MessageSquare,
} from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const isCartPage = pathname === '/cart';

  return (
    <footer
      className={`relative overflow-hidden bg-[#000000] text-[#ffffff] border-t border-[#d8d8da]/20 mt-auto ${
        isCartPage ? 'hidden lg:block' : ''
      }`}
    >
      {/* Edge-fading subtle grid overlay */}
      <DarkGridOverlay />

      {/* Value Proposition Bar */}
      <div className="relative z-10 border-b border-[#ffffff]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Truck className="w-6 h-6 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Pan-India Express Shipping</h4>
            <p className="text-[11px] text-[#ffffff]/70">Fast delivery to 26,000+ pincodes across India</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider">100% Guaranteed Fitment</h4>
            <p className="text-[11px] text-[#ffffff]/70">Verified compatibility per motorcycle make/model</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <RotateCcw className="w-6 h-6 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Easy Returns & Exchanges</h4>
            <p className="text-[11px] text-[#ffffff]/70">7-day hassle-free return policy</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Headphones className="w-6 h-6 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Expert Rider Support</h4>
            <p className="text-[11px] text-[#ffffff]/70">Support on WhatsApp & Phone (Mon-Sat)</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Image
              src="/logo.png"
              alt="Unit22 Logo"
              width={200}
              height={60}
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>
          <p className="text-[#ffffff]/70 leading-relaxed text-[11px]">
            India&apos;s leading manufacturer & seller of fitment-first motorcycle and bike accessories, brake systems, performance exhausts, and touring gear.
          </p>
          <div className="font-mono text-[11px] text-[#ffffff]/60">
            Unit 22 Precision Engineering & Performance Gear
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h5 className="font-bold text-sm uppercase tracking-wider text-primary border-b border-[#ffffff]/10 pb-1">
            Shop Parts
          </h5>
          <ul className="space-y-2 text-[#ffffff]/80">
            <li><Link href="/brands" className="hover:text-primary transition-colors">All 43+ Brands</Link></li>
            <li><Link href="/c/brakes" className="hover:text-primary transition-colors">Brake Pads & Rotors</Link></li>
            <li><Link href="/c/exhaust" className="hover:text-primary transition-colors">Performance Exhausts</Link></li>
            <li><Link href="/combos" className="hover:text-primary transition-colors">Combo Packages</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Service */}
        <div className="space-y-3">
          <h5 className="font-bold text-sm uppercase tracking-wider text-primary border-b border-[#ffffff]/10 pb-1">
            Customer Support
          </h5>
          <ul className="space-y-2 text-[#ffffff]/80">
            <li><Link href="/pages/faq" className="hover:text-primary transition-colors">FAQs & Help</Link></li>
            <li><Link href="/pages/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link href="/pages/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
            <li><Link href="/pages/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Col 4: Social Media Platforms & Icons */}
        <div className="space-y-3">
          <h5 className="font-bold text-sm uppercase tracking-wider text-primary border-b border-[#ffffff]/10 pb-1">
            Official Social Media
          </h5>
          <p className="text-[#ffffff]/70 text-[11px]">
            Follow Unit 22 on official social platforms for dyno test videos, new product drops & rally builds.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#16161a] text-white hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center group"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#16161a] text-white hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center group"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#16161a] text-white hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center group"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#16161a] text-white hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center group"
              title="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-[#16161a] text-white hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center group"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative z-10 border-t border-[#ffffff]/10 py-6 text-center text-[11px] text-[#ffffff]/50">
        &copy; {new Date().getFullYear()} Unit22 Bike Accessories (Sales | Manufacturing). All rights reserved.
      </div>
    </footer>
  );
}
