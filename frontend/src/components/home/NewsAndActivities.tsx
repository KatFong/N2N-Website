import Image from 'next/image';
import Link from 'next/link';
import type { MappedNews } from '@/lib/mapHomePage';

type Props = {
  data: MappedNews;
};

export default function NewsAndActivities({ data }: Props) {
  const n = data;

  if (!n.featuredTitle || n.list.length === 0) return null;

  return (
    <section className="border-t border-slate-200/80 bg-white" aria-labelledby="news-activities-heading">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:h-[450px] lg:max-h-[450px] lg:grid-rows-[auto_320px_auto] lg:gap-y-3 lg:py-6 lg:px-8">
        <div className="lg:shrink-0">
          {n.moduleLabel ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2027a8]">{n.moduleLabel}</p>
          ) : null}
          <h2 id="news-activities-heading" className="text-2xl font-bold tracking-tight text-slate-900 lg:mt-1">
            {n.titleZh}
            {n.titleEn ? (
              <span className="ml-3 text-base font-medium text-slate-500 md:text-lg">{n.titleEn}</span>
            ) : null}
          </h2>
          {n.introText ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{n.introText}</p> : null}
        </div>

        <div className="mt-4 flex min-h-0 w-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white lg:mt-0 lg:h-[320px] lg:flex-row lg:rounded-none">
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

          <div className="flex min-h-0 w-full flex-1 flex-col justify-between border-t border-slate-200 px-5 py-4 lg:h-[320px] lg:w-1/2 lg:border-l lg:border-t-0 lg:py-5">
            <ul className="flex flex-col">
              {n.list.map((article, index) => (
                <li key={article.link} className={index > 0 ? 'mt-4 border-t border-slate-200 pt-4' : ''}>
                  <Link href={article.link} className="group block">
                    <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#5D2ED1] md:text-lg">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex shrink-0 justify-center lg:mt-0">
          <Link
            href={n.moreButtonLink}
            className="inline-flex min-w-[120px] items-center justify-center bg-[#5D2ED1] px-10 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f26b8]"
          >
            {n.moreButtonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
