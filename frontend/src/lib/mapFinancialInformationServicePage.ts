import { FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT } from '@/lib/institutionalSolutions';
import type { ProductIconId } from '@/lib/productIcons';

const PRODUCT_ICONS: ProductIconId[] = ['institutional', 'fintech', 'retail', 'hosting'];

function pickStr(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function pickDocument<T extends Record<string, unknown>>(raw: unknown): T | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if ('attributes' in o && o.attributes && typeof o.attributes === 'object') {
    return o.attributes as T;
  }
  return o as T;
}

function unwrapStrapiEntryArray(v: unknown): Record<string, unknown>[] {
  let arr: unknown[] = [];
  if (Array.isArray(v)) arr = v;
  else if (v && typeof v === 'object' && Array.isArray((v as { data?: unknown[] }).data)) {
    arr = (v as { data: unknown[] }).data;
  }
  return arr.map((entry) => {
    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      const e = entry as Record<string, unknown>;
      if ('attributes' in e && e.attributes && typeof e.attributes === 'object') {
        return e.attributes as Record<string, unknown>;
      }
      return e;
    }
    return {};
  });
}

function parseIconId(v: unknown): ProductIconId | undefined {
  if (typeof v !== 'string') return undefined;
  return PRODUCT_ICONS.includes(v as ProductIconId) ? (v as ProductIconId) : undefined;
}

export type MappedFinancialInformationServicePage = {
  title: string;
  subtitle: string;
  bullets: string[];
  icon?: ProductIconId;
};

export function mapFinancialInformationServiceFromStrapi(
  apiData: unknown
): MappedFinancialInformationServicePage {
  const fb = FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT;
  const doc = apiData == null ? null : pickDocument<Record<string, unknown>>(apiData);
  if (!doc) {
    return { ...fb, icon: 'institutional' as ProductIconId };
  }

  const title = pickStr(doc.title) || fb.title;
  const subtitle = pickStr(doc.subtitle) || fb.subtitle;
  const rows = unwrapStrapiEntryArray(doc.bullets);
  const fromCms = rows.map((r) => pickStr(r.line)).filter((s) => s.length > 0);
  const bullets = fromCms.length > 0 ? fromCms : fb.bullets;
  const icon = parseIconId(doc.iconId) ?? 'institutional';

  return { title, subtitle, bullets, icon };
}
