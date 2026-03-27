import Image from 'next/image';
import { ContentBlock, getStrapiMedia } from '@/lib/strapi';

interface ContentBlockSectionProps {
  blocks?: ContentBlock[];
}

export default function ContentBlockSection({ blocks }: ContentBlockSectionProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-16">
      {blocks.map((block, index) => {
        const imgSrc = getStrapiMedia(block.image);
        const isImageRight = block.imagePosition === 'right' || (!block.imagePosition && index % 2 === 0);

        return (
          <section key={block.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div
              className={`flex flex-col ${
                imgSrc
                  ? isImageRight
                    ? 'lg:flex-row'
                    : 'lg:flex-row-reverse'
                  : ''
              } gap-12 items-center`}
            >
              <div className="flex-1">
                {block.title && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{block.title}</h2>
                )}
                {block.body && (
                  <div
                    className="prose prose-lg text-gray-600 max-w-none"
                    dangerouslySetInnerHTML={{ __html: block.body }}
                  />
                )}
              </div>
              {imgSrc && (
                <div className="flex-1">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={imgSrc}
                      alt={block.title || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
