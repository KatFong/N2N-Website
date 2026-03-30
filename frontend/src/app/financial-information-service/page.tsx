import { cache } from 'react';
import { Metadata } from 'next';
import InstitutionalSolutionSimplePage from '@/components/institutional/InstitutionalSolutionSimplePage';
import { mapFinancialInformationServiceFromStrapi } from '@/lib/mapFinancialInformationServicePage';
import { mapTradingSolutionSeoFromStrapi } from '@/lib/mapTradingSolutionPage';
import { getFinancialInformationServicePage } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

const getFinancialInformationPayload = cache(async () => {
  const res = await getFinancialInformationServicePage();
  const raw = res?.data ?? null;
  return {
    view: mapFinancialInformationServiceFromStrapi(raw),
    seo: mapTradingSolutionSeoFromStrapi(raw),
  };
});

export async function generateMetadata(): Promise<Metadata> {
  const { view, seo } = await getFinancialInformationPayload();
  const title = seo.metaTitle?.trim() || `${view.title} | N2N Connect`;
  const description =
    seo.metaDescription?.trim() || view.bullets[0] || view.subtitle;
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

export default async function FinancialInformationServicePage() {
  const { view } = await getFinancialInformationPayload();
  return <InstitutionalSolutionSimplePage {...view} />;
}
