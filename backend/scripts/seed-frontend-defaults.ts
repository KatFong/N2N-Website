/**
 * 將與前台 `src/lib/*Defaults` / `productLinePageContent` 一致的預設寫入 Strapi（並 publish）。
 * 用法：在 backend 目錄執行 `npm run seed:frontend-defaults`。
 * 需先有 `dist/`（`config/*.js` 與編譯後的 `src/`）：腳本會先跑 Strapi TS compile。
 */
import path from 'node:path';
import { createStrapi } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

import {
  HOME_CONTACT_CTA_DEFAULTS,
  HOME_CORE_ADV_DEFAULTS,
  HOME_HERO_DEFAULTS,
  HOME_MARKET_KNOW_HOW_DEFAULTS,
  HOME_NEWS_DEFAULTS,
  HOME_PRODUCTS_DEFAULTS,
  HOME_PRODUCTS_SECTION_DEFAULTS,
} from '../../frontend/src/lib/homePageDefaults';
import { CONTACT_OFFICES, CONTACT_PAGE_DEFAULTS } from '../../frontend/src/lib/contactPageData';
import { FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT } from '../../frontend/src/lib/institutionalSolutions';
import { pressAndAnnouncementArticles } from '../../frontend/src/lib/referenceContent';
import {
  SETTLEMENT_SOLUTION_FEATURE_ROWS,
  SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
  SETTLEMENT_SOLUTION_HERO,
  SETTLEMENT_SOLUTION_SIX_GRID,
  SETTLEMENT_SOLUTION_SPOTLIGHT,
} from '../../frontend/src/lib/settlementSolutionContent';
import {
  TRADING_SOLUTION_FEATURE_ROWS,
  TRADING_SOLUTION_FOOTER_CTA_DEFAULT,
  TRADING_SOLUTION_HERO,
  TRADING_SOLUTION_SIX_GRID,
  TRADING_SOLUTION_SPOTLIGHT,
} from '../../frontend/src/lib/tradingSolutionContent';
import type { SolutionPageSpotlightBase, TradingSolutionPageMapped } from '../../frontend/src/lib/mapTradingSolutionPage';
import { productCardHref } from '../../frontend/src/lib/productCardHref';
import { productLinePageContentBySlug, PRODUCT_LINE_DYNAMIC_SLUGS } from '../../frontend/src/lib/productLinePageContent';
import {
  FOOTER_DEFAULT_COLUMNS,
  FOOTER_DEFAULT_COPYRIGHT,
  FOOTER_DEFAULT_LEGAL_LINKS,
} from '../../frontend/src/lib/footerDefaults';

function bullets(lines: string[]) {
  return lines.filter(Boolean).map((line) => ({ line }));
}

function buildSpotlight(sp: SolutionPageSpotlightBase) {
  const out: Record<string, unknown> = {
    title: sp.title,
    tagline: sp.tagline ?? '',
    ctaLabel: sp.ctaLabel ?? '了解更多',
    ctaHref: sp.ctaHref ?? '/contact',
    bodyLines: bullets(sp.paragraphs ?? []),
  };
  if (sp.coreHighlights && sp.coreHighlights.length > 0) {
    out.coreHighlightLines = bullets(sp.coreHighlights);
  }
  return out;
}

function buildGrid(m: TradingSolutionPageMapped['sixGrid']) {
  return m.map((it) => ({
    iconKey: it.iconId,
    title: it.title,
    lines: bullets(it.lines),
  }));
}

function buildFeatures(rows: TradingSolutionPageMapped['featureRows']) {
  return rows.map((r) => ({
    title: r.title,
    visualKey: r.variant,
    bullets: bullets(r.lines),
    ...(r.moreLabel && r.moreHref ? { moreLabel: r.moreLabel, moreHref: r.moreHref } : {}),
  }));
}

function solutionPagePayload(m: TradingSolutionPageMapped) {
  return {
    heroTitle: m.hero.title,
    heroSubtitle: m.hero.subtitle,
    spotlight: buildSpotlight(m.spotlight),
    sixGridItems: buildGrid(m.sixGrid),
    gridSectionCtaLabel: m.gridSectionCta.label,
    gridSectionCtaHref: m.gridSectionCta.href,
    footerCta: { ...m.footerCta },
    features: buildFeatures(m.featureRows),
  };
}

function seo(metaTitle: string, metaDescription: string) {
  return { metaTitle, metaDescription };
}

function homePayload() {
  const hero = {
    showLogo: HOME_HERO_DEFAULTS.showLogo,
    subtitle: HOME_HERO_DEFAULTS.subtitle,
    title: HOME_HERO_DEFAULTS.title,
    description: HOME_HERO_DEFAULTS.description,
    Button1: HOME_HERO_DEFAULTS.ctaPrimaryLabel,
    Button1Link: HOME_HERO_DEFAULTS.ctaPrimaryLink,
    Button2: HOME_HERO_DEFAULTS.ctaSecondaryLabel,
    Button2Link: HOME_HERO_DEFAULTS.ctaSecondaryLink,
  };

  const stats = HOME_CORE_ADV_DEFAULTS.stats.map((s) => ({
    value: s.target,
    prefix: s.prefix ?? undefined,
    suffix: s.suffix ?? '+',
    unit: s.unit,
    label: s.label,
    format: (s.format === 'comma' ? 'comma' : 'int') as 'int' | 'comma',
  }));

  const advantageCards = HOME_CORE_ADV_DEFAULTS.cards.map((c) => ({
    iconId: c.icon,
    title: c.title,
    description: c.desc,
    cardLink: c.href,
  }));

  const products = HOME_PRODUCTS_DEFAULTS.map((p) => ({
    name: p.title,
    subtitle: p.subtitle,
    description: p.description,
    icon: p.icon,
    link: productCardHref(p.slug),
  }));

  const newsList = pressAndAnnouncementArticles.slice(0, 3);
  const featured = pressAndAnnouncementArticles[0];
  const marketKnowHowList = pressAndAnnouncementArticles.slice(3, 5);
  const marketKnowHowFeatured = pressAndAnnouncementArticles[2];

  return {
    internalName: 'Home Page',
    hero,
    coreAdvantagesSection: {
      moduleLabel: HOME_CORE_ADV_DEFAULTS.moduleLabel,
      titleZh: HOME_CORE_ADV_DEFAULTS.titleZh,
      titleEn: HOME_CORE_ADV_DEFAULTS.titleEn,
      stats,
      advantageCards,
    },
    productsOverview: {
      moduleLabel: HOME_PRODUCTS_SECTION_DEFAULTS.moduleLabel,
      titleZh: HOME_PRODUCTS_SECTION_DEFAULTS.titleZh,
      titleEn: HOME_PRODUCTS_SECTION_DEFAULTS.titleEn,
      products,
    },
    homeNewsSection: {
      moduleLabel: HOME_NEWS_DEFAULTS.moduleLabel,
      titleZh: HOME_NEWS_DEFAULTS.titleZh,
      titleEn: HOME_NEWS_DEFAULTS.titleEn,
      featuredTitle: featured?.title ?? '',
      featuredLink: featured ? `/news-insights/${featured.slug}` : HOME_NEWS_DEFAULTS.featuredLink,
      moreButtonLabel: HOME_NEWS_DEFAULTS.moreButtonLabel,
      moreButtonLink: HOME_NEWS_DEFAULTS.moreButtonLink,
      newsItems: newsList.map((a) => ({
        title: a.title,
        excerpt: a.excerpt,
        link: `/news-insights/${a.slug}`,
      })),
    },
    marketKnowHowSection: {
      moduleLabel: HOME_MARKET_KNOW_HOW_DEFAULTS.moduleLabel,
      titleZh: HOME_MARKET_KNOW_HOW_DEFAULTS.titleZh,
      titleEn: HOME_MARKET_KNOW_HOW_DEFAULTS.titleEn,
      featuredTitle: marketKnowHowFeatured?.title ?? '',
      featuredLink: marketKnowHowFeatured
        ? `/news-insights/${marketKnowHowFeatured.slug}`
        : HOME_MARKET_KNOW_HOW_DEFAULTS.featuredLink,
      moreButtonLabel: HOME_MARKET_KNOW_HOW_DEFAULTS.moreButtonLabel,
      moreButtonLink: HOME_MARKET_KNOW_HOW_DEFAULTS.moreButtonLink,
      newsItems: marketKnowHowList.map((a) => ({
        title: a.title,
        excerpt: a.excerpt,
        link: `/news-insights/${a.slug}`,
      })),
    },
    contactCtaSection: {
      title: HOME_CONTACT_CTA_DEFAULTS.title,
      description: HOME_CONTACT_CTA_DEFAULTS.description,
      buttonLabel: HOME_CONTACT_CTA_DEFAULTS.buttonLabel,
      buttonLink: HOME_CONTACT_CTA_DEFAULTS.buttonLink,
    },
    seo: seo('N2N Connect — 首页', '联盛亚富资讯科技 — 金融科技与交易结算解决方案。'),
  };
}

function contactOfficesPayload() {
  return CONTACT_OFFICES.map((o) => {
    const row: Record<string, unknown> = {
      country: o.country,
      company: o.company,
      address: o.address,
      mapEmbedUrl: o.mapEmbedUrl,
    };
    if (o.phones?.length) {
      row.phones = o.phones.map((p) => ({ label: p.label, tel: p.tel }));
    }
    if (o.fax) row.fax = o.fax;
    if (o.website) {
      row.websiteLabel = o.website.label;
      row.websiteUrl = o.website.href;
    }
    if (o.emails?.length) {
      row.directEmails = o.emails.map((e) => ({ label: e.label, email: e.email }));
    }
    if (o.emailBoxes?.length) {
      row.enquiryEmails = o.emailBoxes.map((b) => ({ heading: b.heading, email: b.email }));
    }
    return row;
  });
}

async function upsertSinglePublished(strapi: Core.Strapi, uid: string, data: Record<string, unknown>) {
  const draft = await strapi.documents(uid).findFirst({ status: 'draft' });
  const pub = await strapi.documents(uid).findFirst({ status: 'published' });
  const existing = draft ?? pub;
  if (!existing?.documentId) {
    await strapi.documents(uid).create({ data, status: 'published' });
    strapi.log.info(`seed: created ${uid}`);
    return;
  }
  await strapi.documents(uid).update({
    documentId: existing.documentId,
    data,
    status: 'published',
  });
  strapi.log.info(`seed: updated ${uid}`);
}

async function upsertProductLine(
  strapi: Core.Strapi,
  slug: string,
  title: string,
  data: Record<string, unknown>
) {
  const uid = 'api::product-line-page.product-line-page';
  const row = await strapi.db.query(uid).findOne({ where: { slug } });
  const payload = { title, slug, ...data };
  if (!row?.documentId) {
    await strapi.documents(uid).create({ data: payload, status: 'published' });
    strapi.log.info(`seed: created product-line ${slug}`);
    return;
  }
  await strapi.documents(uid).update({
    documentId: row.documentId,
    data: payload,
    status: 'published',
  });
  strapi.log.info(`seed: updated product-line ${slug}`);
}

async function upsertArticleBySlug(
  strapi: Core.Strapi,
  article: (typeof pressAndAnnouncementArticles)[number]
) {
  const uid = 'api::article.article';
  const category = article.category === '新闻稿' ? 'Press Release' : 'News';
  const row = await strapi.db.query(uid).findOne({ where: { slug: article.slug } });
  const data = {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category,
    publishedDate: article.publishedDate,
    author: 'N2N Connect',
    seo: seo(article.title, article.excerpt),
  };
  if (!row?.documentId) {
    await strapi.documents(uid).create({ data, status: 'published' });
    strapi.log.info(`seed: created article ${article.slug}`);
    return;
  }
  await strapi.documents(uid).update({
    documentId: row.documentId,
    data,
    status: 'published',
  });
  strapi.log.info(`seed: updated article ${article.slug}`);
}

async function seed(strapi: Core.Strapi) {
  await upsertSinglePublished(strapi, 'api::footer.footer', {
    columns: FOOTER_DEFAULT_COLUMNS.map((col) => ({
      title: col.title,
      links: col.links.map((l) => ({ label: l.label, href: l.href })),
    })),
    legalLinks: FOOTER_DEFAULT_LEGAL_LINKS.map((l) => ({ label: l.label, href: l.href })),
    copyright: FOOTER_DEFAULT_COPYRIGHT,
  });

  await upsertSinglePublished(strapi, 'api::home-page.home-page', homePayload());

  await upsertSinglePublished(strapi, 'api::contact-page.contact-page', {
    heroTitle: CONTACT_PAGE_DEFAULTS.heroTitle,
    sectionTitle: CONTACT_PAGE_DEFAULTS.sectionTitle,
    offices: contactOfficesPayload(),
    seo: seo('联系我们 — N2N Connect', 'N2N Connect 各地办公室与联络方式。'),
  });

  await upsertSinglePublished(strapi, 'api::trading-solution-page.trading-solution-page', {
    ...solutionPagePayload({
      hero: TRADING_SOLUTION_HERO,
      spotlight: TRADING_SOLUTION_SPOTLIGHT,
      sixGrid: TRADING_SOLUTION_SIX_GRID,
      gridSectionCta: { label: '了解更多', href: '/contact' },
      footerCta: TRADING_SOLUTION_FOOTER_CTA_DEFAULT,
      featureRows: TRADING_SOLUTION_FEATURE_ROWS,
    }),
    seo: seo('交易解决方案 — N2N Connect', TRADING_SOLUTION_HERO.subtitle),
  });

  await upsertSinglePublished(strapi, 'api::settlement-solution-page.settlement-solution-page', {
    ...solutionPagePayload({
      hero: SETTLEMENT_SOLUTION_HERO,
      spotlight: SETTLEMENT_SOLUTION_SPOTLIGHT,
      sixGrid: SETTLEMENT_SOLUTION_SIX_GRID,
      gridSectionCta: { label: '了解更多', href: '/contact' },
      footerCta: SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
      featureRows: SETTLEMENT_SOLUTION_FEATURE_ROWS,
    }),
    seo: seo('结算方案 — N2N Connect', SETTLEMENT_SOLUTION_HERO.subtitle),
  });

  await upsertSinglePublished(strapi, 'api::financial-information-service-page.financial-information-service-page', {
    title: FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT.title,
    subtitle: FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT.subtitle,
    iconId: 'institutional',
    bullets: bullets(FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT.bullets),
    seo: seo(
      '券商报价系统 — Financial Information Service',
      FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT.bullets.join(' ')
    ),
  });

  const serverHosting = productLinePageContentBySlug['server-hosting'];
  if (serverHosting) {
    await upsertSinglePublished(strapi, 'api::server-hosting-page.server-hosting-page', {
      ...solutionPagePayload(serverHosting),
      seo: seo('服务器托管和专线服务 — N2N Connect', serverHosting.hero.subtitle),
    });
  }

  for (const slug of PRODUCT_LINE_DYNAMIC_SLUGS) {
    const mapped = productLinePageContentBySlug[slug];
    if (!mapped) continue;
    const title = mapped.hero.title;
    await upsertProductLine(strapi, slug, title, {
      ...solutionPagePayload(mapped),
      seo: seo(`${title} — N2N Connect`, mapped.hero.subtitle),
    });
  }

  for (const article of pressAndAnnouncementArticles) {
    await upsertArticleBySlug(strapi, article);
  }

  await upsertSinglePublished(strapi, 'api::about-page.about-page', {
    pageTitle: '关于我们',
    hero: {
      showLogo: true,
      subtitle: '联盛亚富资讯科技有限公司（N2N-AFE）',
      title: '关于 N2N-AFE',
      description: '以科技赋能资本市场。',
      ctaLabel: '联系我们',
      ctaLink: '/contact',
      ctaSecondaryLabel: '全球业务网络',
      ctaSecondaryLink: '/global-business',
    },
    mission: '<p><strong>以科技赋能资本市场。</strong></p>',
    vision: '<p>运用创新技术与稳健架构完善价值链。</p>',
    teamTitle: '团队',
    seo: seo('关于我们 — N2N Connect', '了解 N2N Connect 的使命、愿景与企业文化。'),
  });

  await upsertSinglePublished(strapi, 'api::global-business.global-business', {
    pageTitle: '全球业务',
    pageDescription: '<p>N2N 网络覆盖亚太多个市场。</p>',
    hero: {
      showLogo: true,
      subtitle: 'N2N Connect',
      title: '全球业务网络',
      description: '连接亚洲主要金融市场。',
      ctaLabel: '联系我们',
      ctaLink: '/contact',
      ctaSecondaryLabel: '返回首页',
      ctaSecondaryLink: '/',
    },
    seo: seo('全球业务 — N2N Connect', 'N2N 全球业务与区域布局。'),
  });

  await upsertSinglePublished(strapi, 'api::business-partnership.business-partnership', {
    pageTitle: '商务合作',
    pageDescription: '<p>与 N2N 建立战略合作，拓展金融科技生态。</p>',
    contactEmail: 'n2n_sales@n2nconnect.com',
    hero: {
      showLogo: true,
      subtitle: 'N2N Connect',
      title: '商务合作',
      description: '携手共创价值。',
      ctaLabel: '联系我们',
      ctaLink: '/contact',
      ctaSecondaryLabel: '了解更多',
      ctaSecondaryLink: '/about',
    },
    seo: seo('商务合作 — N2N Connect', '与 N2N 建立战略合作。'),
  });

  await upsertSinglePublished(strapi, 'api::news-insights-page.news-insights-page', {
    pageTitle: '新闻与洞察',
    pageDescription: '公告、新闻稿与市场洞察。',
    hero: {
      showLogo: true,
      subtitle: 'N2N Connect',
      title: '新闻与洞察',
      description: '最新公告与媒体报道。',
      ctaLabel: '订阅资讯',
      ctaLink: '/contact',
      ctaSecondaryLabel: '联系我们',
      ctaSecondaryLink: '/contact',
    },
    seo: seo('新闻与洞察 — N2N Connect', 'N2N Connect 新闻稿与公告。'),
  });

  await upsertSinglePublished(strapi, 'api::privacy-policy.privacy-policy', {
    pageTitle: '隐私政策',
    lastUpdated: '2026-01-01',
    content:
      '<p>本页说明我们如何收集、使用与保护您的个人资料。使用本网站即表示您同意本政策。</p><p>若您有任何疑问，请通过「联系我们」页面与我们联络。</p>',
    seo: seo('隐私政策 — N2N Connect', 'N2N Connect 隐私政策与资料处理说明。'),
  });

  strapi.log.info('seed: 完成（所有 Single Types / 产品线 / 文章已写入并发布）');
}

async function main() {
  const root = process.cwd();
  const app = createStrapi({
    appDir: root,
    distDir: path.join(root, 'dist'),
  });
  await app.load();
  try {
    await seed(app);
  } finally {
    await app.destroy();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
