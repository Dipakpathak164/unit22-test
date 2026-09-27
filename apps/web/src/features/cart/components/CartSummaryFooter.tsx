'use client';

import React from 'react';
import Link from 'next/link';
import { formatPaise } from '@monorepo/api';
import { Button } from '@monorepo/ui';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface CartSummaryFooterProps {
  subtotalPaise: number;
  shippingCostPaise: number;
  grandTotalPaise: number;
  onCheckoutClick?: () => void;
  showViewCartLink?: boolean;
  className?: string;
}

export function CartSummaryFooter({
  subtotalPaise,
  shippingCostPaise,
  grandTotalPaise,
  onCheckoutClick,
  showViewCartLink = false,
  className = '',
}: CartSummaryFooterProps) {
  return (
    <div className={`p-6 bg-[#faf9f6] border-t border-[#edebe4] space-y-4 font-sans ${className}`}>
      <div className="space-y-2 text-xs font-mono">
        <div className="flex justify-between text-foreground/70">
          <span>Subtotal</span>
          <span className="font-bold text-foreground font-sans">
            {formatPaise(subtotalPaise)}
          </span>
        </div>

        <div className="flex justify-between text-foreground/70">
          <span>Pan-India Express Shipping</span>
          <span className="font-bold text-foreground">
            {shippingCostPaise === 0 ? (
              <strong className="text-emerald-700 font-sans">FREE</strong>
            ) : (
              formatPaise(shippingCostPaise)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm font-black font-sans text-foreground pt-2 border-t border-[#edebe4]">
          <span className="uppercase">Grand Total</span>
          <span className="text-lg text-primary">
            {formatPaise(grandTotalPaise)}
          </span>
        </div>
        <p className="text-[10px] text-foreground/60 font-sans">
          Inclusive of 18% GST taxes & pan-India transit insurance.
        </p>
      </div>

      {/* Checkout Action Buttons */}
      <div className="space-y-2">
        <Button
          variant="primary"
          size="lg"
          onClick={onCheckoutClick}
          asChild
          className="w-full h-12 sm:h-13 px-4 text-xs sm:text-sm font-black uppercase tracking-wider bg-primary hover:bg-black text-white hover:text-white rounded-none border-0 shadow-md transition-all duration-300 gap-2 flex items-center justify-center active:scale-95"
        >
          <Link href="/checkout" className="flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="whitespace-nowrap shrink-0">PROCEED TO SECURE CHECKOUT</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </Button>

        {showViewCartLink && (
          <Link
            href="/cart"
            onClick={onCheckoutClick}
            className="block text-center text-[11px] font-black uppercase tracking-wider text-primary hover:text-black transition-colors py-1 hover:underline"
          >
            VIEW DETAILED CART PAGE &rarr;
          </Link>
        )}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-foreground/70 text-center font-mono border-t border-[#edebe4]">
        <div className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Dyno Tested</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Truck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Fast Dispatch</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <RotateCcw className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>7-Day Return</span>
        </div>
      </div>
    </div>
  );
}
