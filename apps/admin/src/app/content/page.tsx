'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button, Input } from '@monorepo/ui';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  Save,
  Sparkles,
  Layers,
  Megaphone,
  Flame,
  ArrowUpRight,
  Check,
} from 'lucide-react';

export default function ContentCmsPage() {
  const [heroBanners, setHeroBanners] = useState([
    {
      id: 'banner-1',
      title: 'PRECISION ENGINEERED BRAKE SYSTEMS',
      subtitle: '100% Dyno Tested Sintered Metal Pads & Drilled Rotors for Royal Enfield & KTM',
      image: '/images/hero_banner_brakes.png',
      ctaText: 'SHOP BRAKE SYSTEMS',
      ctaLink: '/c/brakes',
      active: true,
    },
    {
      id: 'banner-2',
      title: 'AKRAPOVIC TITANIUM EXHAUST DROP',
      subtitle: 'Maximise HP gain & deep exhaust note with factory dyno certification',
      image: '/images/hero_banner_exhaust.png',
      ctaText: 'EXPLORE EXHAUSTS',
      ctaLink: '/c/exhaust',
      active: true,
    },
    {
      id: 'banner-3',
      title: 'EXPEDITION TOURING & PANNIERS',
      subtitle: 'Heavy-duty 37L Brushed Aluminum Panniers with IP67 Waterproof Rating',
      image: '/images/hero_banner_touring.png',
      ctaText: 'DISCOVER LUGGAGE',
      ctaLink: '/c/luggage',
      active: false,
    },
  ]);

  const [announcementText, setAnnouncementText] = useState(
    '⚡ Pan-India Express Delivery in 2-4 Days | 100% Dyno Tested Fitment Guarantee'
  );
  const [announcementLink, setAnnouncementLink] = useState('/combos');

  const [comboOfferTitle, setComboOfferTitle] = useState('🔥 RIDER COMBO DEALS: FLAT 20% OFF ON BRAKE & DISCS SET');
  const [comboOfferActive, setComboOfferActive] = useState(true);

  const [savedMessage, setSavedMessage] = useState('');

  const handleToggleBannerActive = (id: string) => {
    setHeroBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Delete this banner from hero carousel?')) {
      setHeroBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleSaveAllContent = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage('CMS Content & Banners updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 font-sans">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dedcd5] pb-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              CONTENT MANAGEMENT SYSTEM
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              BANNERS & CMS MANAGER
            </h1>
          </div>

          <Button
            onClick={handleSaveAllContent}
            variant="primary"
            className="text-xs font-black bg-primary text-black hover:bg-black hover:text-white border-0 gap-1.5 uppercase"
          >
            <Save className="w-4 h-4" />
            <span>SAVE ALL CMS CHANGES</span>
          </Button>
        </div>

        {savedMessage && (
          <div className="p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>{savedMessage}</span>
          </div>
        )}

        {/* SECTION 1: TOP ANNOUNCEMENT BAR CMS */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#edebe4] pb-3 text-xs font-black uppercase text-foreground">
            <Megaphone className="w-4 h-4 text-primary" />
            <span>TOP ANNOUNCEMENT BAR CMS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 space-y-1">
              <label className="text-xs font-black uppercase text-foreground/80 block">
                ANNOUNCEMENT BANNER TEXT
              </label>
              <Input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="text-xs bg-[#f9f9f8] h-10 font-bold"
              />
            </div>

            <div className="lg:col-span-4 space-y-1">
              <label className="text-xs font-black uppercase text-foreground/80 block">
                TARGET LINK URL
              </label>
              <Input
                type="text"
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                className="text-xs bg-[#f9f9f8] h-10 font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: HERO CAROUSEL BANNERS CMS */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#edebe4] pb-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>HOMEPAGE HERO SLIDES & BANNERS</span>
            </div>

            <span className="text-xs font-mono text-foreground/60 font-bold">
              {heroBanners.filter((b) => b.active).length} / {heroBanners.length} SLIDES ACTIVE
            </span>
          </div>

          <div className="space-y-4">
            {heroBanners.map((banner, index) => (
              <div
                key={banner.id}
                className="p-4 bg-[#f9f9f8] border border-[#edebe4] flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-24 h-16 relative bg-black shrink-0 border border-[#d8d8da]">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 font-bold">
                        SLIDE #{index + 1}
                      </span>
                      {banner.active ? (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 border border-emerald-300">
                          ACTIVE ON STOREFRONT
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-0.5">
                          DRAFT / HIDDEN
                        </span>
                      )}
                    </div>
                    <h4 className="font-black text-sm uppercase text-foreground mt-1">{banner.title}</h4>
                    <p className="text-xs text-foreground/60 line-clamp-1">{banner.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleBannerActive(banner.id)}
                    className={`px-3 py-1.5 text-xs font-extrabold uppercase border transition-colors ${
                      banner.active
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-black text-white border-black'
                    }`}
                  >
                    {banner.active ? 'ACTIVE' : 'ACTIVATE'}
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="p-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: COMBO DEALS PROMOTION CMS */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#edebe4] pb-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-foreground">
              <Flame className="w-4 h-4 text-primary" />
              <span>SPECIAL COMBO DEALS BANNER</span>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer font-mono">
              <input
                type="checkbox"
                checked={comboOfferActive}
                onChange={(e) => setComboOfferActive(e.target.checked)}
                className="accent-primary h-4 w-4"
              />
              <span>ENABLE COMBO STRIP</span>
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-foreground/80 block">
              PROMOTIONAL HEADLINE TEXT
            </label>
            <Input
              type="text"
              value={comboOfferTitle}
              onChange={(e) => setComboOfferTitle(e.target.value)}
              className="text-xs bg-[#f9f9f8] h-10 font-bold"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
