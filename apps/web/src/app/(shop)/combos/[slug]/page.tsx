'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getComboBySlug, COMBO_PACKAGES, ComboPackage } from '@monorepo/mocks';
import { useAppDispatch } from '@/lib/store/store';
import { addToCart } from '@/features/cart/slice';
import { LightGridOverlay, DarkGridOverlay } from '@/components/common/SectionGridOverlay';
import { Button } from '@monorepo/ui';
import { ProductZoomGallery } from '@/components/product/ProductZoomGallery';
import {
  Tag,
  Star,
  Check,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Flame,
  Award,
  Zap,
  Package,
} from 'lucide-react';

export default function ComboDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useAppDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [slug]);

  const combo = getComboBySlug(slug) || COMBO_PACKAGES[0];

  if (!combo) {
    return notFound();
  }

  // Gallery images array (main combo image + included products images)
  const comboImages = Array.from(
    new Set([combo.image, ...combo.includedProducts.map((p) => p.image).filter(Boolean)])
  );

  // Dynamically calculate savings amount
  const origPriceNum = parseInt(combo.originalPrice.replace(/[^\d]/g, ''), 10) || 0;
  const priceNum = parseInt(combo.price.replace(/[^\d]/g, ''), 10) || 0;
  const savingsAmount = origPriceNum - priceNum;
  const savingsTagText = savingsAmount > 0 ? `SAVE ₹${savingsAmount.toLocaleString('en-IN')}` : combo.badge;

  const handleAddToCart = () => {
    // Convert combo into product structure for Redux cart
    const pricePaise = priceNum * 100 || 4999900;
    dispatch(
      addToCart({
        product: {
          id: combo.id,
          name: combo.title,
          slug: combo.slug,
          basePricePaise: pricePaise,
          images: [combo.image],
          brand: {
            id: 'u22-factory',
            name: 'Unit 22 Factory',
            slug: 'unit22',
            productCount: COMBO_PACKAGES.length,
          },
          category: {
            id: 'c-combos',
            name: 'Combo Packages',
            slug: 'combos',
          },
          variants: [
            {
              id: `var-${combo.id}`,
              sku: `SKU-COMBO-${combo.id.toUpperCase()}`,
              name: 'Full Performance Kit',
              pricePaise: pricePaise,
              stock: 25,
              attributes: { bundle: combo.title },
            },
          ],
          compatibleBikeIds: [],
          specs: {
            Type: 'Factory Performance Combo',
            Includes: `${combo.includedProducts.length} Performance Parts`,
          },
          inStock: true,
          rating: combo.rating,
          reviewCount: combo.reviewsCount,
        },
      })
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="bg-[#050507] text-white min-h-screen relative overflow-hidden font-sans">
      {/* Dark Section Edge-Fading Technical Grid */}
      <DarkGridOverlay />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-10 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-white/50 overflow-x-auto pb-1">
          <Link href="/" className="hover:text-primary transition-colors uppercase">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <Link href="/combos" className="hover:text-primary transition-colors uppercase">
            COMBO DEALS
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <span className="text-white font-bold truncate max-w-xs uppercase tracking-wider">
            {combo.title}
          </span>
        </nav>

        {/* Main Product Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#0a0a0f] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Left Column: Combo Main Image & Visual Showcase with Zoom Gallery & Yellow Clip Tag */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative">
              {/* 3D Corner-Folded Fishtail Ribbon Clip Badge (Racing Yellow #facc15) */}
              <div className="absolute -left-2.5 top-3.5 z-20 flex items-center select-none pointer-events-none drop-shadow-md">
                {/* Under-card corner fold triangle shadow */}
                <div
                  className="absolute -bottom-2 left-0 w-2.5 h-2 bg-[#ca8a04]"
                  style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                />

                {/* Main Yellow Ribbon Body with Right Fishtail Cutout */}
                <div
                  className="bg-[#facc15] text-black font-black text-xs uppercase tracking-wider pl-3.5 pr-6 py-1 flex items-center gap-1 leading-none shadow-sm border-t border-b border-black/20"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 84% 50%, 100% 100%, 0 100%)' }}
                >
                  <span>{savingsTagText}</span>
                </div>
              </div>

              {/* Shared Product Zoom Gallery Component (with green badge cleanly stacked below yellow clip tag) */}
              <ProductZoomGallery images={comboImages} productName={combo.title} badgeClassName="top-12" />
            </div>

            {/* Quick Trust Badges Strip */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="flex flex-col items-center space-y-1 p-3 bg-white/[0.03] border border-white/10">
                <Truck className="w-4 h-4 text-primary" />
                <span className="font-bold text-[11px] text-white">Pan-India Express</span>
                <span className="text-[10px] text-white/50">24-Hour Dispatch</span>
              </div>
              <div className="flex flex-col items-center space-y-1 p-3 bg-white/[0.03] border border-white/10">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-bold text-[11px] text-white">100% Fitment Check</span>
                <span className="text-[10px] text-white/50">Single Crate Hardware</span>
              </div>
              <div className="flex flex-col items-center space-y-1 p-3 bg-white/[0.03] border border-white/10">
                <RotateCcw className="w-4 h-4 text-primary" />
                <span className="font-bold text-[11px] text-white">Factory Warranty</span>
                <span className="text-[10px] text-white/50">Direct Replacement</span>
              </div>
            </div>
          </div>

          {/* Right Column: Combo Details & Purchase CTA */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-primary" /> FACTORY BUNDLE #{combo.number}
                  </span>
                  <span className="text-xs font-mono text-white/50">SKU: COMBO-{combo.id.toUpperCase()}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                  {combo.title}
                </h1>
                <p className="text-xs sm:text-sm font-extrabold text-white/70 uppercase tracking-wider">
                  {combo.subtitle}
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 bg-white/5 text-amber-400 border border-white/10 px-2.5 py-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{combo.rating} / 5.0</span>
                </div>
                <span className="text-white/60 font-medium">
                  ({combo.reviewsCount} Verified Buyer Reviews)
                </span>
                <span className="text-white/20">|</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Pre-Tuned Dyno Bundle
                </span>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-[#111118] border border-white/10 flex items-baseline justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                    Combined Bundle Price
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {combo.price}
                    </span>
                    <span className="text-sm line-through text-white/40 font-mono">
                      Reg. {combo.originalPrice}
                    </span>
                    <span className="bg-primary text-white text-[11px] font-black uppercase px-2 py-0.5">
                      {combo.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50">Includes all components, hardware & GST taxes</p>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-emerald-400 block">In Stock & Ready</span>
                  <span className="text-[11px] text-white/50">Pan-India Express Delivery</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                {combo.description}
              </p>

              {/* Engineering Highlights */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-white/70">
                  KEY PERFORMANCE HIGHLIGHTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {combo.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/[0.02] p-2.5 border border-white/5">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-white/90 font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Combo to Cart CTA */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full h-13 text-xs font-black tracking-widest bg-primary hover:bg-white text-white hover:text-black border-0 shadow-xl transition-all duration-300 gap-2 uppercase cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToCart ? 'COMBO ADDED TO CART!' : 'ADD FULL COMBO TO CART'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Included Items Breakdown Section */}
        <div className="bg-[#0a0a0f] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
              WHAT&apos;S INCLUDED IN THIS <span className="text-primary">FACTORY COMBO</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {combo.includedProducts.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#101017] border border-white/10 p-4 flex items-center gap-4 hover:border-white/25 transition-colors"
              >
                <div className="relative w-20 h-20 bg-black/50 border border-white/10 shrink-0 p-2">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-xs sm:text-sm text-white truncate">{item.name}</h3>
                    <span className="text-xs font-mono text-white/50 shrink-0">{item.regularPrice}</span>
                  </div>
                  <p className="text-[11px] text-white/60 line-clamp-2 leading-snug">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
