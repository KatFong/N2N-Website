import type { Core } from '@strapi/strapi';

/**
 * 新 Single Type 在 Admin「使用者與權限」裡預設未對 Public 開放 `find`，
 * 前端無 Token 時會 403；若誤以為端點不存在也可能當成 404 問題。
 * 啟動時補齊這兩個子頁的 Public `find`（已存在則略過）。
 */
const PUBLIC_FIND_ACTIONS = [
  'api::settlement-solution-page.settlement-solution-page.find',
  'api::trading-solution-page.trading-solution-page.find',
  'api::product-line-page.product-line-page.find',
  'api::product-line-page.product-line-page.findOne',
] as const;

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
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
