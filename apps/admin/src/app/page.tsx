'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { MOCK_PRODUCTS, MOCK_BRANDS, MOCK_BIKES } from '@monorepo/mocks';
import { formatPaise } from '@monorepo/api';
import { Button } from '@monorepo/ui';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Bike,
  Plus,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Truck,
  Eye,
  FileText,
  Sliders,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([
    {
      id: 'U22-ORD-89421',
      customer: 'Rahul Sharma',
      date: 'Today, 10:42 AM',
      itemsCount: 2,
      totalPaise: 4899900,
      pincode: '560038',
      status: 'Dispatched',
      awb: 'BLR-EXP-99214',
    },
    {
      id: 'U22-ORD-89420',
      customer: 'Vikramaditya S.',
      date: 'Today, 09:15 AM',
      itemsCount: 1,
      totalPaise: 129900,
      pincode: '110001',
      status: 'Processing',
      awb: 'Pending',
    },
    {
      id: 'U22-ORD-89419',
      customer: 'Anish Kapadia',
      date: 'Yesterday',
      itemsCount: 3,
      totalPaise: 2249900,
      pincode: '400001',
      status: 'Delivered',
      awb: 'MUM-EXP-77102',
    },
    {
      id: 'U22-ORD-89418',
      customer: 'Priya Sundaram',
      date: 'Yesterday',
      itemsCount: 1,
      totalPaise: 449900,
      pincode: '600001',
      status: 'Processing',
      awb: 'Pending',
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 font-sans">
        {/* Top Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dedcd5] pb-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              OVERVIEW & CMS CONTROL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight">
              COMMAND CENTER DASHBOARD
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" asChild className="text-xs font-black bg-primary text-black hover:bg-black hover:text-white border-0 gap-1.5 uppercase">
              <Link href="/products?action=new">
                <Plus className="w-4 h-4" />
                <span>ADD NEW PRODUCT</span>
              </Link>
            </Button>

            <Button variant="outline" asChild className="text-xs font-bold border-black gap-1.5 uppercase">
              <Link href="/content">
                <FileText className="w-4 h-4 text-primary" />
                <span>MANAGE BANNERS</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-foreground/60 uppercase font-bold">TOTAL REVENUE (MTD)</span>
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-none">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground tracking-tight font-sans">₹1,48,990</p>
              <p className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% vs previous month
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-foreground/60 uppercase font-bold">ACTIVE ORDERS</span>
              <div className="p-2 bg-black text-white rounded-none">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground tracking-tight font-sans">24 Orders</p>
              <p className="text-[11px] font-mono text-amber-700 font-bold mt-1">
                ⏳ 2 Orders awaiting dispatch
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-foreground/60 uppercase font-bold">CMS CATALOG ITEMS</span>
              <div className="p-2 bg-primary/10 text-primary rounded-none">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground tracking-tight font-sans">42 Parts</p>
              <p className="text-[11px] font-mono text-red-600 font-bold mt-1">
                ⚠️ 2 Parts low in stock
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-foreground/60 uppercase font-bold">DYNO FITMENT MATRIX</span>
              <div className="p-2 bg-blue-100 text-blue-800 rounded-none">
                <Bike className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground tracking-tight font-sans">18 Models</p>
              <p className="text-[11px] font-mono text-blue-800 font-bold mt-1">
                ✓ 100% Physical Dyno Tested
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Orders Stream + CMS Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Orders Fulfillment Stream (8 cols) */}
          <div className="lg:col-span-8 bg-[#ffffff] border border-[#edebe4] p-5 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#edebe4] pb-3">
              <div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block">
                  REAL-TIME SHIPMENTS
                </span>
                <h2 className="text-base font-black uppercase text-foreground">Recent Orders & Fulfillment</h2>
              </div>

              <Link href="/orders" className="text-xs font-bold text-primary hover:underline">
                View All Orders &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#f7f6f2] text-foreground/70 uppercase border-y border-[#edebe4]">
                  <tr>
                    <th className="p-2.5">Order ID</th>
                    <th className="p-2.5">Rider</th>
                    <th className="p-2.5">Items</th>
                    <th className="p-2.5">Total</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edebe4]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#faf9f6]">
                      <td className="p-2.5 font-bold text-foreground">{order.id}</td>
                      <td className="p-2.5 font-sans font-bold text-foreground">
                        {order.customer}
                        <span className="block text-[10px] text-foreground/50 font-mono">Pincode: {order.pincode}</span>
                      </td>
                      <td className="p-2.5">{order.itemsCount} Part(s)</td>
                      <td className="p-2.5 font-bold text-foreground font-sans">
                        {formatPaise(order.totalPaise)}
                      </td>
                      <td className="p-2.5">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-[10px] font-bold font-mono uppercase px-2 py-1 border focus:outline-none cursor-pointer ${
                            order.status === 'Dispatched'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : order.status === 'Processing'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-2.5 text-right">
                        <Link
                          href={`/orders?id=${order.id}`}
                          className="p-1 text-foreground/60 hover:text-primary transition-colors inline-block"
                          title="View order details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Low Stock Alerts & CMS Hero Banners Preview (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Low Stock Warning Box */}
            <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 border-b border-[#edebe4] pb-2 text-red-700 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Low Inventory Stock Warnings</span>
              </div>

              <div className="space-y-2 text-xs">
                {MOCK_PRODUCTS.slice(0, 2).map((prod) => (
                  <div key={prod.id} className="p-2.5 bg-red-50/50 border border-red-200 flex justify-between items-center">
                    <div>
                      <span className="font-extrabold text-foreground block">{prod.name}</span>
                      <span className="text-[10px] text-foreground/60 font-mono">
                        Brand: {prod.brand.name} | SKU: U22-{prod.id}
                      </span>
                    </div>
                    <span className="bg-red-600 text-white font-mono text-[10px] font-black px-2 py-0.5 shrink-0">
                      STOCK: {prod.variants[0]?.stock || 3}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/products" className="block text-center text-xs font-bold text-primary hover:underline pt-1">
                Manage All Stock Levels &rarr;
              </Link>
            </div>

            {/* Quick CMS Banners Control */}
            <div className="bg-[#000000] text-white p-5 space-y-4 border border-white/10 shadow-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" /> HERO BANNERS CMS
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">3 ACTIVE</span>
              </div>

              <p className="text-xs text-white/70">
                Manage promotional banners, combo deal announcements, and mega menu links displayed on the main storefront.
              </p>

              <Button variant="primary" asChild className="w-full text-xs font-black bg-primary text-black hover:bg-white border-0 uppercase">
                <Link href="/content">OPEN BANNER & CONTENT CMS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
