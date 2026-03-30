import path from 'path';
import type { Core } from '@strapi/strapi';

/** 以實體路徑載入（@strapi/content-manager 未 export 此子路徑，避免 ERR_PACKAGE_PATH_NOT_EXPORTED） */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const configurationIndex = require(path.resolve(
  __dirname,
  '../../node_modules/@strapi/content-manager/dist/server/services/utils/configuration/index.js'
)) as {
  createDefaultConfiguration: (schema: object) => Promise<{
    layouts: { edit: { name: string; size: number }[][]; list: unknown };
    settings: unknown;
    metadatas: unknown;
  }>;
};

/** 與前台無關，僅 Content Manager 表單由上至下順序（showLogo 置頂） */
const HERO_EDIT_FIELD_ORDER = [
  'showLogo',
  'subtitle',
  'title',
  'description',
  'backgroundImage',
  'Button1',
  'Button1Link',
  'Button2',
  'Button2Link',
] as const;

function orderIndex(name: string): number {
  const i = (HERO_EDIT_FIELD_ORDER as readonly string[]).indexOf(name);
  return i === -1 ? 999 : i;
}

/**
 * Strapi 預設版面用 Object.keys(attributes)，載入後順序未必與 JSON 一致；另「Configure the view」拖曳易亂位。
 * 每次啟動依 HERO_EDIT_FIELD_ORDER 重排 edit 版面（每欄獨立一列，保留原欄寬）。
 */
async function ensureHeroEditLayoutMatchesSchema(strapi: Core.Strapi) {
  const uid = 'sections.hero';
  const schema = strapi.components[uid];
  if (!schema) return;

  const def = await configurationIndex.createDefaultConfiguration(schema);
  type Cell = { name: string; size: number };
  const flat: Cell[] = [];
  for (const row of def.layouts.edit) {
    for (const cell of row) {
      flat.push({ name: cell.name, size: cell.size });
    }
  }
  flat.sort((a, b) => orderIndex(a.name) - orderIndex(b.name));
  const edit = flat.map((c) => [c]);

  const merged = {
    ...def,
    layouts: {
      ...def.layouts,
      edit,
    },
  };

  const components = strapi.plugin('content-manager').service('components') as {
    findComponent: (id: string) => { uid: string } | null;
    updateConfiguration: (component: { uid: string }, c: unknown) => Promise<unknown>;
  };
  const component = components.findComponent(uid);
  if (!component) return;
  await components.updateConfiguration(component, merged);
  strapi.log.info('bootstrap: sections.hero edit layout reordered (showLogo first)');
}

/** Home 單頁欄位名仍為 coreAdvantagesSection（API 不變），僅 Content Manager 顯示為「核心优势模块」。 */
async function ensureHomePageCoreAdvantagesFieldLabel(strapi: Core.Strapi) {
  const uid = 'api::home-page.home-page';
  const schema = strapi.contentTypes[uid];
  if (!schema) return;

  const contentTypesService = strapi.plugin('content-manager').service('content-types') as {
    findContentType: (id: string) => { uid: string } | undefined;
    findConfiguration: (ct: { uid: string }) => Promise<{
      metadatas: Record<string, { edit?: Record<string, unknown> }>;
    }>;
    updateConfiguration: (ct: { uid: string }, c: { metadatas: unknown }) => Promise<unknown>;
  };

  const contentType = contentTypesService.findContentType(uid);
  if (!contentType) return;

  const current = await contentTypesService.findConfiguration(contentType);
  const def = await configurationIndex.createDefaultConfiguration(schema);

  type MetaMap = Record<string, { edit?: Record<string, unknown> }>;
  const defMeta = def.metadatas as MetaMap;
  const curMeta = current.metadatas as MetaMap;

  const metadatas = {
    ...defMeta,
    ...curMeta,
    coreAdvantagesSection: {
      ...defMeta.coreAdvantagesSection,
      ...curMeta.coreAdvantagesSection,
      edit: {
        ...defMeta.coreAdvantagesSection?.edit,
        ...curMeta.coreAdvantagesSection?.edit,
        label: '核心优势模块',
      },
    },
  };

  await contentTypesService.updateConfiguration(contentType, { metadatas });
  strapi.log.info('bootstrap: home-page coreAdvantagesSection label → 核心优势模块');
}

/**
 * 新 Single Type 在 Admin「使用者與權限」裡預設未對 Public 開放 `find`，
 * 前端無 Token 時會 403；若誤以為端點不存在也可能當成 404 問題。
 * 啟動時補齊這兩個子頁的 Public `find`（已存在則略過）。
 */
/** 前台無 Token 時需 Public `find`，否則 403 會讓前端以為「CMS 沒接上」 */
const PUBLIC_FIND_ACTIONS = [
  'api::footer.footer.find',
  'api::home-page.home-page.find',
  'api::contact-page.contact-page.find',
  'api::about-page.about-page.find',
  'api::global-business.global-business.find',
  'api::business-partnership.business-partnership.find',
  'api::news-insights-page.news-insights-page.find',
  'api::privacy-policy.privacy-policy.find',
  'api::settlement-solution-page.settlement-solution-page.find',
  'api::trading-solution-page.trading-solution-page.find',
  'api::financial-information-service-page.financial-information-service-page.find',
  'api::server-hosting-page.server-hosting-page.find',
  'api::product-line-page.product-line-page.find',
  'api::product-line-page.product-line-page.findOne',
  'api::article.article.find',
  'api::article.article.findOne',
] as const;

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureHeroEditLayoutMatchesSchema(strapi);
    await ensureHomePageCoreAdvantagesFieldLabel(strapi);

    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn('bootstrap: Public role not found, skip solution-page API grants');
      return;
    }

    const roleId = publicRole.id;

    for (const action of PUBLIC_FIND_ACTIONS) {
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { action, role: roleId },
      });
      if (existing) continue;

      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: roleId },
      });
      strapi.log.info(`bootstrap: granted Public ${action}`);
    }
  },
};
