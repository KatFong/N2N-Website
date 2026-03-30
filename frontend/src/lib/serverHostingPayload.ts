import { cache } from 'react';
import {
  mapProductLinePageFromStrapi,
  mapTradingSolutionSeoFromStrapi,
} from '@/lib/mapTradingSolutionPage';
import { getServerHostingSolutionPage } from '@/lib/strapi';

export const getServerHostingPayload = cache(async () => {
  const res = await getServerHostingSolutionPage();
  const raw = res?.data ?? null;
  return {
    view: mapProductLinePageFromStrapi(raw, 'server-hosting'),
    seo: mapTradingSolutionSeoFromStrapi(raw),
  };
});
