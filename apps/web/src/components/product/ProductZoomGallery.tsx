'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { ZoomIn, Sparkles, Eye, ShieldCheck, Check } from 'lucide-react';

interface ProductZoomGalleryProps {
  images: string[];
  productName: string;
  badgeClassName?: string;
  showVerifiedBadge?: boolean;
}

export function ProductZoomGallery({
  images,
  productName,
  badgeClassName,
  showVerifiedBadge = true,
}: ProductZoomGalleryProps) {
  const fallbackImages = images && images.length > 0 ? images : ['/images/hero_banner_brakes.png'];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imgErrorMap, setImgErrorMap] = useState<Record<number, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const currentImageSrc = imgErrorMap[selectedImageIndex]
    ? '/images/hero_banner_brakes.png'
    : fallbackImages[selectedImageIndex] || '/images/hero_banner_brakes.png';

  return (
    <div className="space-y-4">
      {/* Main Image Container with Interactive Zoom */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-square w-full bg-[#fefefe] border border-[#e5e5e7] overflow-hidden cursor-crosshair group rounded-sm shadow-sm"
      >
        {/* Main Image */}
        <Image
          src={currentImageSrc}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-contain p-6 sm:p-8 transition-transform duration-200 ease-out"
          style={{
            transform: isZoomed ? 'scale(2.4)' : 'scale(1)',
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          onError={() => {
            setImgErrorMap((prev) => ({ ...prev, [selectedImageIndex]: true }));
          }}
        />

        {/* Hover Hint Overlay Badge */}
        <div
          className={`absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 flex items-center gap-1.5 transition-opacity duration-300 pointer-events-none z-10 ${
            isZoomed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ZoomIn className="w-3.5 h-3.5 text-primary" />
          <span className="uppercase tracking-wider">Hover to Zoom</span>
        </div>

        {/* Active Zoom Magnifier Lens Badge */}
        {isZoomed && (
          <div className="absolute top-3 right-3 bg-primary text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 pointer-events-none z-10 shadow-md">
            <Sparkles className="w-3 h-3 fill-black" />
            <span>2.4X Ultra HD View</span>
          </div>
        )}

        {/* Fitment Quality Stamp */}
        {showVerifiedBadge && (
          <div
            className={`absolute left-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 pointer-events-none z-10 shadow-sm ${
              badgeClassName || 'top-3'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Part</span>
          </div>
        )}
      </div>

      {/* Thumbnails Gallery Strip */}
      {fallbackImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {fallbackImages.map((img, idx) => {
            const isSelected = selectedImageIndex === idx;
            const thumbSrc = imgErrorMap[idx] ? '/images/hero_banner_brakes.png' : img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-20 h-20 bg-white border-2 shrink-0 transition-all duration-200 overflow-hidden p-1 ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/30 shadow-md scale-105'
                    : 'border-[#e2e2e5] hover:border-black opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={thumbSrc}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                />
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-primary text-black p-0.5">
                    <Check className="w-2.5 h-2.5 font-bold" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
