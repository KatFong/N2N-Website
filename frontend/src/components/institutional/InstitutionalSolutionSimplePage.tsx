import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductIcon } from '@/components/home/ProductIcons';
import type { ProductIconId } from '@/lib/productIcons';

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  icon?: ProductIconId;
};

export function institutionalSolutionMetadata(
  title: string,
  subtitle: string,
  bullets: string[]
): Metadata {
  return {
    title: `${title} | N2N Connect`,
    description: bullets[0] ?? subtitle,
  };
}

export default function InstitutionalSolutionSimplePage({
  title,
  subtitle,
  bullets,
  icon = 'institutional',
}: Props) {
  return (
    <main className="bg-white text-slate-900">
      <div className="border-b border-slate-200/80 bg-slate-50/80">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/#product-overview"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2027a8] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            返回产品总览
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-sm">
              <ProductIcon id={icon} className="h-16 w-16" />
            </div>
            <div>
              <p className="text-lg font-semibold text-blue-900/80">{subtitle}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-slate-900">方案亮点</h2>
        <ul className="mt-4 space-y-3 text-slate-700">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 rounded-xl bg-slate-50/90 px-4 py-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2027a8]" />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm leading-relaxed text-slate-500">
          如需方案咨询或产品演示，请{' '}
          <Link href="/contact" className="font-medium text-[#2027a8] hover:underline">
            联系我们
          </Link>
          。
        </p>
      </div>
    </main>
  );
}
