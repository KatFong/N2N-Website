import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { pressAndAnnouncementArticles } from '@/lib/referenceContent';

export const metadata: Metadata = {
  title: '公司公告',
  description: '最新公司公告与新闻稿。',
};

export default function NewsInsightsPage() {
  const articles = pressAndAnnouncementArticles;
  return (
    <main className="bg-white">
      <section id="company-updates-section" className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">公司公告</h1>
          <p className="mt-4 max-w-3xl text-slate-200">浏览 N2N Connect 发布的公司公告与新闻稿。</p>
        </div>
      </section>

      <section id="industry-insights-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const date = new Date(article.publishedDate).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              return (
                <article
                  key={article.slug}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
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
                    阅读全文 <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="product-information-section" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">产品资讯</h2>
          <p className="mt-4 leading-8 text-slate-600">
            汇总平台与产品功能更新、版本迭代与服务发布信息，方便快速掌握最新动态。
          </p>
        </div>
      </section>

      <section id="market-know-how-section" className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Market Know How</h2>
          <p className="mt-4 leading-8 text-slate-600">
            聚焦市场实务、交易机制与行业观察，提供可执行的市场知识与实战参考。
          </p>
        </div>
      </section>
    </main>
  );
}
