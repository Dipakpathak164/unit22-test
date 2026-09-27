'use client';

import React from 'react';
import { CustomerSupportVector } from './CustomerSupportVector';
import { LightGridOverlay } from '@/components/common/SectionGridOverlay';
import {
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export function ContactSection() {
  return (
    <section className="bg-[#f7f6f2] py-6 sm:py-16 relative overflow-hidden">
      {/* Light Section Edge-Fading Technical Grid */}
      <LightGridOverlay />
      {/* Background Soft Radial Glow — No Borders */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-4 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-black px-3.5 py-1 uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>FACTORY ADVICE & RIDER CONSULTATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-foreground tracking-tight font-sans">
            SPEAK WITH OUR <span className="text-primary">MASTER MECHANICS</span>
          </h2>
          <p className="text-xs sm:text-base text-foreground/75 leading-relaxed font-sans max-w-2xl mx-auto">
            Have fitment questions, custom exhaust inquiries, or need expert motorcycle setup guidance? Connect directly with our workshop engineers.
          </p>
        </div>

        {/* 1. EYE-CATCHY SUPPORT REPRESENTATIVE VECTOR HERO CARD (TRANSPARENT BACKGROUND & SMOOTH ANIMATIONS) */}
        <div className="bg-transparent p-0 sm:p-4 transition-all duration-500 rounded-none border-0 overflow-hidden relative group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Transparent Vector Illustration of Support Representative with Headset */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              {/* Vector Image Component — Pure SVG, Transparent Background, 100% vector graphics */}
              <CustomerSupportVector />
            </div>

            {/* Right Column: Key Support Commitments & Quick Action CTAs */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <span className="bg-primary/10 text-primary font-mono font-bold text-[10px] px-2.5 py-0.5 uppercase tracking-widest inline-block">
                  PERSONALIZED RIDER DESK
                </span>
                <h3 className="text-xl sm:text-3xl font-black uppercase text-foreground tracking-tight leading-tight">
                  1-ON-1 CALL & WHATSAPP <span className="text-primary">ASSISTANCE</span>
                </h3>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  Our dedicated motorcycle specialists are on call to verify your exact bike model, sub-variant year, and part fitment specs before you order.
                </p>
              </div>

              {/* 3 Quick Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-[#f7f6f2] p-2.5 sm:p-3.5 border-0 space-y-0.5 sm:space-y-1 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-black">
                    <ShieldCheck className="w-4 h-4" />
                    <span>FITMENT</span>
                  </div>
                  <p className="text-[11px] text-foreground/70 font-medium">100% Fitment Verification</p>
                </div>

                <div className="bg-[#f7f6f2] p-2.5 sm:p-3.5 border-0 space-y-0.5 sm:space-y-1 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black">
                    <MessageSquare className="w-4 h-4" />
                    <span>WHATSAPP</span>
                  </div>
                  <p className="text-[11px] text-foreground/70 font-medium">Video/Photo Tech Help</p>
                </div>

                <div className="bg-[#f7f6f2] p-2.5 sm:p-3.5 border-0 space-y-0.5 sm:space-y-1 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-black">
                    <Zap className="w-4 h-4" />
                    <span>FAST CALL</span>
                  </div>
                  <p className="text-[11px] text-foreground/70 font-medium">Instant Mechanic Callback</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-0.5 sm:pt-1">
                <a
                  href="tel:+919876543210"
                  className="px-5 py-3 sm:px-6 sm:py-3.5 bg-black hover:bg-primary text-white hover:text-black font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-md border-0 group/btn"
                >
                  <Phone className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span>CALL +91 98765 43210</span>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 sm:px-6 sm:py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-md border-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP QUICK CHAT</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
