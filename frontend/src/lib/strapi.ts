const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
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

async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, string> = {},
  options: RequestInit = {}
): Promise<T> {
  const mergedOptions: RequestInit = {
    headers: BASE_HEADERS(),
    next: { revalidate: 60 },
    ...options,
  };

  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(`Strapi fetch error: ${response.status} ${response.statusText} - ${requestUrl}`);
    return null as T;
  }

  const data = await response.json();
  return data;
}

async function fetchAPIRaw<T>(pathWithQuery: string, options: RequestInit = {}): Promise<T> {
  const mergedOptions: RequestInit = {
    headers: BASE_HEADERS(),
    next: { revalidate: 0 },
    ...options,
  };

  const requestUrl = `${STRAPI_URL}/api${pathWithQuery}`;
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(`Strapi fetch error: ${response.status} ${response.statusText} - ${requestUrl}`);
    return null as T;
  }

  return response.json();
}

function buildPopulate(fields: string[]): string {
  return fields.map((f) => `populate[${f}][populate]=*`).join('&');
}

export async function getHomePage() {
  const q = [
    'populate[hero][populate]=*',
    'populate[coreAdvantagesSection][populate]=*',
    'populate[productsOverview][populate]=*',
    'populate[homeNewsSection][populate]=*',
    'populate[contactCtaSection][populate]=*',
    'populate[seo]=*',
  ].join('&');
  return fetchAPIRaw<StrapiResponse<HomePageData | Record<string, unknown> | null>>(`/home-page?${q}`);
}

export async function getProductsServicesPage() {
  const q = buildPopulate(['hero', 'productCards', 'sections', 'seo']);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/products-services?${q}`);
}

export async function getGlobalBusinessPage() {
  const q = buildPopulate(['hero', 'regions', 'sections', 'seo']);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/global-business?${q}`);
}

export async function getBusinessPartnershipPage() {
  const q = buildPopulate(['hero', 'partnerBenefits', 'sections', 'seo']);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/business-partnership?${q}`);
}

export async function getNewsInsightsPage() {
  const q = buildPopulate(['hero', 'seo']);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/news-insights-page?${q}`);
}

export async function getAboutPage() {
  const q = buildPopulate(['hero', 'companyImage', 'teamMembers', 'sections', 'seo']);
  return fetchAPIRaw<StrapiResponse<GenericPageData>>(`/about-page?${q}`);
}

export async function getPrivacyPolicyPage() {
  const q = buildPopulate(['seo']);
  return fetchAPIRaw<StrapiResponse<PrivacyPolicyData>>(`/privacy-policy?${q}`);
}

export async function getArticles(page = 1, pageSize = 9) {
  const q = buildPopulate(['coverImage', 'seo']);
  return fetchAPIRaw<StrapiResponse<ArticleData[]>>(
    `/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc&${q}`
  );
}

export async function getArticleBySlug(slug: string) {
  const q = buildPopulate(['coverImage', 'seo']);
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

export interface Hero {
  title: string;
  subtitle?: string;
  description?: string;
  showLogo?: boolean;
  backgroundImage?: StrapiMedia;
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
