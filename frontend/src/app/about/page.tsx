import { Metadata } from 'next';
import Image from 'next/image';
import HighlightsParallax from '@/components/about/HighlightsParallax';

export const metadata: Metadata = {
  title: 'N2N Connect - 关于我们',
  description: '了解 N2N Connect 的使命、愿景与企业文化。',
};

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="border-y border-slate-300 bg-[#2027a8] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-wide text-white">关于我们</h1>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="md:pr-6">
            <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">我们是谁</h2>
            <p className="mt-5 text-lg leading-9 text-slate-800">
              <strong>以创新改变行业的实践者。</strong>
              <br />
              我们是一家面向综合资本市场、网络与基础设施的托管服务提供商。公司成立于 2000
              年，如今已成为亚太地区规模最大的服务商之一，以技术与服务赋能市场参与者把握创新与增长机遇。
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/about/wisma-n2n.png"
              alt="N2N 办公楼示意"
              width={520}
              height={320}
              className="h-auto w-full max-w-[460px]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white pb-24 sm:pb-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/about/rocket.gif"
              alt="火箭示意"
              width={360}
              height={280}
              className="h-auto w-full max-w-[300px]"
            />
          </div>
          <div className="md:pl-6">
            <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">我们的使命</h2>
            <p className="mt-5 text-lg leading-9 text-slate-800">
              <strong>以科技赋能资本市场。</strong>
              <br />
              运用创新技术与稳健架构完善价值链，推动资本市场持续突破边界、创造新纪录。
            </p>
            <p className="mt-8 text-3xl font-semibold italic leading-tight text-slate-900">
              &ldquo;关键在于与众不同。&rdquo;
            </p>
            <p className="mt-3 text-lg text-slate-800">Andrew Tiang，董事总经理</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">企业亮点</h2>
        <div className="mt-8">
          <HighlightsParallax />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="md:pr-6">
            <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">企业文化</h2>
            <p className="mt-5 text-lg leading-9 text-slate-800">
              <strong>汇聚优秀人才。</strong>
              <br />
              N2N
              提供充满活力与协作氛围的环境，鼓励创意。我们同样执着于卓越、创新与产品精进，以科技塑造跨地域的资本市场。我们勇于试错、突破边界，并持续追求卓越。
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/about/our-culture.gif"
              alt="企业文化示意"
              width={460}
              height={320}
              className="h-auto w-full max-w-[360px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
