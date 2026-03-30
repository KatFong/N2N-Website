import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Building2, BrainCircuit, Smartphone, Cloud } from 'lucide-react';
import type { MappedProductsSection } from '@/lib/mapHomePage';
import { HOME_PRODUCTS_DEFAULTS, HOME_PRODUCTS_SECTION_DEFAULTS } from '@/lib/homePageDefaults';
import { productCardHref } from '@/lib/productCardHref';
import type { ProductIconId } from '@/lib/productIcons';

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
  const section: MappedProductsSection = data ?? {
    ...HOME_PRODUCTS_SECTION_DEFAULTS,
    items: HOME_PRODUCTS_DEFAULTS,
  };

  return (
    <section
      id="product-overview"
      className="scroll-mt-24 border-t border-slate-200/80 bg-white home-section-y"
    >
      <div className="home-shell">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {section.moduleLabel ? <p className="home-kicker">{section.moduleLabel}</p> : null}
            <h2 className={`home-h2 ${section.moduleLabel ? 'mt-2' : ''}`}>
              <span className="text-slate-900">{section.titleZh}</span>
              {section.titleEn ? <span className="home-h2-en ml-3">{section.titleEn}</span> : null}
            </h2>
          </div>
          {section.introText ? <p className="home-intro">{section.introText}</p> : null}
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {section.items.map((item) => {
            const Icon = ICON_BY_ID[item.icon] ?? ICON_BY_ID.institutional;
            return (
              <li key={item.slug} className="min-w-0">
                <Link
                  href={productCardHref(item.slug)}
                  className="group flex h-full flex-col overflow-hidden home-card-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(32,39,168,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
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
                      className="absolute inset-0 bg-brand-primary/0 transition-colors duration-300 group-hover:bg-brand-primary/25"
                      aria-hidden
                    />
                  </div>

                  <div className="flex flex-1 flex-col bg-white px-5 pb-6 pt-5 transition-colors duration-300 group-hover:bg-brand-primary">
                    <div
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-faint text-brand-primary transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-base font-bold leading-snug text-brand-primary transition-colors duration-300 group-hover:text-white md:text-[1.05rem]">
                      {item.title}
                    </h3>

                    {item.subtitle ? (
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 transition-colors duration-300 group-hover:text-white/75">
                        {item.subtitle}
                      </p>
                    ) : null}

                    <p className="mt-4 text-sm leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-white group-hover:underline group-hover:decoration-white/50 group-hover:decoration-dotted group-hover:underline-offset-[6px]">
                      {item.description}
                    </p>

                    <span className="mt-4 text-xs font-semibold text-brand-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-white/90">
                      查看详情 →
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
