/** 内容对齐 n2nconnect-reference/site/contact-us.html（邮件由 Cloudflare 字串解码） */

/** Strapi `contact-page` 与前台预设标题 */
export const CONTACT_PAGE_DEFAULTS = {
  heroTitle: '联系我们',
  sectionTitle: '办公地点',
} as const;

export type ContactEmailBox = {
  heading: string;
  email: string;
};

export type ContactOffice = {
  country: string;
  company: string;
  address: string;
  phones?: { label?: string; tel: string }[];
  fax?: string;
  website?: { label: string; href: string };
  emails?: { label?: string; email: string }[];
  emailBoxes?: ContactEmailBox[];
  mapEmbedUrl: string;
};

export const CONTACT_OFFICES: ContactOffice[] = [
  {
    country: '马来西亚',
    company: 'N2N CONNECT BERHAD',
    address:
      'Wisma N2N, Level 9, Tower 2, Avenue 3, Bangsar South, No. 8, Jalan Kerinchi, 59200 Kuala Lumpur, West Malaysia.',
    phones: [{ tel: '+603 2241 1818' }],
    fax: '+603 2241 1616',
    emailBoxes: [
      { heading: '产品咨询', email: 'n2n_sales@n2nconnect.com' },
      { heading: '招聘咨询', email: 'n2n_hr@n2nconnect.com' },
      { heading: '投资者关系', email: 'ir@n2nconnect.com' },
      { heading: '一般咨询', email: 'n2n_admin@n2nconnect.com' },
    ],
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=101.657146%2C3.101172%2C101.677146%2C3.121172&layer=mapnik&marker=3.111172%2C101.667146',
  },
  {
    country: '新加坡',
    company: 'N2N CONNECT PTE LTD',
    address: '22 Sin Ming Lane #06-76 Midview City Singapore 573969',
    emailBoxes: [
      { heading: '产品咨询', email: 'n2n_sales@n2nconnect.com' },
      { heading: '招聘咨询', email: 'n2n_hr@n2nconnect.com' },
      { heading: '一般咨询', email: 'n2n_admin@n2nconnect.com' },
    ],
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=103.821091%2C1.348756%2C103.841091%2C1.368756&layer=mapnik&marker=1.358756%2C103.831091',
  },
  {
    country: '香港',
    company: 'N2N-AFE (HONG KONG) LIMITED',
    address: 'Unit 1907B-1910A, 19/F., One Harbourfront, 18 Tak Fung Street, Hunghom, Kowloon, Hong Kong',
    phones: [{ tel: '+852 2329 2288' }],
    website: { label: 'http://afe.hk/', href: 'http://afe.hk/' },
    emails: [{ email: 'contact@afe-solutions.com' }],
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=114.179460%2C22.292356%2C114.199460%2C22.312356&layer=mapnik&marker=22.302356%2C114.189460',
  },
  {
    country: '越南',
    company: 'N2N-AFE (VIETNAM) LIMITED',
    address: '1F Emerald Building, 69-71 Huynh Tinh Cua, District 3, HCMC, Vietnam',
    phones: [{ tel: '+84 28 3929 2958' }],
    website: { label: 'http://afe.hk/', href: 'http://afe.hk/' },
    emails: [{ email: 'vncontact@afe-solutions.com' }],
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=106.676982%2C10.779538%2C106.696982%2C10.799538&layer=mapnik&marker=10.789538%2C106.686982',
  },
];
