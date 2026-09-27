'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { components, formatPaise } from '@monorepo/api';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { addToCart } from '@/features/cart/slice';
import { Button, Badge } from '@monorepo/ui';
import { CheckCircle, XCircle, Star, ShieldCheck, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: components['schemas']['Product'];
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedBike = useAppSelector((state) => state.fitment.selectedBike);
  const [imgSrc, setImgSrc] = useState<string>(
    product.images && product.images.length > 0 ? product.images[0] : '/images/hero_banner_brakes.png'
  );

  // Determine fitment status if a bike is selected
  const fitsSelectedBike = selectedBike
    ? product.compatibleBikeIds.includes(selectedBike.id) || selectedBike.id.startsWith('custom-')
    : null;

  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    router.push(`/p/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-[#fefefe] border border-[#eaeaea] p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_45px_-12px_rgba(250,13,19,0.18)] transition-all duration-500 ease-out group relative cursor-pointer ${className || ''}`}
    >
      <div>
        {/* Fitment Status Badge Bar */}
        <div className="flex items-center justify-between gap-2 mb-3 min-h-[26px]">
          {selectedBike ? (
            fitsSelectedBike ? (
              <Badge variant="neutral" className="border-primary/40 text-[11px] font-bold text-black bg-primary/10">
                <CheckCircle className="w-3.5 h-3.5 text-primary" /> Fits {selectedBike.model}
              </Badge>
            ) : (
              <Badge variant="neutral" className="text-[11px] text-foreground/70 bg-secondary/10">
                <XCircle className="w-3.5 h-3.5 text-muted-foreground" /> Not for {selectedBike.model}
              </Badge>
            )
          ) : (
            <span className="text-[10px] text-foreground/60 uppercase tracking-wider font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-primary" /> Universal Fitment
            </span>
          )}

          {product.inStock ? (
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 font-bold uppercase tracking-wider border border-emerald-200">
              In Stock
            </span>
          ) : (
            <span className="text-[10px] bg-red-50 text-red-800 px-2 py-0.5 font-bold uppercase tracking-wider border border-red-200">
              Out of Stock
            </span>
          )}
        </div>

        {/* Product Image Container — Borderless, No Padding, Transparent BG */}
        <Link
          href={`/p/${product.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="block relative bg-transparent border-0 aspect-square mb-4 p-0 flex items-center justify-center overflow-hidden"
        >
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-0 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
            onError={() => {
              setImgSrc('/images/hero_banner_brakes.png');
            }}
          />
        </Link>

        {/* Brand & Product Title */}
        <div className="space-y-1">
          <span className="text-[11px] font-black text-primary uppercase tracking-widest block">
            {product.brand.name}
          </span>
          <Link
            href={`/p/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>
        </div>

        {/* Rating Display matching reference section */}
        <div className="flex items-center gap-1.5 mt-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-black text-foreground">{product.rating || 4.8}</span>
          <span className="text-[10px] text-foreground/50">({product.reviewCount || 12})</span>
        </div>

        {/* Spec Highlights Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mt-3.5 py-2 px-2.5 bg-[#f6f6f7] text-[11px] text-foreground/80 space-y-1 font-mono">
            {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-foreground/60">{key}:</span>
                <span className="font-bold text-foreground">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & Add To Cart Footer Row */}
      <div className="mt-auto pt-3 border-t border-[#eaeaea] flex items-center justify-between gap-2">
        <div>
          <span className="text-base sm:text-lg font-black text-foreground tracking-tight font-sans">
            {formatPaise(product.basePricePaise)}
          </span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          className="text-[11px] font-black tracking-wider bg-primary text-white hover:bg-black border-0 transition-colors duration-300 gap-1 uppercase shrink-0"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-white" />
          <span>ADD TO CART</span>
        </Button>
      </div>
    </div>
  );
}

