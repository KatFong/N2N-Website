import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { pressAndAnnouncementArticles } from '@/lib/referenceContent';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = pressAndAnnouncementArticles.find((item) => item.slug === slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = pressAndAnnouncementArticles.find((item) => item.slug === slug);

  if (!article) notFound();

  const date = new Date(article.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/news-insights"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News & Insights
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            <Tag className="h-3 w-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {date}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>

        <p className="mb-8 border-l-4 border-slate-500 pl-4 text-xl leading-relaxed text-gray-600">
          {article.excerpt}
        </p>

        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}
