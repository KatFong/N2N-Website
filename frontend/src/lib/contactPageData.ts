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
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15935.751014043597!2d101.667146!3d3.111172!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8e56c4093c3976c2!2sN2N%20Connect%20Berhad!5e0!3m2!1sen!2smy!4v1577343681556!5m2!1sen!2smy',
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.696455116455!2d103.83109147558413!3d1.358756361545886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1725f6ca4f35%3A0x7ff1fd1b9c84ac7e!2sMidview%20City!5e0!3m2!1sen!2smy!4v1680770223970!5m2!1sen!2smy',
  },
  {
    country: '香港',
    company: 'N2N-AFE (HONG KONG) LIMITED',
    address: 'Unit 1907B-1910A, 19/F., One Harbourfront, 18 Tak Fung Street, Hunghom, Kowloon, Hong Kong',
    phones: [{ tel: '+852 2329 2288' }],
    website: { label: 'http://afe.hk/', href: 'http://afe.hk/' },
    emails: [{ email: 'contact@afe-solutions.com' }],
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.356428801209!2d114.18946045055537!3d22.302355948384093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404011e299fe3ef%3A0xc85acb7d6a011788!2sOne%20Harbourfront!5e0!3m2!1sen!2smy!4v1585273082395!5m2!1sen!2smy',
  },
  {
    country: '越南',
    company: 'N2N-AFE (VIETNAM) LIMITED',
    address: '1F Emerald Building, 69-71 Huynh Tinh Cua, District 3, HCMC, Vietnam',
    phones: [{ tel: '+84 28 3929 2958' }],
    website: { label: 'http://afe.hk/', href: 'http://afe.hk/' },
    emails: [{ email: 'vncontact@afe-solutions.com' }],
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.13644181104!2d106.6869817!3d10.7895384!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x11043cf07da9322f!2sEmerald%20Central!5e0!3m2!1sen!2smy!4v1610349494257!5m2!1sen!2smy',
  },
];
