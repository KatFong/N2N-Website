import Image from 'next/image';
import Link from 'next/link';
import type { MappedNews } from '@/lib/mapHomePage';

type Props = {
  data: MappedNews;
  sectionKey?: string;
};

export default function NewsAndActivities({ data, sectionKey = 'news-activities' }: Props) {
  const n = data;
  const headingId = `${sectionKey}-heading`;

  if (!n.featuredTitle || n.list.length === 0) return null;

  return (
    <section className="border-t border-slate-200/80 bg-white home-section-y" aria-labelledby={headingId}>
      <div className="home-shell lg:grid lg:h-[450px] lg:max-h-[450px] lg:grid-rows-[auto_320px_auto] lg:gap-y-3 lg:py-0">
        <div className="lg:shrink-0">
          {n.moduleLabel ? <p className="home-kicker">{n.moduleLabel}</p> : null}
          <h2
            id={headingId}
            className={`home-h2 ${n.moduleLabel ? 'mt-2' : ''}`}
          >
            {n.titleZh}
            {n.titleEn ? <span className="home-h2-en ml-3">{n.titleEn}</span> : null}
          </h2>
          {n.introText ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{n.introText}</p>
          ) : null}
        </div>

        <div className="mt-6 flex min-h-0 w-full flex-col overflow-hidden home-card-surface lg:mt-0 lg:h-[320px] lg:flex-row lg:rounded-2xl lg:p-0">
          <Link
            href={n.featuredLink}
            className="relative flex h-[200px] w-full shrink-0 overflow-hidden bg-slate-900 sm:h-[240px] lg:h-[320px] lg:w-1/2"
          >
            <Image
              src={n.featuredImageUrl}
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/35" aria-hidden />
            <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
              <p className="line-clamp-2 max-w-[min(100%,420px)] text-center text-base font-bold leading-snug text-white drop-shadow-sm sm:text-lg md:text-xl">
                {n.featuredTitle}
              </p>
            </div>
          </Link>

          <div className="flex min-h-0 w-full flex-1 flex-col justify-between border-t border-slate-200/90 px-5 py-4 lg:h-[320px] lg:w-1/2 lg:border-l lg:border-t-0 lg:py-5">
            <ul className="flex flex-col">
              {n.list.map((article, index) => (
                <li
                  key={`${index}-${article.title}-${article.link}`}
                  className={index > 0 ? 'mt-4 border-t border-slate-200/90 pt-4' : ''}
                >
                  <Link href={article.link} className="group block">
                    <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-primary md:text-lg">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex shrink-0 justify-center lg:mt-0">
          <Link
            href={n.moreButtonLink}
            className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-brand-primary px-10 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(32,39,168,0.25)] transition hover:bg-brand-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            {n.moreButtonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
