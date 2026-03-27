import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FeatureCard, getStrapiMedia } from '@/lib/strapi';

interface FeatureCardsSectionProps {
  cards?: FeatureCard[];
  title?: string;
  subtitle?: string;
}

export default function FeatureCardsSection({ cards, title, subtitle }: FeatureCardsSectionProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => {
            const iconSrc = getStrapiMedia(card.icon);
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
              >
                {iconSrc && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden mb-4 bg-blue-50 flex items-center justify-center">
                    <Image
                      src={iconSrc}
                      alt={card.title}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                )}
                {!iconSrc && (
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-md" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                {card.description && (
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{card.description}</p>
                )}
                {card.link && (
                  <Link
                    href={card.link}
                    className="mt-4 inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
