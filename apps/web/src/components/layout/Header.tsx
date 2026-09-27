'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { openPickerModal } from '@/features/fitment/slice';
import { toggleCartDrawer } from '@/features/cart/slice';
import { BikePickerModal } from '@/features/fitment/components/BikePickerModal';
import { CartDrawer } from '@/features/cart/components/CartDrawer';
import { GlobalSearchBar } from '@/components/common/GlobalSearchBar';
import { Bike, ShoppingBag, User, ChevronDown, CheckCircle } from 'lucide-react';

export function Header() {
  const dispatch = useAppDispatch();
  const selectedBike = useAppSelector((state) => state.fitment.selectedBike);
  const cartItems = useAppSelector((state) => state.cartUi.items);
  const user = useAppSelector((state) => state.auth.user);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { name: 'Brake Systems', href: '/c/brakes', count: 120 },
    { name: 'Exhaust & Performance', href: '/c/exhaust', count: 85 },
    { name: 'Riding Gear & Helmets', href: '/c/gear', count: 210 },
    { name: 'Tires & Wheels', href: '/c/tires', count: 64 },
    { name: 'Engine & Oil Filters', href: '/c/engine', count: 150 },
    { name: 'Luggage & Touring', href: '/c/luggage', count: 42 },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 shadow-md">
        {/* Main Header Bar - Theme Black */}
        <div className="bg-[#000000] text-[#ffffff] border-b border-[#ffffff]/10 font-sans">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
            
            {/* MOBILE ROW (lg:hidden): Logo on left + Search Bar in same row (NO toggle menu) */}
            <div className="flex lg:hidden items-center justify-between gap-2.5">
              {/* Logo */}
              <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity">
                <Image
                  src="/logo.png"
                  alt="Unit22 Logo"
                  width={140}
                  height={45}
                  className="h-9 sm:h-11 w-auto object-contain py-0.5"
                  priority
                />
              </Link>

              {/* Search Bar in same row */}
              <GlobalSearchBar className="flex-1 min-w-0" showShortcutBadge={false} />
            </div>

            {/* DESKTOP ROW (hidden lg:flex): Logo, Bike Picker, Search Bar, Account & Cart */}
            <div className="hidden lg:flex items-center justify-between gap-5 h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
                <Image
                  src="/logo.png"
                  alt="Unit22 Logo"
                  width={220}
                  height={65}
                  className="h-14 lg:h-16 w-auto object-contain py-0.5"
                  priority
                />
              </Link>

              {/* Bike Fitment Picker Button */}
              <button
                onClick={() => dispatch(openPickerModal())}
                className="flex items-center gap-2 px-3.5 py-2 border border-[#ffffff]/30 bg-[#000000] text-white hover:border-white transition-colors text-xs font-semibold focus-visible:ring-2 focus-visible:ring-white shrink-0"
              >
                <Bike className="w-4.5 h-4.5 text-primary" />
                <div className="text-left">
                  {selectedBike ? (
                    <div className="flex items-center gap-1 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      <span className="font-bold text-white">{selectedBike.make} {selectedBike.model}</span>
                    </div>
                  ) : (
                    <span className="text-white/90">Select Brand & Bike</span>
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-white/70" />
              </button>

              {/* Global Search Bar (Desktop) */}
              <GlobalSearchBar className="flex-1 max-w-md" />

              {/* Right Utilities: Account & Cart */}
              <div className="flex items-center gap-5 shrink-0">
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-white p-1"
                >
                  <User className="w-5 h-5 text-primary" />
                  <span>{user ? user.name.split(' ')[0] : 'Account'}</span>
                </Link>

                <button
                  onClick={() => dispatch(toggleCartDrawer())}
                  className="flex items-center gap-2 bg-primary text-white px-3.5 py-2 text-xs font-bold hover:bg-primary-hover transition-colors focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Cart</span>
                  <span className="bg-black text-white text-[10px] font-extrabold px-1.5 py-0.5">
                    {cartItemsCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mega Menu Navigation Bar (Desktop Only) */}
        <nav className="border-t border-border bg-background hidden lg:block font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold tracking-wider uppercase">
            <div className="flex items-center gap-8 py-3">
              <div className="relative group">
                <button className="flex items-center gap-1 py-1 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-black">
                  Categories <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {/* Mega Menu Dropdown */}
                <div className="absolute left-0 top-full hidden group-hover:grid grid-cols-3 gap-6 w-[600px] p-6 bg-card border border-border shadow-xl z-50 animate-in fade-in duration-150">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="p-2 border border-border hover:border-primary hover:bg-background transition-colors block text-left"
                    >
                      <p className="font-bold text-foreground text-xs normal-case">{cat.name}</p>
                      <p className="text-[10px] text-foreground/60 font-normal">{cat.count} items</p>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/brands" className="py-1 hover:text-primary transition-colors">
                Brands (43+)
              </Link>
              <Link href="/c/brakes" className="py-1 hover:text-primary transition-colors">
                Brake Pads & Discs
              </Link>
              <Link href="/c/exhaust" className="py-1 hover:text-primary transition-colors">
                Exhaust Systems
              </Link>
              <Link href="/combos" className="py-1 text-primary font-extrabold hover:underline">
                🔥 Combo Deals
              </Link>
            </div>

            <div className="text-foreground/70 font-mono text-[11px] normal-case">
              Pan-India Delivery
            </div>
          </div>
        </nav>
      </header>

      {/* Bike Picker Modal & Cart Drawer */}
      <BikePickerModal />
      <CartDrawer />
    </>
  );
}
