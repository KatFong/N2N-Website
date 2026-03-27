export type NewsArticle = {
  slug: string;
  title: string;
  category: 'Announcement' | 'Press Release';
  publishedDate: string;
  excerpt: string;
  content: string;
};

export const pressAndAnnouncementArticles: NewsArticle[] = [
  {
    slug: 'announcement-25022026-a1',
    title: 'General Announcement - Corporate Update (A1)',
    category: 'Announcement',
    publishedDate: '2026-02-25',
    excerpt:
      'N2N Connect announces key corporate updates and operational highlights for stakeholders.',
    content:
      '<p>N2N Connect Berhad provides this general announcement to keep shareholders and market participants informed on the latest corporate developments and business priorities.</p><p>Further details are available through Bursa filings and official investor communication channels.</p>',
  },
  {
    slug: 'announcement-20220819',
    title: 'General Announcement - Business and Financial Update',
    category: 'Announcement',
    publishedDate: '2022-08-19',
    excerpt:
      'Operational and financial developments released for investor awareness and transparency.',
    content:
      '<p>This announcement outlines the latest operational progress and financial updates relevant to shareholders and potential investors.</p><p>The company remains focused on sustainable growth and disciplined execution.</p>',
  },
  {
    slug: 'press-20191002-ivsc-nst-edu',
    title: 'N2N Group Education Initiative Highlighted by NST',
    category: 'Press Release',
    publishedDate: '2019-10-02',
    excerpt:
      'Media coverage on N2N Group community and education initiatives in regional markets.',
    content:
      '<p>N2N Group continues to support education and industry collaboration initiatives to cultivate future-ready talent and technology-driven growth.</p>',
  },
  {
    slug: 'press-20190807-ivsc-nst-business',
    title: 'Industry Commentary and Market Outlook by N2N',
    category: 'Press Release',
    publishedDate: '2019-08-07',
    excerpt:
      'N2N shares market perspective and strategic outlook in a featured business article.',
    content:
      '<p>The interview highlights N2N&apos;s long-term commitment to capital market technology, innovation, and regional expansion.</p>',
  },
  {
    slug: 'press-20181226-sbi-theedge',
    title: 'SBI Strategic Collaboration Mentioned by The Edge',
    category: 'Press Release',
    publishedDate: '2018-12-26',
    excerpt:
      'Press coverage around strategic collaboration milestones and technology positioning.',
    content:
      '<p>This release captures a strategic collaboration update and the company&apos;s progress in strengthening market positioning through technology partnerships.</p>',
  },
  {
    slug: 'press-20161012-afe-star',
    title: 'AFE Coverage: Platform Expansion and Product Momentum',
    category: 'Press Release',
    publishedDate: '2016-10-12',
    excerpt:
      'Regional press feature on product development and expansion plans across markets.',
    content:
      '<p>N2N&apos;s platform and product roadmap continue to evolve in line with changing capital market demands and digital transformation priorities.</p>',
  },
];
