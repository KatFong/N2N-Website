import type { Metadata } from 'next';
import TradingSolutionView from '@/components/trading-solution/TradingSolutionView';
import { getProductLinePage } from '@/lib/productLinePageContent';
import { getServerHostingPayload } from '@/lib/serverHostingPayload';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const fb = getProductLinePage('server-hosting');
  const { seo } = await getServerHostingPayload();
  const title = seo.metaTitle?.trim() || (fb ? `${fb.hero.title} | N2N Connect` : '服务器托管和专线服务 | N2N Connect');
  const description =
    seo.metaDescription?.trim() ||
    (fb ? `${fb.hero.subtitle}。${fb.spotlight.coreHighlights?.[0] ?? fb.spotlight.paragraphs[0] ?? ''}` : '');
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

export default async function ServerHostingCmsPage() {
  const { view } = await getServerHostingPayload();
  return (
    <main>
      <TradingSolutionView {...view} />
    </main>
  );
}
