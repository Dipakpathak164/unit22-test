import { redirect, notFound } from 'next/navigation';
import { getCategoryBySlug, getCategoryUrl } from '@monorepo/mocks';

export default async function LegacyCategoryListingRedirectPage({
  params,
}: {
  params: Promise<{ category: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.category && resolvedParams.category.length > 0
    ? resolvedParams.category[resolvedParams.category.length - 1]
    : 'brakes';

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  redirect(getCategoryUrl(category.slug));
}
