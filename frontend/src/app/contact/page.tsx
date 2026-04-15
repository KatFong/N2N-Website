import { cache } from 'react';
import { Metadata } from 'next';
import ContactOffices from '@/components/contact/ContactOffices';
import { CONTACT_PAGE_DEFAULTS } from '@/lib/contactPageData';
import { mapContactPageFromStrapi } from '@/lib/mapContactPage';
import { getContactPage } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

const DEFAULT_METADATA: Metadata = {
  title: 'N2N Connect - 联系我们',
  description:
    'N2N Connect 办公地点：马来西亚、新加坡、香港、越南。支持产品、招聘、投资者关系与一般咨询联络方式。',
};

const getContactPageMapped = cache(async () => {
  const res = await getContactPage();
  return mapContactPageFromStrapi(res?.data ?? null);
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageMapped();
  const title = data.metaTitle?.trim() || DEFAULT_METADATA.title;
  const description = data.metaDescription?.trim() || (DEFAULT_METADATA.description as string);
  return {
    title,
    description,
    ...(data.ogImageUrl
      ? { openGraph: { images: [{ url: data.ogImageUrl }] }, twitter: { images: [data.ogImageUrl] } }
      : {}),
  };
}

export default async function ContactPage() {
  const { heroTitle, sectionTitle, offices } = await getContactPageMapped();

  return (
    <main className="bg-white text-slate-900">
      <section id="contact-section" className="border-y border-slate-300 bg-[#2027a8] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-wide text-white">
            {heroTitle || CONTACT_PAGE_DEFAULTS.heroTitle}
          </h1>
        </div>
      </section>

      <ContactOffices sectionTitle={sectionTitle} offices={offices} />
    </main>
  );
}
