import { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '商务合作',
  description: '与 N2N Connect 携手，加速业务增长。',
};

const partnerSteps = [
  { step: '01', title: '申请', description: '通过线上入口提交合作申请。' },
  { step: '02', title: '审核', description: '我们将在 5 个工作日内完成初步审核。' },
  { step: '03', title: '入驻', description: '在专属支持下完成入驻与对接流程。' },
  { step: '04', title: '上线', description: '正式上线，与 N2N-AFE 共同拓展市场。' },
];

export default function BusinessPartnershipPage() {
  const contactEmail = 'contact@n2nconnect.com';
  return (
    <main className="bg-white text-slate-900">
      <section id="business-partnership-section" className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">商务合作</h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            通过技术协同、服务整合与战略商业合作，与 N2N Connect 共建长期市场价值。
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">合作价值</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              '收入与增长机会',
              '联合市场推广',
              '专属入驻支持',
              '技术与运营赋能',
              '区域市场网络',
              '长期战略合作',
            ].map((item) => (
              <article key={item} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">如何成为合作伙伴</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              简明流程，助您快速融入 N2N Connect 生态并启动协作。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnerSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mb-3 text-4xl font-bold text-blue-100">{item.step}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">准备与我们合作？</h2>
          <p className="mb-8 text-slate-200">欢迎联系团队，讨论您的目标与合适的合作模式。</p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-100"
          >
            <Mail className="h-5 w-5" />
            {contactEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
