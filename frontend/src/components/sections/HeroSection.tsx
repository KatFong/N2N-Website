import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero, getStrapiMedia } from '@/lib/strapi';

interface HeroSectionProps {
  hero?: Hero;
  defaultTitle?: string;
  defaultSubtitle?: string;
}

export default function HeroSection({ hero, defaultTitle, defaultSubtitle }: HeroSectionProps) {
  const title = hero?.title || defaultTitle || 'Welcome to N2N-AFE';
  const subtitle = hero?.subtitle || defaultSubtitle;
  const bgImage = getStrapiMedia(hero?.backgroundImage);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {bgImage && (
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover opacity-20"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/80" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
        )}
        {hero?.ctaLabel && hero?.ctaLink && (
          <Link
            href={hero.ctaLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {hero.ctaLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </section>
  );
}
