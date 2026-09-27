import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 w-full lg:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  );
}
