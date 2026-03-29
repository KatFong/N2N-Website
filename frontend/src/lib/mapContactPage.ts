import { CONTACT_OFFICES, CONTACT_PAGE_DEFAULTS, type ContactOffice } from '@/lib/contactPageData';
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

function mapOfficeRow(row: Record<string, unknown>): ContactOffice | null {
  const country = pickStr(row.country);
  const company = pickStr(row.company);
  const address = pickStr(row.address);
  const mapEmbedUrl = pickStr(row.mapEmbedUrl);
  if (!country || !company || !address || !mapEmbedUrl) return null;

  const phoneRows = unwrapStrapiEntryArray(row.phones);
  const phones = phoneRows
    .map((p) => {
      const r = unwrapStrapiComponent(p) ?? p;
      const tel = pickStr(r.tel);
      if (!tel) return null;
      const label = pickStr(r.label);
      return { tel, ...(label ? { label } : {}) };
    })
    .filter(Boolean) as ContactOffice['phones'];

  const fax = pickStr(row.fax) || undefined;
  const websiteLabel = pickStr(row.websiteLabel);
  const websiteUrl = pickStr(row.websiteUrl);
  const website =
    websiteUrl || websiteLabel
      ? { label: websiteLabel || websiteUrl, href: websiteUrl || websiteLabel }
      : undefined;

  const directRows = unwrapStrapiEntryArray(row.directEmails);
  const emails = directRows
    .map((e) => {
      const r = unwrapStrapiComponent(e) ?? e;
      const email = pickStr(r.email);
      if (!email) return null;
      const label = pickStr(r.label);
      return { email, ...(label ? { label } : {}) };
    })
    .filter(Boolean) as ContactOffice['emails'];

  const boxRows = unwrapStrapiEntryArray(row.enquiryEmails);
  const emailBoxes = boxRows
    .map((b) => {
      const r = unwrapStrapiComponent(b) ?? b;
      const heading = pickStr(r.heading);
      const email = pickStr(r.email);
      if (!heading || !email) return null;
      return { heading, email };
    })
    .filter(Boolean) as ContactOffice['emailBoxes'];

  return {
    country,
    company,
    address,
    ...(phones?.length ? { phones } : {}),
    ...(fax ? { fax } : {}),
    ...(website ? { website } : {}),
    ...(emails?.length ? { emails } : {}),
    ...(emailBoxes?.length ? { emailBoxes } : {}),
    mapEmbedUrl,
  };
}

export type MappedContactPage = {
  heroTitle: string;
  sectionTitle: string;
  offices: ContactOffice[];
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string | null;
};

export function mapContactPageFromStrapi(apiData: unknown): MappedContactPage {
  const fallback: MappedContactPage = {
    heroTitle: CONTACT_PAGE_DEFAULTS.heroTitle,
    sectionTitle: CONTACT_PAGE_DEFAULTS.sectionTitle,
    offices: CONTACT_OFFICES,
  };

  if (apiData == null) return fallback;
  const doc = pickDocument<Record<string, unknown>>(apiData);
  if (!doc || Object.keys(doc).length === 0) return fallback;

  const heroTitle = pickStr(doc.heroTitle) || fallback.heroTitle;
  const sectionTitle = pickStr(doc.sectionTitle) || fallback.sectionTitle;

  const seoRaw = unwrapStrapiComponent(doc.seo);
  const metaTitle = pickStr(seoRaw?.metaTitle) || undefined;
  const metaDescription = pickStr(seoRaw?.metaDescription) || undefined;
  const ogImageUrl = getStrapiMedia(unwrapMedia(seoRaw?.shareImage) ?? null);

  const officeRows = unwrapStrapiEntryArray(doc.offices);
  const offices = officeRows
    .map((o) => mapOfficeRow(unwrapStrapiComponent(o) ?? o))
    .filter(Boolean) as ContactOffice[];

  const seoBlock =
    metaTitle || metaDescription || ogImageUrl
      ? { metaTitle, metaDescription, ogImageUrl: ogImageUrl || undefined }
      : {};

  if (offices.length === 0) {
    return { heroTitle, sectionTitle, offices: fallback.offices, ...seoBlock };
  }

  return { heroTitle, sectionTitle, offices, ...seoBlock };
}
