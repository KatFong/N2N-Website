import type { ProductIconId } from '@/lib/productIcons';

export type CoreAdvStat = {
  target: number;
  prefix?: string;
  suffix?: string;
  unit: string;
  label: string;
  format?: 'int' | 'comma';
};

/** 核心优势卡片图示（对应 lucide：Clock / Lock / Globe） */
export type CoreAdvCardIcon = 'clock' | 'lock' | 'globe';

/** 首页各区预设（Strapi 未填或离线时使用） */
export const HOME_HERO_DEFAULTS = {
  title: '43年专业 | 金融科技的可靠伙伴',
  subtitle: '联盛亚富资讯科技有限公司（N2N-AFE）',
  description: '为全球证券、期货、基金及债券市场提供快速、准确、可靠的交易与结算解决方案',
  backgroundImageUrl: '/about/geometric-building2.jpg',
  ctaPrimaryLabel: '了解我们的产品',
  ctaPrimaryLink: '/#product-overview',
  ctaSecondaryLabel: '全球业务网络',
  ctaSecondaryLink: '/global-business',
  showLogo: true,
};

export const HOME_CORE_ADV_DEFAULTS: {
  moduleLabel: string;
  titleZh: string;
  titleEn: string;
  statStripBackgroundUrl: string;
  stats: CoreAdvStat[];
  cards: { title: string; desc: string; icon: CoreAdvCardIcon; href: string }[];
} = {
  moduleLabel: 'Module 02',
  titleZh: '核心优势',
  titleEn: 'Core Advantages',
  statStripBackgroundUrl: '/about/geometric-building2.jpg',
  stats: [
    { target: 43, suffix: '+', unit: '年', label: '成立时间' },
    { target: 12, suffix: '+', unit: '', label: '全球服务点' },
    { target: 30, suffix: '+', unit: '', label: '连结交易所' },
    { target: 500, suffix: '+', unit: '', label: '服务客户' },
    { target: 80, prefix: '超', suffix: '%', unit: '', label: '香港市场渗透' },
  ],
  cards: [
    {
      icon: 'clock',
      title: '超43年经验',
      desc: '自1983年成立以来，持续为金融业界提供稳定可靠的交易解决方案。',
      href: '/about.html',
    },
    {
      icon: 'lock',
      title: '安全合规',
      desc: '符合香港证监会要求，位列香港交易所（HKEX）BSS 供应商名录。',
      href: '/contact.html',
    },
    {
      icon: 'globe',
      title: '全球网络',
      desc: '累计服务超过 500 家券商，网络覆盖亚洲主要金融市场。',
      href: '/global-business.html',
    },
  ],
};

export type HomeProductCardDefault = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: ProductIconId;
  coverImage: string;
};

export const HOME_PRODUCTS_DEFAULTS: HomeProductCardDefault[] = [
  {
    slug: 'trading-solution',
    title: '机构解决方案',
    subtitle: '机构解决方案',
    description:
      '券商基础设施：为券商提供稳定、高效、安全的交易、报价与结算系统，支持全球多市场接入。',
    icon: 'institutional',
    coverImage: '/about/geometric-building2.jpg',
  },
  {
    slug: 'virtual-assets',
    title: '创新金融科技',
    subtitle: '创新金融科技',
    description:
      '虚拟资产与量化交易，提供符合香港监管要求的虚拟资产交易解决方案，以及强大的n2nquant量化平台，把握新兴市场机遇。',
    icon: 'fintech',
    coverImage: '/product-overview/half-globe.png',
  },
  {
    slug: 'smp5',
    title: '个人投资者工具',
    subtitle: '个人投资者工具',
    description:
      '个人投资利器，股市宝SMP5功能丰富实用，策略助手Master Picks集成各流派分析框架，为个人投资者提供专业级的数据与决策支持。',
    icon: 'retail',
    coverImage: '/about/geometric-building2.jpg',
  },
  {
    slug: 'server-hosting',
    title: '服务器托管和专线服务',
    subtitle: 'Server Hosting and Leased Line Services',
    description:
      '一站式服务：IT 硬件与机房环境、全天候监察、符合证监会科技安全要求、系统设置与维护，技术稳定可靠。',
    icon: 'hosting',
    coverImage: '/product-overview/half-globe.png',
  },
];

export const HOME_PRODUCTS_SECTION_DEFAULTS = {
  moduleLabel: 'Module 03',
  titleZh: '产品与服务',
  titleEn: 'Products & Services',
};

export const HOME_NEWS_DEFAULTS = {
  moduleLabel: 'Module 04',
  titleZh: '新闻与活动',
  titleEn: 'News & Events',
  featuredTitle: '',
  featuredLink: '/news-insights',
  featuredImageUrl: '/about/geometric-building2.jpg',
  moreButtonLabel: '更多',
  moreButtonLink: '/news-insights',
};

export const HOME_CONTACT_CTA_DEFAULTS = {
  title: '准备好迎接金融科技的未来了吗？',
  description: '立即联系我们的专家，获取为您量身定制的解决方案。',
  buttonLabel: '免费咨询',
  buttonLink: '/contact',
  backgroundImageUrl: null as string | null,
};
