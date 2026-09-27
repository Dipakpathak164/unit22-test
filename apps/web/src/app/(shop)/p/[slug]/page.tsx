'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_BIKES } from '@monorepo/mocks';
import { formatPaise } from '@monorepo/api';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { addToCart } from '@/features/cart/slice';
import { ProductZoomGallery } from '@/components/product/ProductZoomGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { LightGridOverlay } from '@/components/common/SectionGridOverlay';
import { Button, Badge } from '@monorepo/ui';
import {
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
  Lock,
  Headphones,
  Wrench,
  Award,
  Sparkles,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [slug]);

  // Find product by slug or default to first mock product
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const selectedBike = useAppSelector((state) => state.fitment.selectedBike);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants && product.variants.length > 0 ? product.variants[0].id : 'v-1'
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'fitment' | 'reviews'>('specs');

  const dispatch = useAppDispatch();

  if (!product) {
    return notFound();
  }

  // Determine fitment status if a bike is selected
  const fitsSelectedBike = selectedBike
    ? product.compatibleBikeIds.includes(selectedBike.id) || selectedBike.id.startsWith('custom-')
    : null;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, variantId: selectedVariantId, quantity }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setPincodeStatus(`Express Delivery Available to ${pincode} (2-4 Days)`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Pincode');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Unit22 Team, I am interested in ordering: ${product.name} (Price: ${formatPaise(
      product.basePricePaise
    )}). Could you confirm stock & fitment?`
  );

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#f7f6f2] text-foreground min-h-screen relative overflow-hidden">
      {/* Background Edge-Fading Technical Grid */}
      <LightGridOverlay />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-foreground/60 overflow-x-auto pb-1">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
          <Link href="/c/brakes" className="hover:text-primary transition-colors uppercase">
            {product.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
          <Link href={`/brands/${product.brand.slug}`} className="hover:text-primary transition-colors uppercase">
            {product.brand.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
          <span className="text-foreground font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Detail Fold (Left Image Zoom, Right Details & Purchase CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#ffffff] border border-[#edebe4] p-6 sm:p-8 lg:p-10 shadow-sm">
          {/* Left Column: Interactive Image Zoom Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <ProductZoomGallery images={product.images} productName={product.name} />

            {/* Quick Guarantees Strip below images */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#edebe4] text-center text-xs">
              <div className="flex flex-col items-center space-y-1 p-2 bg-[#f9f9f8] rounded-sm">
                <Truck className="w-4 h-4 text-primary" />
                <span className="font-bold text-[11px]">Pan-India Express</span>
                <span className="text-[10px] text-foreground/60">2-4 Days Delivery</span>
              </div>
              <div className="flex flex-col items-center space-y-1 p-2 bg-[#f9f9f8] rounded-sm">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-bold text-[11px]">Fitment Guarantee</span>
                <span className="text-[10px] text-foreground/60">100% Dyno Tested</span>
              </div>
              <div className="flex flex-col items-center space-y-1 p-2 bg-[#f9f9f8] rounded-sm">
                <RotateCcw className="w-4 h-4 text-primary" />
                <span className="font-bold text-[11px]">Easy 7-Day Return</span>
                <span className="text-[10px] text-foreground/60">Hassle-Free Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs, Pricing & CTA */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Fitment Banner Bar */}
              <div className="p-3 bg-[#f7f6f2] border border-[#edebe4] flex items-center justify-between gap-3 text-xs">
                {selectedBike ? (
                  fitsSelectedBike ? (
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Guaranteed Fitment for {selectedBike.make} {selectedBike.model} ({selectedBike.year})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-800 font-bold">
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Not compatible with {selectedBike.model}</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">Universal fitment for listed models (Select bike above for 100% check)</span>
                  </div>
                )}
                {product.inStock ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 shrink-0">
                    IN STOCK
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-[10px] font-black uppercase px-2 py-0.5 shrink-0">
                    OUT OF STOCK
                  </span>
                )}
              </div>

              {/* Brand & Title */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-primary uppercase tracking-widest">
                    {product.brand.name} OFFICIAL
                  </span>
                  <span className="text-xs font-mono text-foreground/50">SKU: U22-PART-{product.id.toUpperCase()}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating & Reviews Bar */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating || 4.8} / 5.0</span>
                </div>
                <span className="text-foreground/60 font-medium">
                  {product.reviewCount || 24} Verified Rider Reviews
                </span>
                <span className="text-foreground/30">|</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Dyno Certified
                </span>
              </div>

              {/* Pricing Display */}
              <div className="p-4 bg-[#faf9f6] border border-[#edebe4] flex items-baseline justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-foreground/60 uppercase tracking-wider block">
                    Special Offer Price
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                      {formatPaise(product.basePricePaise)}
                    </span>
                    <span className="text-sm line-through text-foreground/40 font-mono">
                      {formatPaise(Math.round(product.basePricePaise * 1.2))}
                    </span>
                    <span className="bg-primary text-white text-[11px] font-black uppercase px-2 py-0.5">
                      SAVE 17%
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground/60">Inclusive of all GST taxes & Pan-India insurance</p>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-emerald-700 block">Ready to Ship</span>
                  <span className="text-[11px] text-foreground/60">Dispatched in 24 Hours</span>
                </div>
              </div>

              {/* Key Highlights Quick Specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-foreground/70">
                    ENGINEERING SPECIFICATIONS
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="bg-[#f7f6f2] p-2.5 border border-[#edebe4] flex justify-between">
                        <span className="text-foreground/60">{key}:</span>
                        <span className="font-bold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Variant Selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/70 block mb-1.5">
                      QUANTITY
                    </label>
                    <div className="flex items-center border border-[#d8d8da] bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-2.5 hover:bg-black hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 text-center font-bold text-sm font-mono">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-2.5 hover:bg-black hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/70 block mb-1.5">
                      FITMENT SPECIFICATION
                    </label>
                    <div className="p-2.5 border border-primary bg-primary/5 text-xs font-bold text-foreground flex items-center justify-between">
                      <span>Standard Factory Spec ({product.brand.name})</span>
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* ADD TO CART CTA */}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className="h-13 text-xs font-black tracking-widest bg-primary hover:bg-black text-white hover:text-white border-0 shadow-lg transition-all duration-300 gap-2 uppercase"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>{addedToCart ? 'ADDED TO CART!' : 'ADD TO SHOPPING CART'}</span>
                  </Button>

                  {/* BUY NOW CTA */}
                  <Button
                    variant="primary"
                    size="lg"
                    asChild
                    className="h-13 text-xs font-black tracking-widest bg-black hover:bg-primary text-white hover:text-black border-0 shadow-lg transition-all duration-300 gap-2 uppercase"
                  >
                    <Link href="/checkout">
                      <Zap className="w-4 h-4" />
                      <span>EXPRESS BUY NOW</span>
                    </Link>
                  </Button>
                </div>

                {/* WHATSAPP DIRECT ASSISTANCE CTA */}
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 bg-[#25D366] hover:bg-[#1ebd56] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>1-ON-1 WHATSAPP TECH ASSISTANCE (INSTANT RESPONSE)</span>
                </a>
              </div>
            </div>

            {/* Pincode Express Shipping Calculator */}
            <div className="pt-4 border-t border-[#edebe4] space-y-2">
              <label className="text-xs font-bold text-foreground/80 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-primary" />
                <span>Check Express Delivery & Pincode Availability</span>
              </label>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 560001)"
                  className="flex-1 bg-[#f7f6f2] border border-[#d8d8da] px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p
                  className={`text-xs font-mono ${
                    pincodeStatus.includes('Available') ? 'text-emerald-700 font-bold' : 'text-red-600'
                  }`}
                >
                  {pincodeStatus}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section (Specs, Vehicle Fitment List, Reviews) */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex border-b border-[#edebe4] space-x-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors relative ${
                activeTab === 'specs' ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              TECHNICAL SPECIFICATIONS
            </button>
            <button
              onClick={() => setActiveTab('fitment')}
              className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors relative ${
                activeTab === 'fitment' ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              COMPATIBLE MOTORCYCLES ({MOCK_BIKES.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors relative ${
                activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              RIDER REVIEWS ({product.reviewCount || 24})
            </button>
          </div>

          {/* Specs Tab Content */}
          {activeTab === 'specs' && (
            <div className="space-y-4 text-xs text-foreground/80 leading-relaxed font-sans">
              <p>
                The <strong className="text-foreground">{product.name}</strong> manufactured by{' '}
                <strong className="text-foreground">{product.brand.name}</strong> is precision engineered for riders demanding maximum stopping power, heat dissipation, and long-term durability under intense track or expedition conditions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono">
                <div className="p-4 bg-[#f9f9f8] border border-[#edebe4] space-y-2">
                  <h4 className="font-sans font-bold text-foreground uppercase tracking-wider text-xs">
                    Factory Benchmark Stats
                  </h4>
                  <div className="flex justify-between border-b border-[#eaeaea] pb-1">
                    <span>Manufacturing Tolerance:</span>
                    <span className="font-bold text-foreground">0.01 mm CNC</span>
                  </div>
                  <div className="flex justify-between border-b border-[#eaeaea] pb-1">
                    <span>Thermal Fade Threshold:</span>
                    <span className="font-bold text-foreground">650°C Max Peak</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Standard:</span>
                    <span className="font-bold text-foreground">ISO 9001:2015</span>
                  </div>
                </div>

                <div className="p-4 bg-[#f9f9f8] border border-[#edebe4] space-y-2">
                  <h4 className="font-sans font-bold text-foreground uppercase tracking-wider text-xs">
                    Package Inclusions
                  </h4>
                  <div className="flex justify-between border-b border-[#eaeaea] pb-1">
                    <span>Items Included:</span>
                    <span className="font-bold text-foreground">Complete Pair Set</span>
                  </div>
                  <div className="flex justify-between border-b border-[#eaeaea] pb-1">
                    <span>Hardware:</span>
                    <span className="font-bold text-foreground">Stainless Shims Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Warranty Coverage:</span>
                    <span className="font-bold text-primary">12 Month Replacement</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fitment Tab Content */}
          {activeTab === 'fitment' && (
            <div className="space-y-4">
              <p className="text-xs text-foreground/75">
                This part has been 100% physical dyno-verified on the following motorcycle models:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
                {MOCK_BIKES.map((b) => (
                  <div key={b.id} className="p-3 bg-[#f9f9f8] border border-[#edebe4] flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-foreground block">{b.make} {b.model}</span>
                      <span className="text-[11px] text-foreground/60">Model Years: {b.year} - 2024</span>
                    </div>
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab Content */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#edebe4] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black font-sans text-foreground">4.8</span>
                  <div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-foreground/60">Based on 24 verified customer reviews</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs font-bold border-black">
                  WRITE A RIDER REVIEW
                </Button>
              </div>

              {/* Sample Review Cards */}
              <div className="space-y-3 font-sans">
                <div className="p-4 bg-[#f9f9f8] border border-[#edebe4] space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-extrabold text-foreground">Vikramaditya S. (Verified Rider)</span>
                    <span className="text-foreground/50">2 Days ago</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed pt-1">
                    Immediate upgrade in bite and lever feedback on my Interceptor 650. Zero squeal even after hard mountain riding. Excellent Unit22 service and fast delivery!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#edebe4] pb-3">
            <div>
              <span className="text-xs font-black text-primary uppercase tracking-widest block">RECOMMENDED BUNDLES</span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
                Riders Also Purchased
              </h2>
            </div>
            <Link href="/c/brakes" className="text-xs font-bold text-primary hover:underline">
              VIEW ALL PARTS &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
