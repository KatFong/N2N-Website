'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { MappedHero } from '@/lib/mapHomePage';
import { HOME_HERO_DEFAULTS } from '@/lib/homePageDefaults';

/** 背景視差：位移為捲動量的 1/5（背景慢於頁面捲動，約 5 倍速差） */
const PARALLAX_BG_FACTOR = 0.2;

type Props = {
  data?: MappedHero;
};

export default function HeroBanner({ data }: Props) {
  const h = data ?? HOME_HERO_DEFAULTS;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [bgOffsetY, setBgOffsetY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setBgOffsetY(window.scrollY * PARALLAX_BG_FACTOR);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bgUrl = h.backgroundImageUrl || HOME_HERO_DEFAULTS.backgroundImageUrl;

  return (
    <section
      ref={sectionRef}
      className="relative h-[400px] w-full overflow-hidden bg-slate-950 md:h-[600px]"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${bgOffsetY}px, 0) scale(1.12)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bgUrl.replace(/'/g, "\\'")}')` }}
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/92 via-[#1e3a8a]/78 to-slate-900/60" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(15,23,42,0.55),transparent_55%)]"
        aria-hidden
      />
      <DataVizOverlay className="absolute right-0 top-1/2 hidden w-[45%] max-w-xl -translate-y-1/2 opacity-40 md:block" />
      <DataVizOverlay className="absolute -right-4 bottom-8 w-[70%] opacity-30 md:hidden" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10 pt-20 sm:px-6 md:justify-center md:pb-16 md:pt-20 lg:px-8">
        <div className="hero-banner-text max-w-3xl">
          {h.showLogo ? (
            <div className="mb-5 md:mb-6">
              <Image
                src="/n2n-logo-head-w.png"
                alt="N2N Connect"
                width={200}
                height={56}
                className="h-10 w-auto drop-shadow-md md:h-[3.25rem]"
                priority
              />
            </div>
          ) : null}
          <h1 className="flex flex-col gap-2 md:gap-2.5">
            <span className="text-balance text-2xl font-bold leading-snug tracking-tight text-white md:text-4xl md:leading-tight lg:text-5xl">
              {h.subtitle}
            </span>
            <span className="text-balance text-2xl font-semibold leading-snug tracking-wide text-sky-200/95 md:text-4xl md:leading-tight lg:text-5xl">
              {h.title}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200/95 md:text-lg">{h.description}</p>
          <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href={h.ctaPrimaryLink}
              className="hero-banner-btn group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.25)] ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-brand-faint hover:shadow-[0_8px_32px_rgba(32,39,168,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary md:text-base"
            >
              {h.ctaPrimaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={h.ctaSecondaryLink}
              className="hero-banner-btn inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/12 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/75 hover:bg-brand-primary/88 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 md:text-base"
            >
              {h.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataVizOverlay({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const gid = `hero-viz-${uid}`;
  return (
    <svg
      className={className}
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 180 L80 120 L140 150 L200 60 L260 90 L320 40 L380 70"
        stroke={`url(#${gid})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={40 + i * 52}
          y={140 - i * 12}
          width="28"
          height={40 + i * 12}
          rx="4"
          fill="white"
          fillOpacity={0.12 + i * 0.06}
        />
      ))}
      <circle cx="200" cy="60" r="6" fill="#38bdf8" />
      <circle cx="320" cy="40" r="5" fill="#93c5fd" />
    </svg>
  );
}
