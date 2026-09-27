'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { MOCK_PRODUCTS } from '@monorepo/mocks';
import { Star, CheckCircle, XCircle, Trash2, ThumbsUp, ShieldCheck } from 'lucide-react';

export default function ReviewsCmsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'Vikramaditya S. (Verified Rider)',
      date: '2 Days ago',
      rating: 5,
      productName: 'Interceptor 650 Sintered Brake Pads (Front)',
      comment:
        'Immediate upgrade in bite and lever feedback on my Interceptor 650. Zero squeal even after hard mountain riding. Excellent Unit22 service and fast delivery!',
      status: 'Approved',
    },
    {
      id: 'rev-2',
      author: 'Karan Malhotra',
      date: '3 Days ago',
      rating: 5,
      productName: 'Akrapovic Titanium Slip-On Performance Exhaust',
      comment: 'Superb build quality and incredible exhaust note. Installed on Duke 390 without any issues.',
      status: 'Approved',
    },
    {
      id: 'rev-3',
      author: 'Devendra P.',
      date: '1 Week ago',
      rating: 4,
      productName: 'Expedition Aluminum Panniers 37L (Pair)',
      comment: 'Sturdy build and completely waterproof during rain ride. Fits RE Interceptor perfectly.',
      status: 'Approved',
    },
  ]);

  const handleToggleStatus = (id: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === 'Approved' ? 'Pending' : 'Approved' } : r
      )
    );
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Delete review permanently?')) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 font-sans">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dedcd5] pb-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              COMMUNITY MODERATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              RIDER REVIEWS CMS
            </h1>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-3 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#edebe4] pb-2 text-xs">
                <div>
                  <span className="font-extrabold text-foreground">{rev.author}</span>
                  <span className="text-foreground/50 font-mono text-[11px] block">
                    Product: <strong className="text-primary">{rev.productName}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
                      rev.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground/80 leading-relaxed font-sans">{rev.comment}</p>

              <div className="pt-2 border-t border-[#f0eee6] flex items-center justify-between text-xs font-mono">
                <span className="text-foreground/50 text-[11px]">{rev.date}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(rev.id)}
                    className="px-3 py-1 bg-black text-white hover:bg-primary hover:text-black font-bold text-[11px] uppercase transition-colors"
                  >
                    {rev.status === 'Approved' ? 'HIDE REVIEW' : 'APPROVE'}
                  </button>
                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
