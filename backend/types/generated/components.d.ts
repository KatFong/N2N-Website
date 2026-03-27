import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAdvantageCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_advantage_cards';
  info: {
    description: 'Core Advantages \u2014 single card (title + description)';
    displayName: 'Advantage Card';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContactCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_cta_sections';
  info: {
    description: '\u661F\u7A7A / \u5E7E\u4F55\u80CC\u666F + \u806F\u7E6B\u6587\u6848 + \u6309\u9215\uFF08\u53EF\u9078\u80CC\u666F\u5716\u8986\u84CB\uFF09';
    displayName: 'Contact CTA Section';
    icon: 'phone';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u806F\u7E6B\u6211\u5011'>;
    buttonLink: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/login'>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_content_blocks';
  info: {
    description: 'Rich text content block';
    displayName: 'Content Block';
    icon: 'align-left';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<
      ['left', 'right', 'top', 'bottom']
    > &
      Schema.Attribute.DefaultTo<'right'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCoreAdvantagesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_core_advantages_sections';
  info: {
    description: 'Stats strip + three advantage cards';
    displayName: 'Core Advantages Section';
    icon: 'star';
  };
  attributes: {
    advantageCards: Schema.Attribute.Component<'sections.advantage-card', true>;
    introText: Schema.Attribute.Text;
    moduleLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Module 02'>;
    stats: Schema.Attribute.Component<'sections.stat-item', true>;
    statStripBackgroundImage: Schema.Attribute.Media<'images'>;
    titleEn: Schema.Attribute.String;
    titleZh: Schema.Attribute.String;
  };
}

export interface SectionsFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_cards';
  info: {
    description: 'A feature card with icon, title, and description';
    displayName: 'Feature Card';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: 'Hero banner section';
    displayName: 'Hero';
    icon: 'layout';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaLabel: Schema.Attribute.String;
    ctaLink: Schema.Attribute.String;
    ctaSecondaryLabel: Schema.Attribute.String;
    ctaSecondaryLink: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    showLogo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHomeNewsItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_home_news_items';
  info: {
    description: 'News row in Home \u2014 \u65B0\u95FB\u4E0E\u6D3B\u52A8 list';
    displayName: 'Home News Item';
    icon: 'link';
  };
  attributes: {
    excerpt: Schema.Attribute.Text;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHomeNewsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_home_news_sections';
  info: {
    description: 'Featured image + news list + \u66F4\u591A';
    displayName: 'Home News Section';
    icon: 'newspaper';
  };
  attributes: {
    featuredImage: Schema.Attribute.Media<'images'>;
    featuredLink: Schema.Attribute.String;
    featuredTitle: Schema.Attribute.String;
    introText: Schema.Attribute.Text;
    moduleLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Module 04'>;
    moreButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u66F4\u591A'>;
    moreButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/news-insights'>;
    newsItems: Schema.Attribute.Component<'sections.home-news-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 0;
        },
        number
      >;
    titleEn: Schema.Attribute.String;
    titleZh: Schema.Attribute.String;
  };
}

export interface SectionsProductItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_product_items';
  info: {
    description: 'A single product/service card';
    displayName: 'Product Item';
    icon: 'cube';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      [
        'financial-info',
        'settlement',
        'trading',
        'server-hosting',
        'virtual-assets',
        'mobile-pro',
        'n2nquant',
        'master-picks',
      ]
    >;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsProductsOverviewSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_products_overview_sections';
  info: {
    description: '\u4EA7\u54C1\u4E0E\u670D\u52A1 \u2014 module label, titles, product cards';
    displayName: 'Products Overview Section';
    icon: 'apps';
  };
  attributes: {
    introText: Schema.Attribute.Text;
    moduleLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Module 03'>;
    products: Schema.Attribute.Component<'sections.product-item', true>;
    titleEn: Schema.Attribute.String;
    titleZh: Schema.Attribute.String;
  };
}

export interface SectionsRegionItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_region_items';
  info: {
    description: 'A single geographic region';
    displayName: 'Region Item';
    icon: 'globe';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStatItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_stat_items';
  info: {
    description: 'A single stat number with label';
    displayName: 'Stat Item';
    icon: 'hashtag';
  };
  attributes: {
    description: Schema.Attribute.String;
    format: Schema.Attribute.Enumeration<['int', 'comma']> &
      Schema.Attribute.DefaultTo<'int'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    prefix: Schema.Attribute.String;
    suffix: Schema.Attribute.String & Schema.Attribute.DefaultTo<'+'>;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.advantage-card': SectionsAdvantageCard;
      'sections.contact-cta-section': SectionsContactCtaSection;
      'sections.content-block': SectionsContentBlock;
      'sections.core-advantages-section': SectionsCoreAdvantagesSection;
      'sections.feature-card': SectionsFeatureCard;
      'sections.hero': SectionsHero;
      'sections.home-news-item': SectionsHomeNewsItem;
      'sections.home-news-section': SectionsHomeNewsSection;
      'sections.product-item': SectionsProductItem;
      'sections.products-overview-section': SectionsProductsOverviewSection;
      'sections.region-item': SectionsRegionItem;
      'sections.stat-item': SectionsStatItem;
      'shared.seo': SharedSeo;
    }
  }
}
