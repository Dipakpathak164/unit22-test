'use client';

import React from 'react';
import { formatPaise } from '@monorepo/api';
import { Sparkles } from 'lucide-react';

interface FreeShippingMeterProps {
  progressPercent: number;
  amountLeftForFreeShipping: number;
  className?: string;
}

export function FreeShippingMeter({
  progressPercent,
  amountLeftForFreeShipping,
  className = '',
}: FreeShippingMeterProps) {
  return (
    <div className={`bg-[#f7f6f2] px-6 py-3 border-b border-[#edebe4] space-y-1.5 font-sans ${className}`}>
      <div className="flex justify-between items-center text-xs font-mono">
        {amountLeftForFreeShipping > 0 ? (
          <span className="text-foreground/80">
            Add <strong className="text-primary font-bold">{formatPaise(amountLeftForFreeShipping)}</strong> more for FREE Shipping
          </span>
        ) : (
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> FREE PAN-INDIA EXPRESS SHIPPING UNLOCKED!
          </span>
        )}
        <span className="font-extrabold text-foreground">{progressPercent}%</span>
      </div>
      <div className="w-full bg-[#e2e0d8] h-2 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
