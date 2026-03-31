const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://n2n-admin.zeabur.app';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export function getStrapiMedia(media: StrapiMedia | null | undefined): string | null {
  if (!media) return null;
  if (media.url.startsWith('http')) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

const BASE_HEADERS = () => ({
  'Content-Type': 'application/json',
  ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
});

type FetchAPIRawOptions = RequestInit & {
  /**
   * Single Type 尚未在后台建立并发布、或未对 Public 开放 find 时，REST 常回 404／403；
   * 前端已有程式后备时可略过 console.error，避免主控台洗版。
   */
  quietIfNoCmsEntry?: boolean;
};

async function fetchAPIRaw<T>(pathWithQuery: string, options: FetchAPIRawOptions = {}): Promise<T> {
  const { quietIfNoCmsEntry, ...fetchInit } = options;
  const mergedOptions: RequestInit = {
    headers: BASE_HEADERS(),
    cache: 'no-store',
    next: { revalidate: 0 },
    ...fetchInit,
  };

  const requestUrl = `${STRAPI_URL}/api${pathWithQuery.startsWith('/') ? pathWithQuery : '/' + pathWithQuery}`;
  let response: Response;
  try {
    response = await fetch(requestUrl, mergedOptions);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(
      `[Strapi] 無法連線（${msg}）。已略過 \`${requestUrl.split('?')[0]}\`，使用內建內容。需 CMS 時請在 backend 執行 \`npm run develop\`。`
    );
    return null as T;
  }

  if (!response.ok) {
    if (quietIfNoCmsEntry && (response.status === 404 || response.status === 403)) {
      return null as T;
    }
    let detail = '';
    try {
      const body = (await response.clone().json()) as { error?: { message?: string } };
      detail = body?.error?.message ? ` — ${body.error.message}` : '';
    } catch {
      /* ignore */
    }
    console.error(`Strapi fetch error: ${response.status} ${response.statusText} - ${requestUrl}${detail}`);
    return null as T;
  }

  try {
    return await response.json();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`Strapi JSON parse failed: ${requestUrl} — ${msg}`);
    return null as T;
  }
}

/**
 * Strapi 5 REST：`populate[0]=a&populate[1]=a.nested`（见官方 Populate 文件）。
 * 勿使用 `populate[x][populate]=*`，易触发 400 ValidationError。
 */
function buildPopulateQuery(paths: string[]): string {
  return paths.map((path, i) => `populate[${i}]=${encodeURIComponent(path)}`).join('&');
}

const HOME_PAGE_POPULATE_PATHS = [
  'hero',
  'hero.backgroundImage',
  'coreAdvantagesSection',
  'coreAdvantagesSection.statStripBackgroundImage',
  'coreAdvantagesSection.stats',
  'coreAdvantagesSection.advantageCards',
  'productsOverview',
  'productsOverview.products',
  'productsOverview.products.coverImage',
  'homeNewsSection',
  'homeNewsSection.featuredImage',
  'homeNewsSection.newsItems',
  'contactCtaSection',
  'contactCtaSection.backgroundImage',
  'seo',
  'seo.shareImage',
] as const;

export async function getHomePage() {
  const q = buildPopulateQuery([...HOME_PAGE_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<HomePageData | Record<string, unknown> | null>>(`/home-page?${q}`);
}

const FOOTER_POPULATE_PATHS = ['columns', 'columns.links', 'legalLinks'] as const;

/** 全站頁尾（Single Type `footer`）；404/403 時回 null，前台用 mapFooter 預設 */
export async function getFooter() {
  const q = buildPopulateQuery([...FOOTER_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<Record<string, unknown> | null>>(`/footer?${q}`, {
    quietIfNoCmsEntry: true,
  });
}

export async function getGlobalBusinessPage() {
  const q = buildPopulateQuery([
    'hero',
    'hero.backgroundImage',
    'regions',
    'regions.icon',
    'sections',
    'sections.image',
    'seo',
    'seo.shareImage',
  ]);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/global-business?${q}`);
}

export async function getBusinessPartnershipPage() {
  const q = buildPopulateQuery([
    'hero',
    'hero.backgroundImage',
    'partnerBenefits',
    'partnerBenefits.icon',
    'sections',
    'sections.image',
    'seo',
    'seo.shareImage',
  ]);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/business-partnership?${q}`);
}

export async function getNewsInsightsPage() {
  const q = buildPopulateQuery(['hero', 'hero.backgroundImage', 'seo', 'seo.shareImage']);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/news-insights-page?${q}`);
}

export async function getAboutPage() {
  const q = buildPopulateQuery([
    'hero',
    'hero.backgroundImage',
    'companyImage',
    'teamMembers',
    'teamMembers.icon',
    'sections',
    'sections.image',
    'seo',
    'seo.shareImage',
  ]);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/about-page?${q}`);
}

const CONTACT_PAGE_POPULATE_PATHS = [
  'offices',
  'offices.phones',
  'offices.directEmails',
  'offices.enquiryEmails',
  'seo',
  'seo.shareImage',
] as const;

export interface ContactPageData {
  heroTitle?: string;
  sectionTitle?: string;
  offices?: unknown;
  seo?: SEO;
}

export async function getContactPage() {
  const q = buildPopulateQuery([...CONTACT_PAGE_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<ContactPageData | Record<string, unknown> | null>>(`/contact-page?${q}`);
}

/** Trading / Settlement 子页共用 Strapi 栏位与 populate */
const SOLUTION_STYLE_PAGE_POPULATE_PATHS = [
  'spotlight',
  'spotlight.image',
  'spotlight.bodyLines',
  'spotlight.coreHighlightLines',
  'sixGridItems',
  'sixGridItems.lines',
  'footerCta',
  'features',
  'features.bullets',
  'seo',
  'seo.shareImage',
] as const;

export interface TradingSolutionPageData {
  heroTitle?: string;
  heroSubtitle?: string;
  spotlight?: unknown;
  sixGridItems?: unknown;
  gridSectionCtaLabel?: string;
  gridSectionCtaHref?: string;
  footerCta?: unknown;
  features?: unknown;
  seo?: SEO;
}

export type SettlementSolutionPageData = TradingSolutionPageData;

export async function getTradingSolutionPage() {
  const q = buildPopulateQuery([...SOLUTION_STYLE_PAGE_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<TradingSolutionPageData | Record<string, unknown> | null>>(
    `/trading-solution-page?${q}`,
    { quietIfNoCmsEntry: true }
  );
}

export async function getSettlementSolutionPage() {
  const q = buildPopulateQuery([...SOLUTION_STYLE_PAGE_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<SettlementSolutionPageData | Record<string, unknown> | null>>(
    `/settlement-solution-page?${q}`,
    { quietIfNoCmsEntry: true }
  );
}

const FINANCIAL_INFORMATION_SERVICE_PAGE_POPULATE_PATHS = ['bullets', 'seo', 'seo.shareImage'] as const;

export async function getFinancialInformationServicePage() {
  const q = buildPopulateQuery([...FINANCIAL_INFORMATION_SERVICE_PAGE_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<Record<string, unknown> | null>>(
    `/financial-information-service-page?${q}`,
    { quietIfNoCmsEntry: true }
  );
}

export async function getServerHostingSolutionPage() {
  const q = buildPopulateQuery([...SOLUTION_STYLE_PAGE_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<TradingSolutionPageData | Record<string, unknown> | null>>(
    `/server-hosting-page?${q}`,
    { quietIfNoCmsEntry: true }
  );
}

/** Collection：`product-line-pages`，依 `slug` 篩選一筆（與 Trading 子頁相同 populate） */
export async function getProductLinePageBySlug(slug: string) {
  const q = buildPopulateQuery([...SOLUTION_STYLE_PAGE_POPULATE_PATHS]);
  return fetchAPIRaw<StrapiResponse<Record<string, unknown>[]>>(
    `/product-line-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&${q}`,
    { quietIfNoCmsEntry: true }
  );
}

export async function getPrivacyPolicyPage() {
  const q = buildPopulateQuery(['seo', 'seo.shareImage']);
  return fetchAPIRaw<StrapiResponse<PrivacyPolicyData>>(`/privacy-policy?${q}`);
}

export async function getArticles(page = 1, pageSize = 9) {
  const q = buildPopulateQuery(['coverImage', 'seo', 'seo.shareImage']);
  return fetchAPIRaw<StrapiResponse<ArticleData[]>>(
    `/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc&${q}`
  );
}

export async function getArticleBySlug(slug: string) {
  const q = buildPopulateQuery(['coverImage', 'seo', 'seo.shareImage']);
  return fetchAPIRaw<StrapiResponse<ArticleData[]>>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&${q}`
  );
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  shareImage?: StrapiMedia;
}

/** Strapi `sections.hero`；首页主标：subtitle＝上行（公司名）、title＝下行（标语） */
export interface Hero {
  title: string;
  subtitle?: string;
  description?: string;
  showLogo?: boolean;
  backgroundImage?: StrapiMedia;
  /** 與 Strapi `sections.hero` 一致；舊欄位 ctaLabel／ctaLink 仍相容 */
  Button1?: string;
  Button1Link?: string;
  Button2?: string;
  Button2Link?: string;
  ctaLabel?: string;
  ctaLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
}

/** CMS stats row for `StatsCounter` */
export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
}

export interface FeatureCard {
  id: number;
  title: string;
  description?: string;
  icon?: StrapiMedia | null;
  link?: string | null;
}

export interface ContentBlock {
  id: number;
  title?: string;
  body?: string;
  image?: StrapiMedia;
  imagePosition?: 'left' | 'right' | 'top' | 'bottom';
}

export interface HomePageData {
  hero?: Hero;
  introTitle?: string;
  introText?: string;
  introImage?: StrapiMedia;
  featureCards?: FeatureCard[];
  sections?: ContentBlock[];
  seo?: SEO;
  coreAdvantagesSection?: Record<string, unknown>;
  productsOverview?: Record<string, unknown>;
  homeNewsSection?: Record<string, unknown>;
  contactCtaSection?: Record<string, unknown>;
}

export interface GenericPageData {
  hero?: Hero;
  pageTitle?: string;
  pageDescription?: string;
  productCards?: FeatureCard[];
  partnerBenefits?: FeatureCard[];
  teamMembers?: FeatureCard[];
  regions?: FeatureCard[];
  sections?: ContentBlock[];
  contactEmail?: string;
  mission?: string;
  vision?: string;
  companyImage?: StrapiMedia;
  teamTitle?: string;
  pageDescriptionText?: string;
  seo?: SEO;
}

export interface PrivacyPolicyData {
  pageTitle?: string;
  lastUpdated?: string;
  content?: string;
  seo?: SEO;
}

export interface ArticleData {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: StrapiMedia;
  category?: string;
  publishedDate?: string;
  author?: string;
  tags?: string;
  seo?: SEO;
  publishedAt?: string;
  createdAt?: string;
}
