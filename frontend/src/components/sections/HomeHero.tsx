'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero, getStrapiMedia } from '@/lib/strapi';

interface HomeHeroProps {
  hero?: Hero;
}

export default function HomeHero({ hero }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const title = hero?.title || '连接 · 成长 · 共赢';
  const subtitle =
    hero?.subtitle ||
    'N2N-AFE 以世界级金融与企业科技方案连接亚洲企业，助力业务增长与全球联通。';
  const bgImage = getStrapiMedia(hero?.backgroundImage);
  const ctaLabel = hero?.ctaLabel || '了解产品与服务';
  const ctaLink = hero?.ctaLink || '/#product-overview';

  /* Parallax: bg scrolls at 1/5 speed */
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      bg.style.transform = `translateY(${scrolled * 0.2}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Fade-in trigger */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d2045] to-[#0a1628]"
      style={{ height: 'clamp(400px, 100vh, 600px)' }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: bgImage
            ? `url(${bgImage})`
            : 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.3) 0%, transparent 50%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          top: '-20%',
          bottom: '-20%',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="transition-all duration-700 delay-100"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide">
            Asia Financial Enterprise
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          {subtitle}
        </p>

        {/* 2 Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:scale-105 hover:bg-blue-400 hover:shadow-blue-400/40"
          >
            {ctaLabel}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/60 backdrop-blur-sm"
          >
            About N2N-AFE
          </Link>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 38.7C840 45.3 960 58.7 1080 61.3C1200 64 1320 56 1380 52L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
