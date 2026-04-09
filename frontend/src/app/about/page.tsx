import { Metadata } from 'next';
import Image from 'next/image';
import HighlightsParallax from '@/components/about/HighlightsParallax';
import { getAboutPage, type GenericPageData } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'N2N Connect - 关于我们',
  description: '了解 N2N Connect 的使命、愿景与企业文化。',
};

const TIMELINE_GROUPS = [
  {
    era: '2020年后',
    items: [
      '2026年  拓展美国股票期权产品线，为客户提供更多元化的全球投资选择。',
      '2025年  上线 N2N-Quant 量化交易平台，支持全球债券及基金产品的量化策略交易，完善了量化投资的服务能力。',
      '2024年  上线 VA 虚拟资产交易功能，集成 AI 驱动的智能新闻服务，同时完成 Mobile X 及 Trade X 交易平台的迭代升级。',
      '2023年  推出自研的 AFE 程式交易系统及暗盘匹配引擎，大幅提升了量化交易的处理能力，优化了暗盘交易的撮合效率。',
      '2022年  接入富途暗盘系统，同时上线 Robot Trading 自动交易服务，为客户提供自动化交易能力。',
      '2021年  完成港交所网关 OCG-C 升级对接，满足港交所的最新交易网关要求，保障交易的稳定性与合规性。',
      '2021年  上线 H5 i-Trade 移动网页交易平台，集成 eKYC 电子身份验证及 eDDA 电子直接扣账授权功能，实现开户与支付的全流程线上化。',
      '2020年  接入辉立暗盘系统，打通同花顺开户通道，同时新增新加坡股票及美国股票交易服务，进一步拓展了客户的全球投资渠道。',
    ],
  },
  {
    era: '2010年代',
    items: [
      '2019年  Mobile 2.0 移动交易平台正式上线，同步推出全球债券及基金交易、程式交易、捷利开户服务，完善了移动端的服务能力。',
      '2018年  SBI Holdings 控股N2N-AFE，开启了亚洲区域另类交易系统的合作。',
      '2017年  N2N Connect 收购 AFE，公司更名为 N2N-AFE，联盛亚富资讯科技有限公司。',
      '2014年  完成港交所多接口对接，第一时间支持 OCG、CCOG、OMD-D，为客户提供全市场的合规数据与交易服务。',
      '2013年  推出用户端手机 APP，为用户提供移动行情服务。',
      '2013年  完成港交所新接口 OMD-C 对接支持，第一时间对接适配，满足最新合规要求，保障了客户交易的合规性与稳定性。',
      '2012年  推出设备托管服务，为券商客户提供设备托管服务，帮助客户降低 IT 运维成本，提升系统稳定性。',
    ],
  },
  {
    era: '2000年代',
    items: [
      '2008年  进军越南市场，在越南推出首版报价 / 交易 / 结算系统，并持续提供高稳定高价值技术与服务。',
      '2004年  推出首版交易 / 结算系统，在香港市场完成落地验证，为后续的海外扩张打下产品基础。',
      '2001年  推出 ASC 报价系统（Asian Securities Channel，亚洲证券频道），为香港的金融机构提供高效的实时股票报价服务。',
      '2000年  AFE Solutions成立，汤森路透 Thomson Reuters 引入台湾精诚 Systex 公司，合资创立 AFE Solutions 品牌。',
    ],
  },
  {
    era: '1990年代',
    items: [
      '1999年  推出新一代纯行情报价系统，为后续的 ASC 报价系统奠定了技术基础，也标志着香港市场行情服务的阶段性升级。',
      '1997年  收购 Bisnews，正式进入泰国市场，完成东南亚区域布局的关键一步。',
      '1993年  被路透集团（Reuters）收购，联盛亚富成为路透集团旗下的香港业务执行点，纳入路透的亚洲金融信息服务网络。',
      '1990年  业务扩张至澳门，为澳门金融机构提供股票报价服务。',
    ],
  },
  {
    era: '1980年代',
    items: [
      '1986年  大利市机发布，成为香港股票交易市场核心技术服务商，在香港行情终端市场渗透率近乎100%。',
      '1983年  联盛亚富正式成立，为港交所和香港券商提供实时股票报价服务。',
    ],
  },
];

function pickStr(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function unwrapComponent(v: unknown): Record<string, unknown> | undefined {
  if (!v || typeof v !== 'object') return undefined;
  let cur = v as Record<string, unknown>;
  if ('data' in cur && cur.data && typeof cur.data === 'object' && !Array.isArray(cur.data)) {
    cur = cur.data as Record<string, unknown>;
  }
  if ('attributes' in cur && cur.attributes && typeof cur.attributes === 'object') {
    cur = cur.attributes as Record<string, unknown>;
  }
  return cur;
}

function unwrapArray(v: unknown): Record<string, unknown>[] {
  if (Array.isArray(v)) return v.filter((x): x is Record<string, unknown> => !!x && typeof x === 'object');
  if (v && typeof v === 'object' && Array.isArray((v as { data?: unknown[] }).data)) {
    return (v as { data: unknown[] }).data.filter(
      (x): x is Record<string, unknown> => !!x && typeof x === 'object'
    );
  }
  return [];
}

function mapTimelineFromCms(
  data: GenericPageData | Record<string, unknown> | null | undefined
): { title: string; groups: { era: string; items: string[] }[]; footer: string } {
  const fallback = {
    title: '43 年深耕金融科技，与全球金融机构共成长',
    groups: TIMELINE_GROUPS,
    footer: '持续创新，为金融市场提供稳定可靠的技术服务',
  };

  if (!data || typeof data !== 'object') return fallback;
  const doc = unwrapComponent(data) ?? (data as Record<string, unknown>);
  const title = pickStr(doc.timelineTitle) || fallback.title;
  const footer = pickStr(doc.timelineFooter) || fallback.footer;

  const groupsRaw = unwrapArray(doc.timelineGroups);
  const groups = groupsRaw
    .map((g) => {
      const grp = unwrapComponent(g) ?? g;
      const era = pickStr(grp.era);
      const items = unwrapArray(grp.events)
        .map((e) => pickStr((unwrapComponent(e) ?? e).content))
        .filter(Boolean);
      if (!era || items.length === 0) return null;
      return { era, items };
    })
    .filter((g): g is { era: string; items: string[] } => !!g);

  return { title, groups: groups.length > 0 ? groups : fallback.groups, footer };
}

function splitYearAndBody(line: string): { year: string; body: string } {
  const text = line.trim();
  const m = text.match(/^(\d{4})年?\s*[：:\s]\s*(.+)$/);
  if (m) return { year: m[1], body: m[2].trim() };
  return { year: '其他', body: text };
}

function buildYearSessions(groups: { era: string; items: string[] }[]): { key: string; year: string; lines: string[] }[] {
  const sessions: { key: string; year: string; lines: string[] }[] = [];
  for (const group of groups) {
    for (const item of group.items) {
      const { year, body } = splitYearAndBody(item);
      const last = sessions[sessions.length - 1];
      // 相鄰且同年份時，併入同一個年份區塊（session）
      if (last && last.year === year) {
        last.lines.push(body);
      } else {
        sessions.push({
          key: `${group.era}-${year}-${sessions.length}`,
          year,
          lines: [body],
        });
      }
    }
  }
  return sessions;
}

export default async function AboutPage() {
  const aboutRes = await getAboutPage();
  const timeline = mapTimelineFromCms(aboutRes?.data ?? null);
  const timelineSessions = buildYearSessions(timeline.groups);

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

      <section className="about-chronicle-section">
        <div className="about-chronicle-bg" aria-hidden />
        <div className="about-chronicle-map" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <h2 className="about-chronicle-title text-center text-3xl font-extrabold tracking-wide text-slate-100 md:text-5xl">
            {timeline.title}
          </h2>

          <div className="about-chronicle-copy mx-auto mt-14 max-w-5xl">
            <div className="about-timeline-axis" aria-hidden />
            <div className="space-y-7 md:space-y-8">
              {timelineSessions.map((session) => (
                <article key={session.key} className="about-timeline-row">
                  <h3 className="about-timeline-year">{session.year}</h3>
                  <ul className="about-timeline-events">
                    {session.lines.map((line) => (
                      <li key={line} className="about-timeline-event-item">{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-14 text-center text-xl font-semibold tracking-wide text-slate-100 md:text-2xl">
            {timeline.footer}
          </p>
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
