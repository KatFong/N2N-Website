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
    description: '\u9996\u5C4F\u6A6B\u5E45\uFF08\u9996\u9801\u8207\u5176\u4ED6\u5167\u9801\u5171\u7528\uFF09\u3002\u6B04\u4F4D\u5C0D\u61C9\u524D\u53F0\uFF1ASubtitle\uFF1D\u4E3B\u6A19\u4E0A\u884C\uFF08\u516C\u53F8\u5168\u540D\uFF09\uFF1BTitle\uFF1D\u4E3B\u6A19\u4E0B\u884C\uFF08\u6A19\u8A9E\uFF09\uFF1BDescription\uFF1D\u4E3B\u6A19\u4E0B\u65B9\u8AAA\u660E\uFF1BCTA \u70BA\u5169\u9846\u6309\u9215\u6587\u6848\u8207\u9023\u7D50\u3002';
    displayName: 'Hero';
    icon: 'layout';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u4E86\u89E3\u6211\u4EEC\u7684\u4EA7\u54C1'>;
    ctaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/products-services'>;
    ctaSecondaryLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u5168\u7403\u4E1A\u52A1\u7F51\u7EDC'>;
    ctaSecondaryLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/global-business'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'\u4E3A\u5168\u7403\u8BC1\u5238\u3001\u671F\u8D27\u3001\u57FA\u91D1\u53CA\u503A\u5238\u5E02\u573A\u63D0\u4F9B\u5FEB\u901F\u3001\u51C6\u786E\u3001\u53EF\u9760\u7684\u4EA4\u6613\u4E0E\u7ED3\u7B97\u89E3\u51B3\u65B9\u6848'>;
    showLogo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u8054\u76DB\u4E9A\u5BCC\u8D44\u8BAF\u79D1\u6280\u6709\u9650\u516C\u53F8\uFF08N2N-AFE\uFF09'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'43\u5E74\u4E13\u4E1A | \u91D1\u878D\u79D1\u6280\u7684\u53EF\u9760\u4F19\u4F34'>;
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
    coverImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      [
        'institutional',
        'fintech',
        'retail',
        'hosting',
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
    subtitle: Schema.Attribute.String;
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
