import HeroBanner from '@/components/home/HeroBanner';
import CoreAdvantages from '@/components/home/CoreAdvantages';
import ProductOverview from '@/components/home/ProductOverview';
import NewsAndActivities from '@/components/home/NewsAndActivities';
import ContactCtaSection from '@/components/home/ContactCtaSection';
import { mapHomePageFromStrapi } from '@/lib/mapHomePage';
import { getHomePage } from '@/lib/strapi';

export default async function HomePage() {
  const res = await getHomePage();
  const mapped = mapHomePageFromStrapi(res?.data ?? null);

  return (
    <main className="bg-white text-slate-900">
      <HeroBanner data={mapped.hero} />

      <CoreAdvantages data={mapped.core} />

      <ProductOverview data={mapped.products} />

      <NewsAndActivities data={mapped.news} />

      <ContactCtaSection data={mapped.contact} />
    </main>
  );
}
