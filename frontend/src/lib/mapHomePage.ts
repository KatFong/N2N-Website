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

/** 字串欄位去空白；CMS 填空白時改走預設或後備 */
function pickStr(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

/**
 * Strapi 元件可能是扁平物件，或包一層 { data } / { data: { attributes } }。
 * 若未解包，前台會讀不到欄位，造成「部分沒有顯示」。
 */
function unwrapStrapiComponent(v: unknown): Record<string, unknown> | undefined {
  if (v == null || typeof v !== 'object' || Array.isArray(v)) return undefined;
  let cur = v as Record<string, unknown>;
  if ('data' in cur && cur.data != null && typeof cur.data === 'object' && !Array.isArray(cur.data)) {
    cur = cur.data as Record<string, unknown>;
  }
  if (
    'attributes' in cur &&
    cur.attributes != null &&
    typeof cur.attributes === 'object' &&
    !Array.isArray(cur.attributes)
  ) {
    cur = cur.attributes as Record<string, unknown>;
  }
  return cur;
}

/** 可重複元件 / Relation 常為陣列或 { data: [...] }；子項可能再包一層 */
function unwrapStrapiEntryArray(v: unknown): Record<string, unknown>[] {
  let arr: unknown[] = [];
  if (Array.isArray(v)) arr = v;
  else if (v && typeof v === 'object' && Array.isArray((v as { data?: unknown[] }).data)) {
    arr = (v as { data: unknown[] }).data;
  }
  return arr.map((entry) => {
    const inner = unwrapStrapiComponent(entry);
    if (inner) return inner;
    return typeof entry === 'object' && entry !== null ? (entry as Record<string, unknown>) : {};
  });
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
  const heroRaw = unwrapStrapiComponent(doc?.hero);
  const coreRaw = unwrapStrapiComponent(doc?.coreAdvantagesSection);
  const productsRaw = unwrapStrapiComponent(doc?.productsOverview);
  const newsRaw = unwrapStrapiComponent(doc?.homeNewsSection);
  const contactRaw = unwrapStrapiComponent(doc?.contactCtaSection);

  /** Hero 對應 Strapi `sections.hero`：subtitle＝主標上行（公司名）、title＝主標下行（標語） */
  const hero: MappedHero = {
    ...HOME_HERO_DEFAULTS,
    title: pickStr(heroRaw?.title) || HOME_HERO_DEFAULTS.title,
    subtitle: pickStr(heroRaw?.subtitle) || HOME_HERO_DEFAULTS.subtitle,
    description: pickStr(heroRaw?.description) || HOME_HERO_DEFAULTS.description,
    backgroundImageUrl: mediaUrl(heroRaw?.backgroundImage as StrapiMedia) || HOME_HERO_DEFAULTS.backgroundImageUrl,
    ctaPrimaryLabel: pickStr(heroRaw?.ctaLabel) || HOME_HERO_DEFAULTS.ctaPrimaryLabel,
    ctaPrimaryLink: pickStr(heroRaw?.ctaLink) || HOME_HERO_DEFAULTS.ctaPrimaryLink,
    ctaSecondaryLabel: pickStr(heroRaw?.ctaSecondaryLabel) || HOME_HERO_DEFAULTS.ctaSecondaryLabel,
    ctaSecondaryLink: pickStr(heroRaw?.ctaSecondaryLink) || HOME_HERO_DEFAULTS.ctaSecondaryLink,
    showLogo: heroRaw?.showLogo !== false,
  };

  const statsRows = unwrapStrapiEntryArray(coreRaw?.stats);
  const statsFromCms =
    statsRows.length > 0
      ? statsRows.map((s) => {
          const row = unwrapStrapiComponent(s) ?? s;
          return {
            target: Number(row.value ?? 0),
            prefix: pickStr(row.prefix) || undefined,
            suffix: pickStr(row.suffix as string) || '+',
            unit: pickStr(row.unit as string) || '',
            label: pickStr(row.label as string) || '',
            format: (row.format === 'comma' ? 'comma' : 'int') as 'int' | 'comma',
          };
        })
      : HOME_CORE_ADV_DEFAULTS.stats;

  const cardRows = unwrapStrapiEntryArray(coreRaw?.advantageCards);
  const mappedCards =
    cardRows.length > 0
      ? cardRows.map((c) => {
          const row = unwrapStrapiComponent(c) ?? c;
          const title = pickStr(row.title) || String(row.title ?? '').trim();
          const desc = pickStr(row.description) || String(row.description ?? '').trim();
          return { title, desc };
        })
      : [];
  const cardsFromCms =
    mappedCards.filter((c) => c.title !== '').length > 0
      ? mappedCards.filter((c) => c.title !== '')
      : HOME_CORE_ADV_DEFAULTS.cards;

  const core: MappedCoreAdv = {
    ...HOME_CORE_ADV_DEFAULTS,
    moduleLabel: pickStr(coreRaw?.moduleLabel) || HOME_CORE_ADV_DEFAULTS.moduleLabel,
    titleZh: pickStr(coreRaw?.titleZh) || HOME_CORE_ADV_DEFAULTS.titleZh,
    titleEn: pickStr(coreRaw?.titleEn) || HOME_CORE_ADV_DEFAULTS.titleEn,
    introText: pickStr(coreRaw?.introText) || HOME_CORE_ADV_DEFAULTS.introText,
    statStripBackgroundUrl:
      mediaUrl(coreRaw?.statStripBackgroundImage as StrapiMedia) || HOME_CORE_ADV_DEFAULTS.statStripBackgroundUrl,
    stats: statsFromCms,
    cards: cardsFromCms,
  };

  const cmsProducts = unwrapStrapiEntryArray(productsRaw?.products);
  const items: HomeProductCardDefault[] =
    cmsProducts.length > 0
      ? cmsProducts.map((p) => {
          const row = unwrapStrapiComponent(p) ?? p;
          const link = pickStr(row.link) || `/product/${HOME_PRODUCTS_DEFAULTS[0].slug}`;
          const slug = slugFromLink(link);
          const iconStr = row.icon as string | undefined;
          const icon: ProductIconId = isProductIcon(iconStr) ? iconStr : 'institutional';
          const cover =
            mediaUrl(row.coverImage as StrapiMedia) ||
            HOME_PRODUCTS_DEFAULTS.find((d) => d.slug === slug)?.coverImage ||
            HOME_PRODUCTS_DEFAULTS[0].coverImage;
          return {
            slug,
            title: pickStr(row.name) || slug,
            subtitle: pickStr(row.subtitle) || undefined,
            description: pickStr(row.description) || '',
            icon,
            coverImage: cover,
          };
        })
      : HOME_PRODUCTS_DEFAULTS;

  const products: MappedProductsSection = {
    moduleLabel: pickStr(productsRaw?.moduleLabel) || HOME_PRODUCTS_SECTION_DEFAULTS.moduleLabel,
    titleZh: pickStr(productsRaw?.titleZh) || HOME_PRODUCTS_SECTION_DEFAULTS.titleZh,
    titleEn: pickStr(productsRaw?.titleEn) || HOME_PRODUCTS_SECTION_DEFAULTS.titleEn,
    introText: pickStr(productsRaw?.introText) || HOME_PRODUCTS_SECTION_DEFAULTS.introText,
    items,
  };

  const refArticles = pressAndAnnouncementArticles;
  const cmsNewsItems = unwrapStrapiEntryArray(newsRaw?.newsItems);

  const featuredTitle =
    pickStr(newsRaw?.featuredTitle) || refArticles[0]?.title || HOME_NEWS_DEFAULTS.featuredTitle;
  const featuredLink =
    pickStr(newsRaw?.featuredLink) ||
    (refArticles[0] ? `/news-insights/${refArticles[0].slug}` : HOME_NEWS_DEFAULTS.featuredLink);
  const featuredImageUrl =
    mediaUrl(newsRaw?.featuredImage as StrapiMedia) || HOME_NEWS_DEFAULTS.featuredImageUrl;

  let list: { title: string; excerpt: string; link: string }[];
  if (cmsNewsItems.length > 0) {
    const fromCms = cmsNewsItems
      .map((n) => {
        const row = unwrapStrapiComponent(n) ?? n;
        return {
          title: pickStr(row.title),
          excerpt: pickStr(row.excerpt) || '',
          link: pickStr(row.link) || '/news-insights',
        };
      })
      .filter((row) => row.title !== '');
    list =
      fromCms.length > 0
        ? fromCms
        : refArticles.slice(1, 3).map((a) => ({
            title: a.title,
            excerpt: a.excerpt || '',
            link: `/news-insights/${a.slug}`,
          }));
  } else {
    list = refArticles.slice(1, 3).map((a) => ({
      title: a.title,
      excerpt: a.excerpt || '',
      link: `/news-insights/${a.slug}`,
    }));
  }

  const news: MappedNews = {
    moduleLabel: pickStr(newsRaw?.moduleLabel) || HOME_NEWS_DEFAULTS.moduleLabel,
    titleZh: pickStr(newsRaw?.titleZh) || HOME_NEWS_DEFAULTS.titleZh,
    titleEn: pickStr(newsRaw?.titleEn) || HOME_NEWS_DEFAULTS.titleEn,
    introText: pickStr(newsRaw?.introText) || HOME_NEWS_DEFAULTS.introText,
    featuredTitle,
    featuredLink,
    featuredImageUrl,
    moreButtonLabel: pickStr(newsRaw?.moreButtonLabel) || HOME_NEWS_DEFAULTS.moreButtonLabel,
    moreButtonLink: pickStr(newsRaw?.moreButtonLink) || HOME_NEWS_DEFAULTS.moreButtonLink,
    list,
  };

  const contact: MappedContactCta = {
    ...HOME_CONTACT_CTA_DEFAULTS,
    title: pickStr(contactRaw?.title) || HOME_CONTACT_CTA_DEFAULTS.title,
    description: pickStr(contactRaw?.description) || HOME_CONTACT_CTA_DEFAULTS.description,
    buttonLabel: pickStr(contactRaw?.buttonLabel) || HOME_CONTACT_CTA_DEFAULTS.buttonLabel,
    buttonLink: pickStr(contactRaw?.buttonLink) || HOME_CONTACT_CTA_DEFAULTS.buttonLink,
    backgroundImageUrl: mediaUrl(contactRaw?.backgroundImage as StrapiMedia) || HOME_CONTACT_CTA_DEFAULTS.backgroundImageUrl,
  };

  return { hero, core, products, news, contact };
}
