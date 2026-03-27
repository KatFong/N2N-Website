import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProductBySlug, productOverviewItems } from '@/lib/productOverview';
import { ProductIcon } from '@/components/home/ProductIcons';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productOverviewItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: '產品' };
  return {
    title: `${product.title} | 产品与服务`,
    description: product.bullets.join(' · '),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="bg-white text-slate-900">
      <div className="border-b border-slate-200/80 bg-slate-50/80">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/#product-overview"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2027a8] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            返回產品總覽
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-sm">
              <ProductIcon id={product.icon} className="h-16 w-16" />
            </div>
            <div>
              <p className="text-lg font-semibold text-blue-900/80">{product.subtitle}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{product.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-slate-900">方案亮點</h2>
        <ul className="mt-4 space-y-3 text-slate-700">
          {product.bullets.map((b) => (
            <li key={b} className="flex gap-3 rounded-xl bg-slate-50/90 px-4 py-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2027a8]" />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm leading-relaxed text-slate-500">
          如需方案諮詢或 Demo，請透過{' '}
          <Link href="/login" className="font-medium text-[#2027a8] hover:underline">
            聯絡我們
          </Link>
          {' '}與團隊聯繫。
        </p>
      </div>
    </main>
  );
}
