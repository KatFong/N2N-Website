import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '登录 / 注册',
  description: '选择产品并进入对应登录入口。',
};

const PRODUCT_LOGINS = [
  {
    name: 'SMP5',
    description: '个人投资与智能选股平台。',
    href: '/smp5',
  },
  {
    name: 'M.P',
    description: 'Master Picks 策略与分析工具。',
    href: '/mps',
  },
  {
    name: 'N2N-Quant',
    description: '量化交易与策略执行平台。',
    href: '/quant',
  },
];

export default function LoginPage() {
  return (
    <main className="bg-slate-50 py-14 sm:py-18 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">登录 / 注册</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            请选择产品后进入对应入口。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PRODUCT_LOGINS.map((product) => (
            <article
              key={product.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
              <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-600">{product.description}</p>

              <Link
                href={product.href}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#2027a8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2188]"
              >
                登录
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
