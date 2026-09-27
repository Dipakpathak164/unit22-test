'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { formatPaise } from '@monorepo/api';
import { Button, Input } from '@monorepo/ui';
import {
  ShoppingBag,
  Truck,
  Search,
  CheckCircle,
  Clock,
  Filter,
  Package,
  Eye,
  Edit,
  Save,
  MessageSquare,
  X,
} from 'lucide-react';

export default function OrdersFulfillmentPage() {
  const [orders, setOrders] = useState([
    {
      id: 'U22-ORD-89421',
      customerName: 'Rahul Sharma',
      email: 'rahul.rider@unit22.in',
      phone: '+91 9876543210',
      date: '2025-02-18 10:42 AM',
      pincode: '560038 (Bengaluru)',
      totalPaise: 4899900,
      status: 'Dispatched',
      awbNumber: 'BLR-EXP-99214',
      items: [{ name: 'Akrapovic Titanium Slip-On Performance Exhaust', qty: 1 }],
    },
    {
      id: 'U22-ORD-89420',
      customerName: 'Vikramaditya S.',
      date: '2025-02-18 09:15 AM',
      email: 'vikram@motorcycle.in',
      phone: '+91 9988776655',
      pincode: '110001 (New Delhi)',
      totalPaise: 129900,
      status: 'Processing',
      awbNumber: '',
      items: [{ name: 'Interceptor 650 Sintered Brake Pads (Front)', qty: 1 }],
    },
    {
      id: 'U22-ORD-89419',
      customerName: 'Anish Kapadia',
      date: '2025-02-17 16:30 PM',
      email: 'anish@rider.org',
      phone: '+91 9123456789',
      pincode: '400001 (Mumbai)',
      totalPaise: 2249900,
      status: 'Delivered',
      awbNumber: 'MUM-EXP-77102',
      items: [{ name: 'Expedition Aluminum Panniers 37L (Pair)', qty: 1 }],
    },
  ]);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingOrder, setEditingOrder] = useState<typeof orders[0] | null>(null);
  const [editAwb, setEditAwb] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || ord.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEditModal = (ord: typeof orders[0]) => {
    setEditingOrder(ord);
    setEditAwb(ord.awbNumber);
    setEditStatus(ord.status);
  };

  const handleSaveOrderFulfillment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === editingOrder.id ? { ...o, status: editStatus, awbNumber: editAwb } : o
      )
    );

    setEditingOrder(null);
    setSuccessToast(`Order ${editingOrder.id} updated successfully!`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 font-sans">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dedcd5] pb-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              PAN-INDIA FULFILLMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary" />
              ORDERS & FULFILLMENT PORTAL
            </h1>
          </div>
        </div>

        {successToast && (
          <div className="p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Toolbar & Filters */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Input
              type="text"
              placeholder="Search by order ID, customer name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs bg-[#f9f9f8] border-[#d8d8da]"
            />
            <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-2 border bg-[#e9e7e1] p-1 text-xs font-bold font-mono">
            {['ALL', 'PROCESSING', 'DISPATCHED', 'DELIVERED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 uppercase transition-colors ${
                  statusFilter === st ? 'bg-black text-white' : 'text-foreground/70 hover:text-black'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#ffffff] border border-[#edebe4] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#000000] text-white uppercase border-b border-white/10">
                <tr>
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Rider Customer</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Courier AWB</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edebe4]">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#faf9f6]">
                    <td className="p-3 font-bold text-foreground">{ord.id}</td>
                    <td className="p-3 font-sans">
                      <span className="font-bold text-foreground block">{ord.customerName}</span>
                      <span className="text-[10px] text-foreground/50 font-mono">{ord.phone}</span>
                    </td>
                    <td className="p-3 text-foreground/70">{ord.date}</td>
                    <td className="p-3 font-bold text-foreground font-sans text-sm">
                      {formatPaise(ord.totalPaise)}
                    </td>
                    <td className="p-3">
                      {ord.awbNumber ? (
                        <span className="bg-[#f7f6f2] px-2 py-0.5 border border-[#d8d8da] font-bold text-foreground">
                          {ord.awbNumber}
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold">Awaiting AWB</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
                          ord.status === 'Dispatched'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : ord.status === 'Processing'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-blue-100 text-blue-800 border-blue-300'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleOpenEditModal(ord)}
                        className="px-3 py-1 bg-black text-white hover:bg-primary hover:text-black font-bold text-xs uppercase transition-colors"
                      >
                        UPDATE FULFILLMENT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UPDATE FULFILLMENT MODAL */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#edebe4] w-full max-w-lg shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#edebe4] pb-3">
              <h3 className="text-lg font-black uppercase text-foreground flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                UPDATE ORDER FULFILLMENT ({editingOrder.id})
              </h3>
              <button onClick={() => setEditingOrder(null)} className="p-1 text-foreground/60 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOrderFulfillment} className="space-y-4 text-xs">
              <div className="p-3 bg-[#f7f6f2] border border-[#edebe4] space-y-1 font-mono">
                <p className="font-sans font-bold text-foreground">{editingOrder.customerName}</p>
                <p>Delivery: {editingOrder.pincode}</p>
                <p>Items: {editingOrder.items[0]?.name}</p>
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase text-foreground/80 block">FULFILLMENT STATUS</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f9f9f8] border border-[#d8d8da] font-bold text-xs"
                >
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase text-foreground/80 block">COURIER AWB TRACKING NUMBER</label>
                <Input
                  type="text"
                  placeholder="e.g. BLR-EXP-99214"
                  value={editAwb}
                  onChange={(e) => setEditAwb(e.target.value)}
                  className="bg-[#f9f9f8] text-xs h-10 font-mono font-bold"
                />
              </div>

              <div className="pt-3 border-t border-[#edebe4] flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  variant="outline"
                  className="text-xs font-bold border-black"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="text-xs font-black bg-primary text-black hover:bg-black hover:text-white border-0 gap-1.5 uppercase"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE & NOTIFY RIDER</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
