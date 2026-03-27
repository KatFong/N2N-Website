'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Hero, getStrapiMedia } from '@/lib/strapi';

interface HeroCarouselProps {
  hero?: Hero;
}

/* ── Brand colours (from style guide) ──────────────────────────────────────── */
const C_PRIMARY   = '#003366';   // 深藍色
const C_SECONDARY = '#0077CC';   // 天藍色
const C_HOVER     = '#0055AA';   // Hover 藍色漸變

/* ── Floating 3-D card decoration (right side) ─────────────────────────────── */
function FloatingCards() {
  return (
    <div className="relative w-full h-full select-none pointer-events-none">
      {/* Glow orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{
          width: 380, height: 380,
          background: `radial-gradient(circle, rgba(0,119,204,0.35) 0%, transparent 65%)`,
          filter: 'blur(30px)',
        }} />
      </div>

      {/* Card 1 — top, tilted back */}
      <div
        className="absolute rounded-xl shadow-2xl"
        style={{
          width: 220, height: 140,
          top: '6%', left: '8%',
          background: `rgba(0,51,102,0.85)`,
          border: `1.5px solid ${C_SECONDARY}`,
          transform: 'rotate(-9deg)',
          animation: 'floatB 6s ease-in-out infinite',
        }}
      >
        <div className="p-4 flex flex-col gap-2.5">
          <div className="w-7 h-7 rounded-lg" style={{ background: C_SECONDARY }} />
          <div className="h-2 w-20 rounded-full" style={{ background: 'rgba(0,119,204,0.8)' }} />
          <div className="h-2 w-14 rounded-full" style={{ background: 'rgba(0,119,204,0.5)' }} />
          <div className="h-2 w-16 rounded-full" style={{ background: 'rgba(0,119,204,0.35)' }} />
        </div>
      </div>

      {/* Card 2 — middle */}
      <div
        className="absolute rounded-xl shadow-2xl"
        style={{
          width: 260, height: 162,
          top: '28%', left: '18%',
          background: `rgba(0,26,51,0.9)`,
          border: `1.5px solid ${C_HOVER}`,
          transform: 'rotate(-2deg)',
          animation: 'floatM 5s ease-in-out infinite',
        }}
      >
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full" style={{ background: C_SECONDARY }} />
            <div className="h-2 w-20 rounded-full" style={{ background: 'rgba(0,119,204,0.7)' }} />
          </div>
          <div className="h-2 w-full rounded-full" style={{ background: 'rgba(0,119,204,0.4)' }} />
          <div className="h-2 w-4/5 rounded-full" style={{ background: 'rgba(0,119,204,0.25)' }} />
          <div className="h-2 w-2/3 rounded-full" style={{ background: 'rgba(0,119,204,0.18)' }} />
        </div>
      </div>

      {/* Card 3 — front, slightly rotated */}
      <div
        className="absolute rounded-xl shadow-2xl"
        style={{
          width: 280, height: 176,
          top: '52%', left: '4%',
          background: `linear-gradient(135deg, ${C_PRIMARY} 0%, rgba(0,26,51,0.95) 100%)`,
          border: `1.5px solid ${C_SECONDARY}`,
          transform: 'rotate(3deg)',
          animation: 'floatF 7s ease-in-out infinite',
        }}
      >
        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="h-3 w-24 rounded-full" style={{ background: 'rgba(255,255,255,0.85)' }} />
            <div className="h-5 w-10 rounded" style={{ background: C_SECONDARY }} />
          </div>
          <div className="grid grid-cols-3 gap-1.5 mt-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 rounded" style={{ background: `rgba(0,119,204,${0.2 + (i % 3) * 0.1})` }} />
            ))}
          </div>
          <div className="h-2 w-3/5 rounded-full" style={{ background: 'rgba(0,119,204,0.35)' }} />
        </div>
      </div>
    </div>
  );
}

/* ── CSS keyframe animations injected once ────────────────────────────────── */
const ANIMATION_STYLE = `
  @keyframes floatB {
    0%, 100% { transform: rotate(-8deg) translateY(0px); }
    50%       { transform: rotate(-8deg) translateY(-14px); }
  }
  @keyframes floatM {
    0%, 100% { transform: rotate(-3deg) translateY(0px); }
    50%       { transform: rotate(-3deg) translateY(-10px); }
  }
  @keyframes floatF {
    0%, 100% { transform: rotate(2deg) translateY(0px); }
    50%       { transform: rotate(2deg) translateY(-18px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ── Main component ────────────────────────────────────────────────────────── */
export default function HeroCarousel({ hero }: HeroCarouselProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  /* CMS values with fallbacks */
  const title        = hero?.title        || "ASIA'S LEADING\nCAPITAL MARKET\nSOLUTIONS";
  const subtitle     = hero?.subtitle     || 'We are a strong name committed to innovating and connecting capital markets across regions through digitization.';
  const bgImage      = getStrapiMedia(hero?.backgroundImage);
  const ctaLabel     = hero?.ctaLabel     || 'About Us';
  const ctaLink      = hero?.ctaLink      || '/about';
  const ctaSecLabel  = hero?.ctaSecondaryLabel || 'Our Services';
  const ctaSecLink   = hero?.ctaSecondaryLink  || '/products-services';

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'clamp(480px, 88vh, 680px)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_STYLE }} />

      {/* ── Background ── */}
      <div className="absolute inset-0">
        {/* Brand dark-blue gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, #001a33 0%, ${C_PRIMARY} 50%, #001a33 100%)`,
          }}
        />

        {/* Background image (from CMS) with brand-colour overlay */}
        {bgImage && (
          <>
            <Image src={bgImage} alt="" fill className="object-cover object-center" priority />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, rgba(0,26,51,0.90) 0%, rgba(0,51,102,0.80) 50%, rgba(0,26,51,0.75) 100%)`,
              }}
            />
          </>
        )}

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              `linear-gradient(rgba(0,119,204,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,204,1) 1px, transparent 1px)`,
            backgroundSize: '70px 70px',
          }}
        />

        {/* Large glow — top-left */}
        <div
          className="absolute"
          style={{
            width: 600, height: 600,
            top: '-100px', left: '-100px',
            background: `radial-gradient(circle, rgba(0,85,170,0.22) 0%, transparent 65%)`,
            filter: 'blur(20px)',
          }}
        />

        {/* Accent glow — bottom-right */}
        <div
          className="absolute"
          style={{
            width: 400, height: 400,
            bottom: '-80px', right: '20%',
            background: `radial-gradient(circle, rgba(0,119,204,0.15) 0%, transparent 60%)`,
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* ── Floating cards (desktop only) ── */}
      <div
        className="absolute inset-y-0 right-0 z-10"
        style={{
          width: '45%',
          display: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'block' : undefined,
          opacity: mounted ? 1 : 0,
          animation: mounted ? 'fadeUp 0.9s 0.2s ease forwards' : 'none',
        }}
      >
        <FloatingCards />
      </div>

      {/* ── Text content ── */}
      <div
        className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center"
        style={{ minHeight: 'inherit' }}
      >
        <div className="py-20" style={{ maxWidth: 560 }}>

          {/* Logo */}
          <div
            className="mb-8"
            style={{ opacity: mounted ? 1 : 0, animation: mounted ? 'fadeUp 0.6s ease forwards' : 'none' }}
          >
            <Image
              src="/n2n-logo-head-w.png"
              alt="N2N Connect"
              width={160}
              height={46}
              className="object-contain"
              style={{ height: 46, width: 'auto' }}
              priority
            />
          </div>

          {/* Title */}
          <h1
            className="font-black text-white leading-none tracking-tight mb-6 whitespace-pre-line"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeUp 0.7s 0.1s ease forwards' : 'none',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{
              color: 'rgba(180,210,240,0.85)',
              maxWidth: 520,
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeUp 0.7s 0.2s ease forwards' : 'none',
            }}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{ opacity: mounted ? 1 : 0, animation: mounted ? 'fadeUp 0.7s 0.3s ease forwards' : 'none' }}
          >
            {/* Primary CTA */}
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold tracking-wider text-white transition-all duration-200 hover:brightness-110 hover:scale-105 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${C_SECONDARY} 0%, ${C_HOVER} 100%)`,
                boxShadow: `0 8px 24px rgba(0,119,204,0.45)`,
              }}
            >
              {ctaLabel}
            </Link>
            {/* Secondary CTA */}
            <Link
              href={ctaSecLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold tracking-wider text-white transition-all duration-200 hover:bg-white/10 hover:scale-105"
              style={{
                border: `1.5px solid rgba(0,119,204,0.55)`,
                backgroundColor: 'rgba(0,85,170,0.15)',
              }}
            >
              {ctaSecLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(0,10,20,0.6))` }}
      />
    </section>
  );
}
