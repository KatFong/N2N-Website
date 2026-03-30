import {
  FOOTER_DEFAULT_COLUMNS,
  FOOTER_DEFAULT_COPYRIGHT,
  FOOTER_DEFAULT_LEGAL_LINKS,
  type FooterColumn,
  type FooterLink,
  type MappedFooter,
} from '@/lib/footerDefaults';

function pickStr(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
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

function mapLinkRows(rows: Record<string, unknown>[]): FooterLink[] {
  const out: FooterLink[] = [];
  for (const row of rows) {
    const label = pickStr(row.label);
    const href = pickStr(row.href);
    if (label && href) out.push({ label, href });
  }
  return out;
}

function mapColumnRows(rows: Record<string, unknown>[]): FooterColumn[] {
  const out: FooterColumn[] = [];
  for (const row of rows) {
    const title = pickStr(row.title);
    const linkRows = unwrapStrapiEntryArray(row.links);
    const links = mapLinkRows(linkRows.map((r) => unwrapStrapiComponent(r) ?? r));
    if (title && links.length > 0) out.push({ title, links });
  }
  return out;
}

/**
 * Strapi `footer` Single Type → 全站頁尾；無資料或欄位空時回傳預設。
 */
export function mapFooterFromStrapi(apiData: unknown): MappedFooter {
  if (apiData == null) {
    return {
      columns: FOOTER_DEFAULT_COLUMNS,
      legalLinks: FOOTER_DEFAULT_LEGAL_LINKS,
      copyright: FOOTER_DEFAULT_COPYRIGHT,
    };
  }

  const doc = pickDocument<Record<string, unknown>>(apiData);
  if (!doc || Object.keys(doc).length === 0) {
    return {
      columns: FOOTER_DEFAULT_COLUMNS,
      legalLinks: FOOTER_DEFAULT_LEGAL_LINKS,
      copyright: FOOTER_DEFAULT_COPYRIGHT,
    };
  }

  const colRows = unwrapStrapiEntryArray(doc.columns);
  const columnsFromCms = mapColumnRows(colRows.map((r) => unwrapStrapiComponent(r) ?? r));

  const legalRows = unwrapStrapiEntryArray(doc.legalLinks);
  const legalFromCms = mapLinkRows(legalRows.map((r) => unwrapStrapiComponent(r) ?? r));

  const copyright = pickStr(doc.copyright) || FOOTER_DEFAULT_COPYRIGHT;

  return {
    columns: columnsFromCms.length > 0 ? columnsFromCms : FOOTER_DEFAULT_COLUMNS,
    legalLinks: legalFromCms.length > 0 ? legalFromCms : FOOTER_DEFAULT_LEGAL_LINKS,
    copyright,
  };
}
