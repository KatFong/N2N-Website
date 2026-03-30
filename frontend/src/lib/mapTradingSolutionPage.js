"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTradingSolutionSeoFromStrapi = exports.mapProductLinePageFromStrapi = exports.mapSettlementSolutionPageFromStrapi = exports.mapTradingSolutionPageFromStrapi = exports.mapTradingSolutionFeaturesFromStrapi = void 0;
const strapi_1 = require("@/lib/strapi");
const settlementSolutionContent_1 = require("@/lib/settlementSolutionContent");
const productLinePageContent_1 = require("@/lib/productLinePageContent");
const tradingSolutionContent_1 = require("@/lib/tradingSolutionContent");
const VARIANTS = [
    'spreadsheet',
    'api-console',
    'multi-chart',
    'order-blotter',
    'risk-radar',
    'settlement',
    'portfolio',
    'compact-terminal',
];
const GRID_ICON_KEYS = [
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
function pickStr(v) {
    return typeof v === 'string' ? v.trim() : '';
}
function unwrapMedia(m) {
    if (!m)
        return null;
    if (typeof m === 'object' && m !== null && 'url' in m && typeof m.url === 'string') {
        return m;
    }
    if (typeof m === 'object' && m !== null && 'data' in m) {
        const inner = m.data;
        return inner !== null && inner !== void 0 ? inner : null;
    }
    return null;
}
function unwrapStrapiComponent(v) {
    if (v == null || typeof v !== 'object' || Array.isArray(v))
        return undefined;
    let cur = v;
    if ('data' in cur && cur.data != null && typeof cur.data === 'object' && !Array.isArray(cur.data)) {
        cur = cur.data;
    }
    if ('attributes' in cur &&
        cur.attributes != null &&
        typeof cur.attributes === 'object' &&
        !Array.isArray(cur.attributes)) {
        cur = cur.attributes;
    }
    return cur;
}
function unwrapStrapiEntryArray(v) {
    let arr = [];
    if (Array.isArray(v))
        arr = v;
    else if (v && typeof v === 'object' && Array.isArray(v.data)) {
        arr = v.data;
    }
    return arr.map((entry) => {
        const inner = unwrapStrapiComponent(entry);
        if (inner)
            return inner;
        return typeof entry === 'object' && entry !== null ? entry : {};
    });
}
function pickDocument(raw) {
    if (!raw || typeof raw !== 'object')
        return null;
    const o = raw;
    if ('attributes' in o && o.attributes && typeof o.attributes === 'object') {
        return o.attributes;
    }
    return o;
}
function parseVariant(v) {
    const s = pickStr(v);
    return VARIANTS.includes(s)
        ? s
        : 'multi-chart';
}
function parseGridIcon(v) {
    const s = pickStr(v);
    return GRID_ICON_KEYS.includes(s) ? s : 'clock';
}
function mapHero(doc, fb) {
    const title = doc ? pickStr(doc.heroTitle) || fb.title : fb.title;
    const subtitle = doc ? pickStr(doc.heroSubtitle) || fb.subtitle : fb.subtitle;
    return { title, subtitle };
}
function spotlightCoreFromBase(base) {
    const hl = base.coreHighlights && base.coreHighlights.length > 0 ? { coreHighlights: [...base.coreHighlights] } : {};
    const hh = base.highlightsHeading !== undefined ? { highlightsHeading: base.highlightsHeading } : {};
    return { ...hl, ...hh };
}
function mapSpotlight(doc, base) {
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
        .map((b) => { var _a; return pickStr(((_a = unwrapStrapiComponent(b)) !== null && _a !== void 0 ? _a : b).line); })
        .filter(Boolean);
    const cmsCoreLines = unwrapStrapiEntryArray(sp.coreHighlightLines)
        .map((b) => { var _a; return pickStr(((_a = unwrapStrapiComponent(b)) !== null && _a !== void 0 ? _a : b).line); })
        .filter(Boolean);
    const mergedCore = cmsCoreLines.length > 0
        ? { coreHighlights: cmsCoreLines }
        : base.coreHighlights && base.coreHighlights.length > 0
            ? { coreHighlights: [...base.coreHighlights] }
            : {};
    const mediaUrl = (0, strapi_1.getStrapiMedia)(unwrapMedia(sp.image));
    const headingFromBase = base.highlightsHeading !== undefined ? { highlightsHeading: base.highlightsHeading } : {};
    return {
        title: pickStr(sp.title) || base.title,
        tagline: pickStr(sp.tagline) || base.tagline,
        paragraphs: linesFromCms.length > 0 ? linesFromCms : [...base.paragraphs],
        imageSrc: mediaUrl || base.imageSrc,
        ctaLabel: pickStr(sp.ctaLabel) || base.ctaLabel,
        ctaHref: pickStr(sp.ctaHref) || base.ctaHref,
        ...mergedCore,
        ...headingFromBase,
    };
}
function mapSixGrid(doc, defaultGrid) {
    var _a;
    if (!doc)
        return defaultGrid;
    const items = unwrapStrapiEntryArray(doc.sixGridItems);
    const out = [];
    for (const raw of items) {
        const row = (_a = unwrapStrapiComponent(raw)) !== null && _a !== void 0 ? _a : raw;
        const title = pickStr(row.title);
        if (!title)
            continue;
        const bulletRows = unwrapStrapiEntryArray(row.lines);
        const lines = bulletRows
            .map((b) => { var _a; return pickStr(((_a = unwrapStrapiComponent(b)) !== null && _a !== void 0 ? _a : b).line); })
            .filter(Boolean);
        if (lines.length === 0)
            continue;
        out.push({ iconId: parseGridIcon(row.iconKey), title, lines });
    }
    return out.length === 6 || out.length === 4 ? out : defaultGrid;
}
function mapGridSectionCta(doc) {
    const label = '了解更多';
    const href = '/contact';
    if (!doc)
        return { label, href };
    return {
        label: pickStr(doc.gridSectionCtaLabel) || label,
        href: pickStr(doc.gridSectionCtaHref) || href,
    };
}
function mapFooterCta(doc, d) {
    if (!doc)
        return d;
    const raw = unwrapStrapiComponent(doc.footerCta);
    if (!raw)
        return d;
    return {
        kicker: pickStr(raw.kicker) || d.kicker,
        title: pickStr(raw.title) || d.title,
        description: pickStr(raw.description) || d.description,
        footnote: pickStr(raw.footnote) || d.footnote,
        buttonLabel: pickStr(raw.buttonLabel) || d.buttonLabel,
        buttonHref: pickStr(raw.buttonHref) || d.buttonHref,
    };
}
function mapTradingSolutionFeaturesFromStrapi(apiData, fallbackRows = tradingSolutionContent_1.TRADING_SOLUTION_FEATURE_ROWS) {
    var _a;
    if (apiData == null)
        return fallbackRows;
    const doc = pickDocument(apiData);
    if (!doc || Object.keys(doc).length === 0)
        return fallbackRows;
    const featureRows = unwrapStrapiEntryArray(doc.features);
    const out = [];
    for (const raw of featureRows) {
        const row = (_a = unwrapStrapiComponent(raw)) !== null && _a !== void 0 ? _a : raw;
        const title = pickStr(row.title);
        if (!title)
            continue;
        const bulletRows = unwrapStrapiEntryArray(row.bullets);
        const lines = bulletRows
            .map((b) => { var _a; return pickStr(((_a = unwrapStrapiComponent(b)) !== null && _a !== void 0 ? _a : b).line); })
            .filter(Boolean);
        if (lines.length === 0)
            continue;
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
exports.mapTradingSolutionFeaturesFromStrapi = mapTradingSolutionFeaturesFromStrapi;
function mapSolutionPageFromStrapi(apiData, fb) {
    const doc = apiData == null ? null : pickDocument(apiData);
    return {
        hero: mapHero(doc, fb.hero),
        spotlight: mapSpotlight(doc, fb.spotlight),
        sixGrid: mapSixGrid(doc, fb.sixGrid),
        gridSectionCta: mapGridSectionCta(doc),
        footerCta: mapFooterCta(doc, fb.footerCta),
        featureRows: mapTradingSolutionFeaturesFromStrapi(apiData, fb.featureRows),
    };
}
const TRADING_FALLBACKS = {
    hero: tradingSolutionContent_1.TRADING_SOLUTION_HERO,
    spotlight: tradingSolutionContent_1.TRADING_SOLUTION_SPOTLIGHT,
    sixGrid: tradingSolutionContent_1.TRADING_SOLUTION_SIX_GRID,
    footerCta: tradingSolutionContent_1.TRADING_SOLUTION_FOOTER_CTA_DEFAULT,
    featureRows: tradingSolutionContent_1.TRADING_SOLUTION_FEATURE_ROWS,
};
const SETTLEMENT_FALLBACKS = {
    hero: settlementSolutionContent_1.SETTLEMENT_SOLUTION_HERO,
    spotlight: settlementSolutionContent_1.SETTLEMENT_SOLUTION_SPOTLIGHT,
    sixGrid: settlementSolutionContent_1.SETTLEMENT_SOLUTION_SIX_GRID,
    footerCta: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
    featureRows: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FEATURE_ROWS,
};
/** 2.1 Trading Solution */
function mapTradingSolutionPageFromStrapi(apiData) {
    return mapSolutionPageFromStrapi(apiData, TRADING_FALLBACKS);
}
exports.mapTradingSolutionPageFromStrapi = mapTradingSolutionPageFromStrapi;
/** 2.2 Settlement Solution（栏位结构与 2.1 相同） */
function mapSettlementSolutionPageFromStrapi(apiData) {
    return mapSolutionPageFromStrapi(apiData, SETTLEMENT_FALLBACKS);
}
exports.mapSettlementSolutionPageFromStrapi = mapSettlementSolutionPageFromStrapi;
function productLineMappedToFallbacks(slug) {
    const m = (0, productLinePageContent_1.getProductLinePage)(slug);
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
            footerCta: tradingSolutionContent_1.TRADING_SOLUTION_FOOTER_CTA_DEFAULT,
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
function mapProductLinePageFromStrapi(apiData, slug) {
    return mapSolutionPageFromStrapi(apiData, productLineMappedToFallbacks(slug));
}
exports.mapProductLinePageFromStrapi = mapProductLinePageFromStrapi;
/** `shared.seo` → Next Metadata（Trading / Settlement 共用） */
function mapTradingSolutionSeoFromStrapi(apiData) {
    const doc = apiData == null ? null : pickDocument(apiData);
    if (!doc)
        return {};
    const seo = unwrapStrapiComponent(doc.seo);
    if (!seo)
        return {};
    const metaTitle = pickStr(seo.metaTitle);
    const metaDescription = pickStr(seo.metaDescription);
    const shareImageUrl = (0, strapi_1.getStrapiMedia)(unwrapMedia(seo.shareImage));
    return {
        ...(metaTitle ? { metaTitle } : {}),
        ...(metaDescription ? { metaDescription } : {}),
        shareImageUrl: shareImageUrl || undefined,
    };
}
exports.mapTradingSolutionSeoFromStrapi = mapTradingSolutionSeoFromStrapi;
