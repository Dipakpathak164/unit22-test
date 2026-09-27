import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
  getBrandsForCategory,
  CATEGORY_REGISTRY,
} from '@monorepo/mocks';
import { CategoryProductGrid } from '@/components/category/CategoryProductGrid';
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_REGISTRY.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  // Return real 404 for invalid/unknown category slugs
  if (!category) {
    notFound();
  }

  const products = getProductsByCategorySlug(slug);
  const brands = getBrandsForCategory(slug);

  return (
    <div className="bg-[#f7f6f2] min-h-screen border-b border-[#edebe4]">
      {/* Category Hero Header Section */}
      <div className="bg-[#050507] text-white border-b border-white/10 relative overflow-hidden py-12 sm:py-16">
        {/* Background Image / Ambient Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-[11px] font-mono font-bold text-white/60 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span>Collections</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-primary">{category.title}</span>
          </nav>

          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-[11px] font-black px-3 py-1 uppercase tracking-widest border border-primary/40">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>{category.subtitle}</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none font-sans">
            {category.title}
          </h1>

          {/* Description & Product Count Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed font-sans">
              {category.description}
            </p>
            <div className="bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-mono font-bold text-white uppercase tracking-wider shrink-0 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{products.length} Products Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container for Brand Filter Bar & Product Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CategoryProductGrid category={category} products={products} brands={brands} />
      </div>
    </div>
  );
}
