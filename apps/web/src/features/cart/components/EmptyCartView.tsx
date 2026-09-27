'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@monorepo/ui';
import { ShoppingBag } from 'lucide-react';

interface EmptyCartViewProps {
  onBrowseClick?: () => void;
  className?: string;
}

export function EmptyCartView({
  onBrowseClick,
  className = '',
}: EmptyCartViewProps) {
  return (
    <div className={`h-full flex flex-col items-center justify-center text-center space-y-4 py-12 font-sans ${className}`}>
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-black uppercase text-foreground">Your cart is empty</h3>
        <p className="text-xs text-foreground/60 max-w-xs">
          Explore our high-performance dyno-tested brake pads, exhaust systems & touring gear.
        </p>
      </div>
      <Button
        variant="primary"
        onClick={onBrowseClick}
        asChild
        className="mt-2 text-xs font-black uppercase tracking-wider bg-black text-white hover:bg-primary hover:text-black border-0 px-6 py-3"
      >
        <Link href="/c/brakes">BROWSE PARTS CATALOG</Link>
      </Button>
    </div>
  );
}
