import { getStrapiMedia, type StrapiMedia } from '@/lib/strapi';
import {
  SETTLEMENT_SOLUTION_FEATURE_ROWS,
  SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
  SETTLEMENT_SOLUTION_HERO,
  SETTLEMENT_SOLUTION_SIX_GRID,
  SETTLEMENT_SOLUTION_SPOTLIGHT,
} from '@/lib/settlementSolutionContent';
import { getProductLinePage } from '@/lib/productLinePageContent';
import {
  TRADING_SOLUTION_FEATURE_ROWS,
  TRADING_SOLUTION_FOOTER_CTA_DEFAULT,
  TRADING_SOLUTION_HERO,
  TRADING_SOLUTION_SIX_GRID,
  TRADING_SOLUTION_SPOTLIGHT,
  type TradingSolutionFeatureRow,
  type TradingSolutionFeatureRowVariant,
  type TradingSolutionFooterCta,
  type TradingSolutionGridIconId,
  type TradingSolutionGridItem,
} from '@/lib/tradingSolutionContent';

const VARIANTS: TradingSolutionFeatureRowVariant[] = [
  'spreadsheet',
  'api-console',
  'multi-chart',
  'order-blotter',
  'risk-radar',
  'settlement',
  'portfolio',
  'compact-terminal',
];

const GRID_ICON_KEYS: TradingSolutionGridIconId[] = [
  'clock',
  'chart',
  'mobile',
  'custom',
  'api',
  'security',
  'shield',
  'brain',
  'arrow',
  'alarm',
  'harddrive',
  'headphones',
];

export type SolutionPageSpotlightBase = {
  title: string;
  tagline: string;
  paragraphs: string[];
  imageSrc: string;
  ctaLabel: string;
  ctaHref: string;
  /** Section 2 可选：标题下的「核心特点」条列（如 VAS 页） */
  coreHighlights?: string[];
  /** 条列上方小标题；传空字符串则不显示该行（仅保留圆点列表） */
  highlightsHeading?: string;
};

export type SolutionPageFallbacks = {
  hero: { title: string; subtitle: string };
  spotlight: SolutionPageSpotlightBase;
  sixGrid: TradingSolutionGridItem[];
  footerCta: TradingSolutionFooterCta;
  featureRows: TradingSolutionFeatureRow[];
};

function pickStr(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

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

function parseVariant(v: unknown): TradingSolutionFeatureRowVariant {
  const s = pickStr(v);
  return VARIANTS.includes(s as TradingSolutionFeatureRowVariant)
    ? (s as TradingSolutionFeatureRowVariant)
    : 'multi-chart';
}

function parseGridIcon(v: unknown): TradingSolutionGridIconId {
  const s = pickStr(v);
  return GRID_ICON_KEYS.includes(s as TradingSolutionGridIconId) ? (s as TradingSolutionGridIconId) : 'clock';
}

export type TradingSolutionSpotlightView = {
  title: string;
  tagline: string;
  paragraphs: string[];
  imageSrc: string;
  ctaLabel: string;
  ctaHref: string;
  coreHighlights?: string[];
  highlightsHeading?: string;
};

export type TradingSolutionPageMapped = {
  hero: { title: string; subtitle: string };
  spotlight: TradingSolutionSpotlightView;
  sixGrid: TradingSolutionGridItem[];
  gridSectionCta: { label: string; href: string };
  footerCta: TradingSolutionFooterCta;
  featureRows: TradingSolutionFeatureRow[];
};

function mapHero(doc: Record<string, unknown> | null, fb: SolutionPageFallbacks['hero']) {
  const title = doc ? pickStr(doc.heroTitle) || fb.title : fb.title;
  const subtitle = doc ? pickStr(doc.heroSubtitle) || fb.subtitle : fb.subtitle;
  return { title, subtitle };
}

function spotlightCoreFromBase(
  base: SolutionPageSpotlightBase
): Pick<TradingSolutionSpotlightView, 'coreHighlights' | 'highlightsHeading'> {
  const hl =
    base.coreHighlights && base.coreHighlights.length > 0 ? { coreHighlights: [...base.coreHighlights] } : {};
  const hh =
    base.highlightsHeading !== undefined ? { highlightsHeading: base.highlightsHeading } : {};
  return { ...hl, ...hh };
}

function mapSpotlight(doc: Record<string, unknown> | null, base: SolutionPageSpotlightBase): TradingSolutionSpotlightView {
  const coreFromBase = spotlightCoreFromBase(base);
  if (!doc) {
    return {
      title: base.title,
      tagline: base.tagline,
      paragraphs: [...base.paragraphs],
      imageSrc: base.imageSrc,
      ctaLabel: base.ctaLabel,
      ctaHref: base.ctaHref,
      ...coreFromBase,
    };
  }
  const sp = unwrapStrapiComponent(doc.spotlight);
  if (!sp) {
    return {
      title: base.title,
      tagline: base.tagline,
      paragraphs: [...base.paragraphs],
      imageSrc: base.imageSrc,
      ctaLabel: base.ctaLabel,
      ctaHref: base.ctaHref,
      ...coreFromBase,
    };
  }
  const linesFromCms = unwrapStrapiEntryArray(sp.bodyLines)
    .map((b) => pickStr((unwrapStrapiComponent(b) ?? b).line))
    .filter(Boolean);
  const hasBodyLinesField = Object.prototype.hasOwnProperty.call(sp, 'bodyLines');
  const cmsCoreLines = unwrapStrapiEntryArray((sp as Record<string, unknown>).coreHighlightLines)
    .map((b) => pickStr((unwrapStrapiComponent(b) ?? b).line))
    .filter(Boolean);
  const mergedCore =
    cmsCoreLines.length > 0
      ? { coreHighlights: cmsCoreLines }
      : base.coreHighlights && base.coreHighlights.length > 0
        ? { coreHighlights: [...base.coreHighlights] }
        : {};
  const mediaUrl = getStrapiMedia(unwrapMedia(sp.image));
  const headingFromBase =
    base.highlightsHeading !== undefined ? { highlightsHeading: base.highlightsHeading } : {};
  return {
    title: pickStr(sp.title) || base.title,
    tagline: pickStr(sp.tagline) || base.tagline,
    // Respect explicit empty bodyLines from CMS (do not force fallback paragraphs).
    paragraphs: hasBodyLinesField ? linesFromCms : [...base.paragraphs],
    imageSrc: mediaUrl || base.imageSrc,
    ctaLabel: pickStr(sp.ctaLabel) || base.ctaLabel,
    ctaHref: pickStr(sp.ctaHref) || base.ctaHref,
    ...mergedCore,
    ...headingFromBase,
  };
}

function mapSixGrid(doc: Record<string, unknown> | null, defaultGrid: TradingSolutionGridItem[]) {
  if (!doc) return defaultGrid;
  const items = unwrapStrapiEntryArray(doc.sixGridItems);
  const out: TradingSolutionGridItem[] = [];
  for (const raw of items) {
    const row = unwrapStrapiComponent(raw) ?? raw;
    const title = pickStr(row.title);
    if (!title) continue;
    const bulletRows = unwrapStrapiEntryArray(row.lines);
    const lines = bulletRows
      .map((b) => pickStr((unwrapStrapiComponent(b) ?? b).line))
      .filter(Boolean);
    if (lines.length === 0) continue;
    out.push({ iconId: parseGridIcon(row.iconKey), title, lines });
  }
  return out.length === 6 || out.length === 5 || out.length === 4 ? out : defaultGrid;
}

function mapGridSectionCta(doc: Record<string, unknown> | null): { label: string; href: string } {
  const label = '了解更多';
  const href = '/contact';
  if (!doc) return { label, href };
  return {
    label: pickStr(doc.gridSectionCtaLabel) || label,
    href: pickStr(doc.gridSectionCtaHref) || href,
  };
}

function mapFooterCta(doc: Record<string, unknown> | null, d: TradingSolutionFooterCta): TradingSolutionFooterCta {
  if (!doc) return d;
  const raw = unwrapStrapiComponent(doc.footerCta);
  if (!raw) return d;
  return {
    kicker: pickStr(raw.kicker) || d.kicker,
    title: pickStr(raw.title) || d.title,
    description: pickStr(raw.description) || d.description,
    footnote: pickStr(raw.footnote) || d.footnote,
    buttonLabel: pickStr(raw.buttonLabel) || d.buttonLabel,
    buttonHref: pickStr(raw.buttonHref) || d.buttonHref,
    secondaryButtonLabel: pickStr(raw.secondaryButtonLabel) || d.secondaryButtonLabel,
    secondaryButtonHref: pickStr(raw.secondaryButtonHref) || d.secondaryButtonHref,
  };
}

export function mapTradingSolutionFeaturesFromStrapi(
  apiData: unknown,
  fallbackRows: TradingSolutionFeatureRow[] = TRADING_SOLUTION_FEATURE_ROWS
): TradingSolutionFeatureRow[] {
  if (apiData == null) return fallbackRows;

  const doc = pickDocument<Record<string, unknown>>(apiData);
  if (!doc || Object.keys(doc).length === 0) return fallbackRows;

  const featureRows = unwrapStrapiEntryArray(doc.features);
  const out: TradingSolutionFeatureRow[] = [];

  for (const raw of featureRows) {
    const row = unwrapStrapiComponent(raw) ?? raw;
    const title = pickStr(row.title);
    if (!title) continue;

    const bulletRows = unwrapStrapiEntryArray(row.bullets);
    const lines = bulletRows
      .map((b) => pickStr((unwrapStrapiComponent(b) ?? b).line))
      .filter(Boolean);
    if (lines.length === 0) continue;

    const moreLabel = pickStr(row.moreLabel) || undefined;
    const moreHref = pickStr(row.moreHref) || undefined;

    out.push({
      title,
      lines,
      variant: parseVariant(row.visualKey),
      ...(moreLabel && moreHref ? { moreLabel, moreHref } : {}),
    });
  }

  return out.length >= 1 ? out : fallbackRows;
}

function mapSolutionPageFromStrapi(apiData: unknown, fb: SolutionPageFallbacks): TradingSolutionPageMapped {
  const doc = apiData == null ? null : pickDocument<Record<string, unknown>>(apiData);
  return {
    hero: mapHero(doc, fb.hero),
    spotlight: mapSpotlight(doc, fb.spotlight),
    sixGrid: mapSixGrid(doc, fb.sixGrid),
    gridSectionCta: mapGridSectionCta(doc),
    footerCta: mapFooterCta(doc, fb.footerCta),
    featureRows: mapTradingSolutionFeaturesFromStrapi(apiData, fb.featureRows),
  };
}

const TRADING_FALLBACKS: SolutionPageFallbacks = {
  hero: TRADING_SOLUTION_HERO,
  spotlight: TRADING_SOLUTION_SPOTLIGHT,
  sixGrid: TRADING_SOLUTION_SIX_GRID,
  footerCta: TRADING_SOLUTION_FOOTER_CTA_DEFAULT,
  featureRows: TRADING_SOLUTION_FEATURE_ROWS,
};

const SETTLEMENT_FALLBACKS: SolutionPageFallbacks = {
  hero: SETTLEMENT_SOLUTION_HERO,
  spotlight: SETTLEMENT_SOLUTION_SPOTLIGHT,
  sixGrid: SETTLEMENT_SOLUTION_SIX_GRID,
  footerCta: SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
  featureRows: SETTLEMENT_SOLUTION_FEATURE_ROWS,
};

/** 2.1 Trading Solution */
export function mapTradingSolutionPageFromStrapi(apiData: unknown): TradingSolutionPageMapped {
  return mapSolutionPageFromStrapi(apiData, TRADING_FALLBACKS);
}

/** 2.2 Settlement Solution（栏位结构与 2.1 相同） */
export function mapSettlementSolutionPageFromStrapi(apiData: unknown): TradingSolutionPageMapped {
  return mapSolutionPageFromStrapi(apiData, SETTLEMENT_FALLBACKS);
}

function productLineMappedToFallbacks(slug: string): SolutionPageFallbacks {
  const m = getProductLinePage(slug);
  if (!m) {
    return {
      hero: { title: '', subtitle: '' },
      spotlight: {
        title: '',
        tagline: '',
        paragraphs: [],
        imageSrc: '/trading-solution/front-office.png',
        ctaLabel: '了解更多',
        ctaHref: '/contact',
      },
      sixGrid: [],
      footerCta: TRADING_SOLUTION_FOOTER_CTA_DEFAULT,
      featureRows: [],
    };
  }
  return {
    hero: m.hero,
    spotlight: {
      title: m.spotlight.title,
      tagline: m.spotlight.tagline,
      paragraphs: m.spotlight.paragraphs,
      imageSrc: m.spotlight.imageSrc,
      ctaLabel: m.spotlight.ctaLabel,
      ctaHref: m.spotlight.ctaHref,
      ...(m.spotlight.coreHighlights && m.spotlight.coreHighlights.length > 0
        ? { coreHighlights: m.spotlight.coreHighlights }
        : {}),
      ...(m.spotlight.highlightsHeading !== undefined
        ? { highlightsHeading: m.spotlight.highlightsHeading }
        : {}),
    },
    sixGrid: m.sixGrid,
    footerCta: m.footerCta,
    featureRows: m.featureRows,
  };
}

/** 根路徑 `/{slug}` — Strapi `product-line-pages` 與程式後備一致 */
export function mapProductLinePageFromStrapi(apiData: unknown, slug: string): TradingSolutionPageMapped {
  return mapSolutionPageFromStrapi(apiData, productLineMappedToFallbacks(slug));
}

export type TradingSolutionSeoMapped = {
  metaTitle?: string;
  metaDescription?: string;
  shareImageUrl?: string | null;
};

/** `shared.seo` → Next Metadata（Trading / Settlement 共用） */
export function mapTradingSolutionSeoFromStrapi(apiData: unknown): TradingSolutionSeoMapped {
  const doc = apiData == null ? null : pickDocument<Record<string, unknown>>(apiData);
  if (!doc) return {};
  const seo = unwrapStrapiComponent(doc.seo);
  if (!seo) return {};
  const metaTitle = pickStr(seo.metaTitle);
  const metaDescription = pickStr(seo.metaDescription);
  const shareImageUrl = getStrapiMedia(unwrapMedia(seo.shareImage));
  return {
    ...(metaTitle ? { metaTitle } : {}),
    ...(metaDescription ? { metaDescription } : {}),
    shareImageUrl: shareImageUrl || undefined,
  };
}
