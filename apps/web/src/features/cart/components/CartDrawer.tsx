'use client';

import React, { useEffect } from 'react';
import { useCartSummary } from '../hooks/useCartSummary';
import { FreeShippingMeter } from './FreeShippingMeter';
import { CartItemCard } from './CartItemCard';
import { CartSummaryFooter } from './CartSummaryFooter';
import { EmptyCartView } from './EmptyCartView';
import { X, ShoppingBag } from 'lucide-react';

export function CartDrawer() {
  const {
    isCartDrawerOpen,
    items,
    totalItemsCount,
    subtotalPaise,
    shippingCostPaise,
    grandTotalPaise,
    freeShippingProgressPercent,
    amountLeftForFreeShipping,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCloseCart,
  } = useCartSummary();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        handleCloseCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, handleCloseCart]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={handleCloseCart}
        aria-hidden="true"
      />

      {/* Outer Drawer View Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] shadow-2xl flex flex-col justify-between transform transition-transform animate-in slide-in-from-right duration-300 border-l border-[#eaeaea]">
          
          {/* Header Bar */}
          <div className="bg-[#000000] text-[#ffffff] px-6 py-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  YOUR SHOPPING CART
                </h2>
                <p className="text-[11px] text-white/60 font-mono">
                  {totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'} SELECTED
                </p>
              </div>
            </div>

            <button
              onClick={handleCloseCart}
              className="p-1.5 rounded-none text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              /* Atomic Presentational Sub-Component 2: Empty Cart View */
              <EmptyCartView onBrowseClick={handleCloseCart} />
            ) : (
              /* Atomic Presentational Sub-Component 3: Cart Item Card List */
              items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  variant="compact"
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onItemClick={handleCloseCart}
                />
              ))
            )}
          </div>

          {/* Atomic Presentational Sub-Component 4: Cart Summary Footer & Checkout CTA */}
          {items.length > 0 && (
            <CartSummaryFooter
              subtotalPaise={subtotalPaise}
              shippingCostPaise={shippingCostPaise}
              grandTotalPaise={grandTotalPaise}
              onCheckoutClick={handleCloseCart}
              showViewCartLink={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
