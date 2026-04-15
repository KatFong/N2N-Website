import HeroBanner from '@/components/home/HeroBanner';
import CoreAdvantages from '@/components/home/CoreAdvantages';
import ProductOverview from '@/components/home/ProductOverview';
import NewsAndActivities from '@/components/home/NewsAndActivities';
import { mapHomePageFromStrapi } from '@/lib/mapHomePage';
import { getHomePage } from '@/lib/strapi';

/** 首页依 Strapi 即时内容，避免建置／代理快取导致 CMS 已改但画面旧 */
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const res = await getHomePage();
  const mapped = mapHomePageFromStrapi(res?.data ?? null);

  return (
    <main className="bg-white text-slate-900">
      <HeroBanner data={mapped.hero} />

      <CoreAdvantages data={mapped.core} />

      <ProductOverview data={mapped.products} />

      <NewsAndActivities data={mapped.news} sectionKey="home-news" />
    </main>
  );
}
