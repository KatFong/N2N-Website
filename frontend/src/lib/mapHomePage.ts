import { getStrapiMedia, type StrapiMedia } from '@/lib/strapi';

function unwrapMedia(m: unknown): StrapiMedia | null {
  if (!m) return null;
  if (typeof m === 'object' && m !== null && 'url' in m && typeof (m as StrapiMedia).url === 'string') {
    return m as StrapiMedia;
  }
  if (typeof m === 'object' && m !== null && 'data' in m) {
    const inner = (m as { data?: StrapiMedia | null }).data;
    return inner ?? null;
  }
  return null;
}
import {
  HOME_CONTACT_CTA_DEFAULTS,
  HOME_CORE_ADV_DEFAULTS,
  HOME_HERO_DEFAULTS,
  HOME_NEWS_DEFAULTS,
  HOME_PRODUCTS_DEFAULTS,
  HOME_PRODUCTS_SECTION_DEFAULTS,
  type CoreAdvStat,
  type HomeProductCardDefault,
} from '@/lib/homePageDefaults';
import type { ProductIconId } from '@/lib/productOverview';
import { pressAndAnnouncementArticles } from '@/lib/referenceContent';

const PRODUCT_ICONS: ProductIconId[] = ['institutional', 'fintech', 'retail', 'hosting'];

function isProductIcon(v: string | undefined): v is ProductIconId {
  return !!v && PRODUCT_ICONS.includes(v as ProductIconId);
}

function mediaUrl(m: unknown): string | null {
  return getStrapiMedia(unwrapMedia(m));
}

function pickDocument<T extends Record<string, unknown>>(raw: unknown): T | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if ('attributes' in o && o.attributes && typeof o.attributes === 'object') {
    return o.attributes as T;
  }
  return o as T;
}

function slugFromLink(link: string | undefined): string {
  if (!link) return HOME_PRODUCTS_DEFAULTS[0].slug;
  const clean = link.split('?')[0]?.replace(/\.html$/i, '') ?? '';
  const m = clean.match(/\/product\/([^/]+)\/?$/);
  return m?.[1] ?? HOME_PRODUCTS_DEFAULTS[0].slug;
}

export type MappedHero = typeof HOME_HERO_DEFAULTS;
export type MappedCoreAdv = Omit<typeof HOME_CORE_ADV_DEFAULTS, 'stats'> & { stats: CoreAdvStat[] };
export type MappedProductsSection = typeof HOME_PRODUCTS_SECTION_DEFAULTS & { items: HomeProductCardDefault[] };
export type MappedNews = {
  moduleLabel: string;
  titleZh: string;
  titleEn: string;
  introText: string;
  featuredTitle: string;
  featuredLink: string;
  featuredImageUrl: string;
  moreButtonLabel: string;
  moreButtonLink: string;
  list: { title: string; excerpt: string; link: string }[];
};
export type MappedContactCta = typeof HOME_CONTACT_CTA_DEFAULTS;

function defaultsBundle(): {
  hero: MappedHero;
  core: MappedCoreAdv;
  products: MappedProductsSection;
  news: MappedNews;
  contact: MappedContactCta;
} {
  const refArticles = pressAndAnnouncementArticles;
  const news: MappedNews = {
    ...HOME_NEWS_DEFAULTS,
    titleEn: HOME_NEWS_DEFAULTS.titleEn,
    featuredTitle: refArticles[0]?.title || '',
    featuredLink: refArticles[0] ? `/news-insights/${refArticles[0].slug}` : HOME_NEWS_DEFAULTS.featuredLink,
    list: refArticles.slice(1, 3).map((a) => ({
      title: a.title,
      excerpt: a.excerpt || '',
      link: `/news-insights/${a.slug}`,
    })),
  };
  return {
    hero: { ...HOME_HERO_DEFAULTS },
    core: { ...HOME_CORE_ADV_DEFAULTS },
    products: { ...HOME_PRODUCTS_SECTION_DEFAULTS, items: [...HOME_PRODUCTS_DEFAULTS] },
    news,
    contact: { ...HOME_CONTACT_CTA_DEFAULTS },
  };
}

export function mapHomePageFromStrapi(apiData: unknown): {
  hero: MappedHero;
  core: MappedCoreAdv;
  products: MappedProductsSection;
  news: MappedNews;
  contact: MappedContactCta;
} {
  if (apiData == null) return defaultsBundle();

  const doc = pickDocument<Record<string, unknown>>(apiData);
  if (!doc || Object.keys(doc).length === 0) return defaultsBundle();
  const heroRaw = doc?.hero as Record<string, unknown> | undefined;
  const coreRaw = doc?.coreAdvantagesSection as Record<string, unknown> | undefined;
  const productsRaw = doc?.productsOverview as Record<string, unknown> | undefined;
  const newsRaw = doc?.homeNewsSection as Record<string, unknown> | undefined;
  const contactRaw = doc?.contactCtaSection as Record<string, unknown> | undefined;

  const hero: MappedHero = {
    ...HOME_HERO_DEFAULTS,
    title: (heroRaw?.title as string) || HOME_HERO_DEFAULTS.title,
    subtitle: (heroRaw?.subtitle as string) || HOME_HERO_DEFAULTS.subtitle,
    description: (heroRaw?.description as string) || HOME_HERO_DEFAULTS.description,
    backgroundImageUrl: mediaUrl(heroRaw?.backgroundImage as StrapiMedia) || HOME_HERO_DEFAULTS.backgroundImageUrl,
    ctaPrimaryLabel: (heroRaw?.ctaLabel as string) || HOME_HERO_DEFAULTS.ctaPrimaryLabel,
    ctaPrimaryLink: (heroRaw?.ctaLink as string) || HOME_HERO_DEFAULTS.ctaPrimaryLink,
    ctaSecondaryLabel: (heroRaw?.ctaSecondaryLabel as string) || HOME_HERO_DEFAULTS.ctaSecondaryLabel,
    ctaSecondaryLink: (heroRaw?.ctaSecondaryLink as string) || HOME_HERO_DEFAULTS.ctaSecondaryLink,
    showLogo: heroRaw?.showLogo !== false,
  };

  const statsFromCms =
    Array.isArray(coreRaw?.stats) && coreRaw.stats.length > 0
      ? (coreRaw.stats as Record<string, unknown>[]).map((s) => ({
          target: Number(s.value ?? 0),
          prefix: (s.prefix as string) || undefined,
          suffix: (s.suffix as string) ?? '+',
          unit: (s.unit as string) || '',
          label: (s.label as string) || '',
          format: (s.format === 'comma' ? 'comma' : 'int') as 'int' | 'comma',
        }))
      : HOME_CORE_ADV_DEFAULTS.stats;

  const cardsFromCms =
    Array.isArray(coreRaw?.advantageCards) && coreRaw.advantageCards.length > 0
      ? (coreRaw.advantageCards as Record<string, unknown>[]).map((c) => ({
          title: String(c.title ?? ''),
          desc: String(c.description ?? ''),
        }))
      : HOME_CORE_ADV_DEFAULTS.cards;

  const core: MappedCoreAdv = {
    ...HOME_CORE_ADV_DEFAULTS,
    moduleLabel: (coreRaw?.moduleLabel as string) || HOME_CORE_ADV_DEFAULTS.moduleLabel,
    titleZh: (coreRaw?.titleZh as string) || HOME_CORE_ADV_DEFAULTS.titleZh,
    titleEn: (coreRaw?.titleEn as string) || HOME_CORE_ADV_DEFAULTS.titleEn,
    introText: (coreRaw?.introText as string) || HOME_CORE_ADV_DEFAULTS.introText,
    statStripBackgroundUrl:
      mediaUrl(coreRaw?.statStripBackgroundImage as StrapiMedia) || HOME_CORE_ADV_DEFAULTS.statStripBackgroundUrl,
    stats: statsFromCms,
    cards: cardsFromCms,
  };

  const cmsProducts = Array.isArray(productsRaw?.products) ? (productsRaw?.products as Record<string, unknown>[]) : [];
  const items: HomeProductCardDefault[] =
    cmsProducts.length > 0
      ? cmsProducts.map((p) => {
          const link = (p.link as string) || `/product/${HOME_PRODUCTS_DEFAULTS[0].slug}`;
          const slug = slugFromLink(link);
          const iconStr = p.icon as string | undefined;
          const icon: ProductIconId = isProductIcon(iconStr) ? iconStr : 'institutional';
          const cover =
            mediaUrl(p.coverImage as StrapiMedia) ||
            HOME_PRODUCTS_DEFAULTS.find((d) => d.slug === slug)?.coverImage ||
            HOME_PRODUCTS_DEFAULTS[0].coverImage;
          return {
            slug,
            title: (p.name as string) || slug,
            subtitle: (p.subtitle as string) || undefined,
            description: (p.description as string) || '',
            icon,
            coverImage: cover,
          };
        })
      : HOME_PRODUCTS_DEFAULTS;

  const products: MappedProductsSection = {
    moduleLabel: (productsRaw?.moduleLabel as string) || HOME_PRODUCTS_SECTION_DEFAULTS.moduleLabel,
    titleZh: (productsRaw?.titleZh as string) || HOME_PRODUCTS_SECTION_DEFAULTS.titleZh,
    titleEn: (productsRaw?.titleEn as string) || HOME_PRODUCTS_SECTION_DEFAULTS.titleEn,
    introText: (productsRaw?.introText as string) || HOME_PRODUCTS_SECTION_DEFAULTS.introText,
    items,
  };

  const refArticles = pressAndAnnouncementArticles;
  const cmsNewsItems = Array.isArray(newsRaw?.newsItems) ? (newsRaw?.newsItems as Record<string, unknown>[]) : [];

  const featuredTitle =
    (newsRaw?.featuredTitle as string) ||
    refArticles[0]?.title ||
    HOME_NEWS_DEFAULTS.featuredTitle;
  const featuredLink =
    (newsRaw?.featuredLink as string) ||
    (refArticles[0] ? `/news-insights/${refArticles[0].slug}` : HOME_NEWS_DEFAULTS.featuredLink);
  const featuredImageUrl =
    mediaUrl(newsRaw?.featuredImage as StrapiMedia) || HOME_NEWS_DEFAULTS.featuredImageUrl;

  let list: { title: string; excerpt: string; link: string }[];
  if (cmsNewsItems.length > 0) {
    list = cmsNewsItems.slice(0, 3).map((n) => ({
      title: String(n.title ?? ''),
      excerpt: String(n.excerpt ?? ''),
      link: String(n.link ?? '/news-insights'),
    }));
  } else {
    list = refArticles.slice(1, 3).map((a) => ({
      title: a.title,
      excerpt: a.excerpt || '',
      link: `/news-insights/${a.slug}`,
    }));
  }

  const news: MappedNews = {
    moduleLabel: (newsRaw?.moduleLabel as string) || HOME_NEWS_DEFAULTS.moduleLabel,
    titleZh: (newsRaw?.titleZh as string) || HOME_NEWS_DEFAULTS.titleZh,
    titleEn: (newsRaw?.titleEn as string) || HOME_NEWS_DEFAULTS.titleEn,
    introText: (newsRaw?.introText as string) || HOME_NEWS_DEFAULTS.introText,
    featuredTitle,
    featuredLink,
    featuredImageUrl,
    moreButtonLabel: (newsRaw?.moreButtonLabel as string) || HOME_NEWS_DEFAULTS.moreButtonLabel,
    moreButtonLink: (newsRaw?.moreButtonLink as string) || HOME_NEWS_DEFAULTS.moreButtonLink,
    list,
  };

  const contact: MappedContactCta = {
    ...HOME_CONTACT_CTA_DEFAULTS,
    title: (contactRaw?.title as string) || HOME_CONTACT_CTA_DEFAULTS.title,
    description: (contactRaw?.description as string) || HOME_CONTACT_CTA_DEFAULTS.description,
    buttonLabel: (contactRaw?.buttonLabel as string) || HOME_CONTACT_CTA_DEFAULTS.buttonLabel,
    buttonLink: (contactRaw?.buttonLink as string) || HOME_CONTACT_CTA_DEFAULTS.buttonLink,
    backgroundImageUrl: mediaUrl(contactRaw?.backgroundImage as StrapiMedia) || HOME_CONTACT_CTA_DEFAULTS.backgroundImageUrl,
  };

  return { hero, core, products, news, contact };
}
