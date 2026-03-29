import { cache } from 'react';
import {
  mapProductLinePageFromStrapi,
  mapTradingSolutionSeoFromStrapi,
} from '@/lib/mapTradingSolutionPage';
import { getProductLinePageBySlug } from '@/lib/strapi';

export const getProductLinePayload = cache(async (slug: string) => {
  const res = await getProductLinePageBySlug(slug);
  const arr = res?.data;
  const raw = Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
  return {
    view: mapProductLinePageFromStrapi(raw, slug),
    seo: mapTradingSolutionSeoFromStrapi(raw),
  };
});
