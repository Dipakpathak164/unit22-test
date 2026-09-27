'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { env } from '@/env';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { adminLogout } from '@/features/auth/slice';
import AdminLoginPage from '@/app/login/page';
import {
  LayoutDashboard,
  Package,
  FileText,
  ShoppingBag,
  Bike,
  Star,
  Settings,
  Search,
  ExternalLink,
  ShieldAlert,
  Bell,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Sparkles,
  Layers,
  LogOut,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const dispatch = useAppDispatch();
  const { isAdminAuthenticated, adminUser } = useAppSelector((state) => state.adminAuth);
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdminAuthenticated) {
    return <AdminLoginPage />;
  }

  const navItems = [
    {
      label: 'Overview Dashboard',
      href: '/',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      label: 'Product Catalog CMS',
      href: '/products',
      icon: Package,
      badge: '42',
    },
    {
      label: 'Banners & Content CMS',
      href: '/content',
      icon: FileText,
      badge: 'Banners',
    },
    {
      label: 'Orders & Fulfillment',
      href: '/orders',
      icon: ShoppingBag,
      badge: '3 New',
    },
    {
      label: 'Dyno Fitment Matrix',
      href: '/fitment',
      icon: Bike,
    },
    {
      label: 'Rider Reviews CMS',
      href: '/reviews',
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-foreground font-sans flex flex-col antialiased">
      {/* Top Admin Header Bar */}
      <header className="bg-[#000000] text-white border-b border-white/10 sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-none text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Toggle Sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2 font-black tracking-wider text-sm uppercase">
            <div className="w-8 h-8 bg-primary text-black font-black flex items-center justify-center text-xs">
              U22
            </div>
            <span className="hidden sm:inline text-white">UNIT22 ADMIN & CMS</span>
            <span className="bg-primary/20 text-primary border border-primary/40 text-[10px] font-bold px-2 py-0.5">
              v2.4 PORTAL
            </span>
          </Link>
        </div>

        {/* Global Admin Search & Quick Utilities */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-72">
            <input
              type="text"
              placeholder="Search products, orders, SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 text-white placeholder:text-white/50 text-xs px-3 py-1.5 pr-8 border border-white/20 focus:outline-none focus:border-primary"
            />
            <Search className="w-3.5 h-3.5 text-white/50 absolute right-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-3 border-l border-white/20 pl-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold hidden lg:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              API ONLINE
            </span>

            <a
              href={env.NEXT_PUBLIC_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white/10 hover:bg-primary hover:text-black text-white px-3 py-1 text-xs font-bold transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 border border-white/10">
              <UserCheck className="w-4 h-4 text-primary" />
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-[11px] font-bold text-white leading-none">{adminUser?.name || 'SUPER ADMIN'}</p>
                <p className="text-[9px] text-white/60 leading-none">{adminUser?.role || 'Super Admin'}</p>
              </div>
            </div>

            <button
              onClick={() => dispatch(adminLogout())}
              className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors border border-red-500/30"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside
          className={`bg-[#0d0d0d] text-white border-r border-white/10 transition-all duration-300 flex flex-col justify-between shrink-0 ${
            isSidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="py-4 space-y-6">
            <div className="px-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              {!isSidebarCollapsed && 'CMS & MANAGEMENT'}
            </div>

            <nav className="space-y-1 px-2 font-sans">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold transition-all group ${
                      isActive
                        ? 'bg-primary text-black font-black shadow-md'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-primary'}`} />
                      {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isSidebarCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 ${
                          isActive
                            ? 'bg-black text-white font-black'
                            : 'bg-white/10 text-white/70 group-hover:bg-white/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Info */}
          {!isSidebarCollapsed && (
            <div className="p-4 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
              <p className="font-bold text-white/80">UNIT22 SALES & MFG</p>
              <p>System Status: Normal</p>
              <p>© 2026 Unit22 Inc.</p>
            </div>
          )}
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
