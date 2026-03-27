import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Building2, BrainCircuit, Smartphone, Cloud } from 'lucide-react';
import type { MappedProductsSection } from '@/lib/mapHomePage';
import { HOME_PRODUCTS_DEFAULTS, HOME_PRODUCTS_SECTION_DEFAULTS } from '@/lib/homePageDefaults';
import type { ProductIconId } from '@/lib/productOverview';

const ICON_BY_ID: Record<ProductIconId, LucideIcon> = {
  institutional: Building2,
  fintech: BrainCircuit,
  retail: Smartphone,
  hosting: Cloud,
};

type Props = {
  data?: MappedProductsSection;
};

export default function ProductOverview({ data }: Props) {
  const section = data ?? {
    ...HOME_PRODUCTS_SECTION_DEFAULTS,
    items: HOME_PRODUCTS_DEFAULTS,
  };

  return (
    <section
      id="product-overview"
      className="scroll-mt-24 border-t border-slate-200/80 bg-white py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2027a8]">{section.moduleLabel}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              <span className="text-slate-900">{section.titleZh}</span>
              {section.titleEn ? (
                <span className="ml-3 text-base font-medium text-slate-500 md:text-lg">{section.titleEn}</span>
              ) : null}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">{section.introText}</p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {section.items.map((item) => {
            const Icon = ICON_BY_ID[item.icon] ?? ICON_BY_ID.institutional;
            return (
              <li key={item.slug} className="min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(36,56,184,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2438b8]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="absolute inset-0 bg-[#2438b8]/0 transition-colors duration-300 group-hover:bg-[#2438b8]/25"
                      aria-hidden
                    />
                  </div>

                  <div className="flex flex-1 flex-col bg-white px-5 pb-6 pt-5 transition-colors duration-300 group-hover:bg-[#2438b8]">
                    <div
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-base font-bold leading-snug text-[#6049E8] transition-colors duration-300 group-hover:text-white md:text-[1.05rem]">
                      {item.title}
                    </h3>

                    {item.subtitle ? (
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 transition-colors duration-300 group-hover:text-white/75">
                        {item.subtitle}
                      </p>
                    ) : null}

                    <p className="mt-4 text-sm leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-white group-hover:underline group-hover:decoration-cyan-300 group-hover:decoration-dotted group-hover:underline-offset-[6px]">
                      {item.description}
                    </p>

                    <span className="mt-4 text-xs font-semibold text-[#2027a8] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-cyan-200">
                      查看詳情 →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
