'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/store/store';
import {
  Home,
  Tag,
  Layers,
  User,
  ShoppingBag,
} from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();
  const cartItems = useAppSelector((state) => state.cartUi.items);
  const user = useAppSelector((state) => state.auth.user);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      label: 'Brands',
      href: '/brands',
      icon: Tag,
    },
    {
      label: 'Categories',
      href: '/c/brakes',
      icon: Layers,
    },
    {
      label: 'Account',
      href: '/account',
      icon: User,
    },
    {
      label: 'Cart',
      href: '/cart',
      icon: ShoppingBag,
      cartCount: cartItemsCount,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-1.5 inset-x-1.5 z-40 font-sans pointer-events-auto">
      {/* Sleek Floating Glassmorphism Navigation Bar */}
      <div className="bg-[#000000]/95 backdrop-blur-md border border-white/20 shadow-[0_12px_35px_rgba(0,0,0,0.85)] rounded-xl p-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 relative transition-all active:scale-95 ${
                isActive ? 'text-primary' : 'text-white/70 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-white/80'}`} />
                {item.cartCount !== undefined && item.cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-primary text-black font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-black animate-pulse">
                    {item.cartCount}
                  </span>
                )}
              </div>

              <span className={`text-[10px] font-bold tracking-wider mt-0.5 ${isActive ? 'text-primary font-black' : 'text-white/80'}`}>
                {item.label}
              </span>

              {isActive && (
                <span className="w-1.5 h-1.5 bg-primary rounded-full absolute -bottom-0.5 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
