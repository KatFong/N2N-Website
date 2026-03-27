import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { pressAndAnnouncementArticles } from '@/lib/referenceContent';

export const metadata: Metadata = {
  title: 'Company Announcements',
  description: 'Latest company announcements and press releases.',
};

export default function NewsInsightsPage() {
  const articles = pressAndAnnouncementArticles;
  return (
    <main className="bg-white">
      <section className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Company Announcements</h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            Browse company announcements and press releases from N2N Connect.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const date = new Date(article.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              return (
                <article key={article.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                      <Tag className="h-3 w-3" />
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {date}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">{article.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{article.excerpt}</p>
                  <Link
                    href={`/news-insights/${article.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-slate-700"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
