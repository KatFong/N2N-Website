import Link from 'next/link';
import { Metadata } from 'next';
import { productOverviewItems } from '@/lib/productOverview';
import { ProductIcon } from '@/components/home/ProductIcons';

export const metadata: Metadata = {
  title: 'Products & Services',
  description: 'N2N Connect 机构解决方案、创新金融科技、个人投资者工具与技术与网络服务。',
};

export default function ProductsServicesPage() {
  return (
    <main className="bg-white">
      <section className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Products &amp; Services</h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            为资本市场机构、券商与金融服务商提供的整合产品体系：机构基础设施、虚拟资产与量化、个人投资工具，以及托管与专线服务。
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {productOverviewItems.map((item) => (
              <article
                key={item.slug}
                id={item.slug}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-[#2027a8]/25 hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-800">
                    <ProductIcon id={item.icon} className="h-12 w-12" />
                  </div>
                  <div className="min-w-0 flex-1">
                    {item.subtitle ? (
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#2027a8]/90">{item.subtitle}</p>
                    ) : null}
                    <h2 className="mt-1 text-2xl font-semibold text-slate-900">{item.title}</h2>
                    <p className="mt-3 leading-8 text-slate-600">{item.bullets[0]}</p>
                    <Link
                      href={`/product/${item.slug}`}
                      className="mt-4 inline-block text-sm font-semibold text-[#2027a8] hover:underline"
                    >
                      查看詳情 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
