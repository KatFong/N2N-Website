'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { MappedContactCta } from '@/lib/mapHomePage';
import { HOME_CONTACT_CTA_DEFAULTS } from '@/lib/homePageDefaults';

type Props = {
  data?: MappedContactCta;
};

export default function ContactCtaSection({ data }: Props) {
  const d = data ?? HOME_CONTACT_CTA_DEFAULTS;
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ back: 0, mid: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const norm = Math.max(-1, Math.min(1, centerOffset / (vh * 0.85)));
      setParallax({
        back: norm * 18,
        mid: norm * -12,
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[400px] w-full overflow-hidden sm:min-h-[440px]"
      aria-labelledby="contact-cta-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0a0618] via-[#12082a] to-[#050510]"
        aria-hidden
      />

      {d.backgroundImageUrl ? (
        <div className="absolute inset-0 z-[1]">
          <Image
            src={d.backgroundImageUrl}
            alt=""
            fill
            className="object-cover opacity-45"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-[#0a0618]/65" aria-hidden />
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute -inset-[8%] z-[2] will-change-transform"
        style={{
          transform: `translate3d(0, ${parallax.back}px, 0) scale(1.08)`,
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 8% 12%, rgba(255,255,255,0.95), transparent),
            radial-gradient(1px 1px at 22% 38%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1px 1px at 41% 18%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1.5px 1.5px at 55% 62%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1px 1px at 73% 28%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 88% 71%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 15% 78%, rgba(200,220,255,0.6), transparent),
            radial-gradient(1px 1px at 95% 15%, rgba(255,255,255,0.45), transparent),
            radial-gradient(1px 1px at 33% 55%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 66% 88%, rgba(255,255,255,0.55), transparent)
          `,
          backgroundSize:
            '120% 120%, 100% 100%, 110% 110%, 130% 130%, 115% 115%, 105% 105%, 125% 125%, 100% 100%, 140% 140%, 110% 110%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.85,
        }}
      />

      <div
        className="pointer-events-none absolute -inset-[5%] z-[2] opacity-[0.35] will-change-transform"
        style={{
          transform: `translate3d(0, ${parallax.mid}px, 0) rotate(-8deg) scale(1.12)`,
          backgroundImage: `
            linear-gradient(105deg, transparent 0%, rgba(99, 102, 241, 0.15) 50%, transparent 100%),
            linear-gradient(-18deg, rgba(139, 92, 246, 0.08) 0%, transparent 45%, rgba(59, 130, 246, 0.1) 100%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 62px,
              rgba(129, 140, 248, 0.07) 62px,
              rgba(129, 140, 248, 0.07) 63px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 72px,
              rgba(79, 70, 229, 0.06) 72px,
              rgba(79, 70, 229, 0.06) 73px
            )
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%',
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-[#6366f1]/15 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[400px] max-w-4xl flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[440px] sm:px-6 lg:px-8">
        <h2
          id="contact-cta-heading"
          className="text-balance text-2xl font-bold leading-snug tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-3xl md:text-[1.75rem] lg:text-4xl"
        >
          {d.title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-slate-300/95 sm:text-base">{d.description}</p>
        <Link
          href={d.buttonLink}
          className="contact-cta-breathe-btn mt-10 inline-flex min-w-[160px] items-center justify-center rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] px-10 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
        >
          {d.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
