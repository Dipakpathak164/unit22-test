'use client';

import React from 'react';
import Link from 'next/link';
import { useCartSummary } from '@/features/cart/hooks/useCartSummary';
import { CartItemCard } from '@/features/cart/components/CartItemCard';
import { CartSummaryFooter } from '@/features/cart/components/CartSummaryFooter';
import { EmptyCartView } from '@/features/cart/components/EmptyCartView';
import { CheckoutStepper } from '@/features/cart/components/CheckoutStepper';
import { LightGridOverlay } from '@/components/common/SectionGridOverlay';
import { ProductCard } from '@/components/product/ProductCard';
import { MOCK_PRODUCTS } from '@monorepo/mocks';
import { formatPaise } from '@monorepo/api';
import { Button } from '@monorepo/ui';
import {
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MessageSquare,
  Headphones,
} from 'lucide-react';

export default function DedicatedCartPage() {
  const {
    items,
    totalItemsCount,
    subtotalPaise,
    shippingCostPaise,
    grandTotalPaise,
    handleRemoveItem,
    handleUpdateQuantity,
  } = useCartSummary();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const recommendedProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#f7f6f2] text-foreground min-h-screen relative font-sans pb-48 lg:pb-16">
      <LightGridOverlay />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
          <span className="text-foreground font-bold uppercase">SHOPPING CART</span>
        </nav>

        {/* Page Title */}
        <div className="border-b border-[#edebe4] pb-4 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              YOUR ORDER SUMMARY
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-foreground tracking-tight flex items-center gap-2.5">
              <ShoppingBag className="w-7 h-7 text-primary" />
              SHOPPING CART ({totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'})
            </h1>
          </div>

          <Link href="/c/brakes" className="hidden sm:inline-block text-xs font-bold text-primary hover:underline">
            &larr; CONTINUE SHOPPING
          </Link>
        </div>

        {/* STEPPER PROGRESS BAR (Step 1 Active, Zero Top Margin) */}
        <div className="!mt-2">
          <CheckoutStepper currentStep={1} />
        </div>

        {items.length === 0 ? (
          <div className="bg-[#ffffff] border border-[#edebe4] p-8 shadow-sm">
            <EmptyCartView />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (7 cols on desktop): Items List & Guarantees */}
            <div className="lg:col-span-7 space-y-6">
              {/* Items List */}
              <div className="bg-[#ffffff] border border-[#edebe4] p-4 sm:p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground/70 border-b border-[#edebe4] pb-3">
                  SELECTED MOTORCYCLE PARTS ({items.length})
                </h3>

                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      variant="detailed"
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              {/* Trust & Guarantee Strip */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs bg-[#ffffff] border border-[#edebe4] p-4 shadow-sm">
                <div className="space-y-1">
                  <ShieldCheck className="w-5 h-5 text-primary mx-auto" />
                  <span className="font-extrabold text-foreground block text-[11px]">100% Dyno Tested</span>
                  <span className="text-[10px] text-foreground/60 font-mono">Guaranteed Fitment</span>
                </div>
                <div className="space-y-1">
                  <Truck className="w-5 h-5 text-primary mx-auto" />
                  <span className="font-extrabold text-foreground block text-[11px]">Pan-India Express</span>
                  <span className="text-[10px] text-foreground/60 font-mono">2-4 Days Shipping</span>
                </div>
                <div className="space-y-1">
                  <RotateCcw className="w-5 h-5 text-primary mx-auto" />
                  <span className="font-extrabold text-foreground block text-[11px]">7-Day Easy Return</span>
                  <span className="text-[10px] text-foreground/60 font-mono">Hassle-Free Exchange</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols on desktop): Summary Footer */}
            <div className="lg:col-span-5 hidden lg:block sticky top-24">
              <div className="bg-[#ffffff] border border-[#edebe4] shadow-md">
                <CartSummaryFooter
                  subtotalPaise={subtotalPaise}
                  shippingCostPaise={shippingCostPaise}
                  grandTotalPaise={grandTotalPaise}
                />
              </div>
            </div>
          </div>
        )}

        {/* Recommended Combo Cross-sells */}
        <div className="space-y-6 pt-6 border-t border-[#edebe4]">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">RECOMMENDED FOR YOUR BIKE</span>
            <h2 className="text-2xl font-black uppercase text-foreground">Riders Also Purchased</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Trusting White Background & Social Media Platforms Section */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-6 sm:p-8 shadow-sm space-y-6 mt-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              OFFICIAL UNIT 22 RIDER SUPPORT & COMMUNITY
            </span>
            <h3 className="text-lg sm:text-xl font-black uppercase text-foreground">
              Dyno Testing, Tech Drops & Rally Builds
            </h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Join thousands of pro riders across India. Follow our official channels for real dyno test videos, fitment guides, and new accessory launches.
            </p>
          </div>

          {/* Social Media Platform Icons Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#f7f6f2] hover:bg-primary hover:text-white text-foreground text-xs font-bold transition-all border border-[#edebe4] rounded-lg group"
            >
              <Instagram className="w-4 h-4 text-primary group-hover:text-white" />
              <span>Instagram</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#f7f6f2] hover:bg-primary hover:text-white text-foreground text-xs font-bold transition-all border border-[#edebe4] rounded-lg group"
            >
              <Youtube className="w-4 h-4 text-primary group-hover:text-white" />
              <span>YouTube</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#f7f6f2] hover:bg-primary hover:text-white text-foreground text-xs font-bold transition-all border border-[#edebe4] rounded-lg group"
            >
              <Facebook className="w-4 h-4 text-primary group-hover:text-white" />
              <span>Facebook</span>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#f7f6f2] hover:bg-primary hover:text-white text-foreground text-xs font-bold transition-all border border-[#edebe4] rounded-lg group"
            >
              <Twitter className="w-4 h-4 text-primary group-hover:text-white" />
              <span>X (Twitter)</span>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-xs font-bold transition-all rounded-lg shadow-sm hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Support</span>
            </a>
          </div>

          <div className="pt-4 border-t border-[#edebe4] text-center text-[11px] text-foreground/50 font-mono">
            &copy; {new Date().getFullYear()} Unit22 Bike Accessories (Sales | Manufacturing). Pan-India Express Shipping to 26,000+ Pincodes.
          </div>
        </div>
      </div>

      {/* MOBILE STICKY PROCEED CHECKOUT BAR (Visible on Mobile Only, Smooth 700ms Glide Entrance) */}
      {items.length > 0 && (
        <div
          className={`lg:hidden fixed bottom-[68px] inset-x-2 z-30 bg-white/95 backdrop-blur-md text-foreground p-3 border border-black/15 shadow-[0_12px_35px_rgba(0,0,0,0.18)] rounded-xl flex items-center justify-between gap-3 font-sans transition-all duration-700 ease-out transform ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
        >
          <div className="leading-tight">
            <span className="text-[10px] text-foreground/70 font-mono font-extrabold uppercase block">
              TOTAL PAYABLE
            </span>
            <span className="text-lg font-black text-primary">
              {formatPaise(grandTotalPaise)}
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            asChild
            className="h-11 px-5 text-xs font-black uppercase tracking-wider bg-primary hover:bg-black text-white rounded-lg border-0 gap-2 flex items-center shadow-md active:scale-95 transition-transform"
          >
            <Link href="/checkout">
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

