import { cache } from 'react';
import { Metadata } from 'next';
import TradingSolutionView from '@/components/trading-solution/TradingSolutionView';
import {
  mapTradingSolutionPageFromStrapi,
  mapTradingSolutionSeoFromStrapi,
} from '@/lib/mapTradingSolutionPage';
import { getTradingSolutionPage } from '@/lib/strapi';

const DEFAULT_METADATA: Metadata = {
  title: 'N2N Connect - 交易方案',
  description:
    '面向本地证券经纪行与银行的企业级一体化证券电商交易方案，涵盖前台交易、风控与多市场接入能力。',
};

export const dynamic = 'force-dynamic';

const getTradingSolutionPayload = cache(async () => {
  const res = await getTradingSolutionPage();
  const raw = res?.data ?? null;
  return {
    view: mapTradingSolutionPageFromStrapi(raw),
    seo: mapTradingSolutionSeoFromStrapi(raw),
  };
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getTradingSolutionPayload();
  const title = seo.metaTitle?.trim() || DEFAULT_METADATA.title;
  const description = seo.metaDescription?.trim() || (DEFAULT_METADATA.description as string);
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

export default async function TradingSolutionPage() {
  const { view } = await getTradingSolutionPayload();
  return (
    <main>
      <TradingSolutionView {...view} />
    </main>
  );
}
