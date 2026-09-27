import { redirect, notFound } from 'next/navigation';
import { getCategoryBySlug, getCategoryUrl } from '@monorepo/mocks';

interface CategoryRedirectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryRedirectPage({ params }: CategoryRedirectPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  redirect(getCategoryUrl(category.slug));
}
