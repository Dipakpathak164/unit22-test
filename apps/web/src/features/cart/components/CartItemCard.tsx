'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '../slice';
import { formatPaise } from '@monorepo/api';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
  variant?: 'compact' | 'detailed';
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onItemClick?: () => void;
}

export function CartItemCard({
  item,
  variant = 'compact',
  onUpdateQuantity,
  onRemoveItem,
  onItemClick,
}: CartItemCardProps) {
  return (
    <div className="p-3.5 bg-[#fefefe] border border-[#edebe4] flex gap-3 relative group hover:border-primary/50 transition-colors font-sans">
      {/* Thumbnail Image */}
      <div className="relative w-20 h-20 bg-[#f7f6f2] shrink-0 border border-[#eaeaea]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-black text-primary uppercase tracking-wider">
              {item.brandName}
            </span>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-foreground/40 hover:text-red-600 transition-colors p-0.5"
              title="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <Link
            href={`/p/${item.slug}`}
            onClick={onItemClick}
            className="text-xs font-bold text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight block"
          >
            {item.name}
          </Link>
          {item.variantName && (
            <p className="text-[10px] text-foreground/60 font-mono mt-0.5">
              Spec: {item.variantName}
            </p>
          )}
        </div>

        {/* Quantity Controls & Item Total */}
        <div className="flex items-end justify-between pt-2 mt-1 border-t border-[#f0eee6]">
          <div className="flex items-center border border-[#d8d8da] bg-white text-xs font-mono">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-black hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2.5 font-bold text-foreground">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-black hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-foreground font-sans">
              {formatPaise(item.pricePaise * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
