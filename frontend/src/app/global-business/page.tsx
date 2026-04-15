import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '全球业务',
  description: 'N2N Connect 区域与全球市场布局。',
};

export default function GlobalBusinessPage() {
  return (
    <main className="bg-white text-slate-900">
      <section id="global-business-section" className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">全球业务</h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            依托区域布局与稳健的跨境技术基础设施，我们支持金融机构与市场参与者拓展业务。
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">区域布局</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              '大中华',
              '东南亚',
              '东北亚',
              '南亚',
              '中东',
              '全球跨市场联通',
            ].map((region) => (
              <article key={region} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">{region}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  战略性市场覆盖，配合可扩展的基础设施与服务能力。
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">为扩张而构建</h2>
          <p className="mt-4 leading-8 text-slate-600">
            N2N Connect 将本地市场洞察与企业级技术架构相结合，协助客户在不同司法辖区稳健扩展。
          </p>
        </div>
      </section>
    </main>
  );
}
