import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TradingSolutionView from '@/components/trading-solution/TradingSolutionView';
import {
  getProductLinePage,
  PRODUCT_LINE_PAGE_ENTRIES,
  PRODUCT_LINE_SLUGS,
} from '@/lib/productLinePageContent';
import { getProductLinePayload } from '@/lib/productLinePayload';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = PRODUCT_LINE_PAGE_ENTRIES.find((n) => n.slug === slug)?.label ?? slug;
  if (!PRODUCT_LINE_SLUGS.includes(slug)) {
    return { title: label };
  }
  const fb = getProductLinePage(slug);
  const { seo } = await getProductLinePayload(slug);
  const title = seo.metaTitle?.trim() || (fb ? `${fb.hero.title} | N2N Connect` : label);
  const description =
    seo.metaDescription?.trim() ||
    (fb ? `${fb.hero.subtitle}。${fb.spotlight.paragraphs[0] ?? ''}` : '');
  return {
    title,
    description,
    ...(seo.shareImageUrl
      ? {
          openGraph: { images: [{ url: seo.shareImageUrl }] },
          twitter: { images: [seo.shareImageUrl] },
        }
      : {}),
  };
}

export default async function ProductLineRootPage({ params }: Props) {
  const { slug } = await params;
  if (!PRODUCT_LINE_SLUGS.includes(slug)) notFound();

  const { view } = await getProductLinePayload(slug);

  return (
    <main>
      <TradingSolutionView {...view} />
    </main>
  );
}
