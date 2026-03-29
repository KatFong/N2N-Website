import { cache } from 'react';
import { Metadata } from 'next';
import TradingSolutionView from '@/components/trading-solution/TradingSolutionView';
import {
  mapSettlementSolutionPageFromStrapi,
  mapTradingSolutionSeoFromStrapi,
} from '@/lib/mapTradingSolutionPage';
import { getSettlementSolutionPage } from '@/lib/strapi';

const DEFAULT_METADATA: Metadata = {
  title: 'N2N Connect - 券商交易系统 - 多终端交易解决方案',
  description:
    'G3 Pro X、Trade X、Mobile X、VA Trading、Algo Trading。覆盖PC、Web与移动端；支持传统证券、虚拟资产与量化程序交易。',
};

export const dynamic = 'force-dynamic';

const getSettlementSolutionPayload = cache(async () => {
  const res = await getSettlementSolutionPage();
  const raw = res?.data ?? null;
  return {
    view: mapSettlementSolutionPageFromStrapi(raw),
    seo: mapTradingSolutionSeoFromStrapi(raw),
  };
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSettlementSolutionPayload();
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

export default async function SettlementSolutionPage() {
  const { view } = await getSettlementSolutionPayload();
  return (
    <main>
      <TradingSolutionView {...view} />
    </main>
  );
}
