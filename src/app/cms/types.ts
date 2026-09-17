export type CompanyBgKind = "oil" | "palm" | "milk" | "syrup" | "video" | "image";

export type StatItem = { id: string; n: string; l: string };
export type TextItem = { id: string; title: string; desc: string };
export type LabelValue = { id: string; label: string; value: string };

export type CompanyItem = {
  id: string;
  number: string;
  name: string;
  description: string;
  tags: string[];
  website: string;
  websiteLabel: string;
  bgKind: CompanyBgKind;
  videoUrl?: string;
  imageUrl?: string;
  gradientFrom: string;
  gradientTo: string;
  order: number;
  published: boolean;
};

export type NewsItem = {
  id: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  published: boolean;
  order: number;
};

export type DirectionItem = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  desc: string;
  img: string;
  order: number;
  published: boolean;
  /** Optional deep-link for "Подробнее" (e.g. "/business/jib") */
  detailTo?: string;
};

export type JibHistoryItem = { id: string; year: string; title: string; desc: string; order: number };
export type JibProduct = { id: string; name: string; note: string; img: string; order: number };

export type BrandItem = {
  id: string;
  name: string;
  cat: string;
  desc?: string;
  order: number;
};

export type AudienceItem = {
  id: string;
  label: string;
  subtitle: string;
  img: string;
  desc: string;
  benefits: string[];
  order: number;
  published: boolean;
};

export type JobItem = {
  id: string;
  title: string;
  dept: string;
  type: string;
  location: string;
  order: number;
  published: boolean;
};

export type FooterLink = { label: string; to?: string };
export type FooterCol = { id: string; title: string; links: FooterLink[] };

export type SectionHeader = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lead?: string;
};

export type CmsData = {
  updatedAt: string;

  homeHero: SectionHeader & {
    badge: string;
    titleLine1: string;
    titleAccent: string;
    titleLine3: string;
    subtitle: string;
    body: string;
    photoUrl: string;
    ctaPrimary: string;
    ctaPrimaryTo: string;
    ctaSecondary: string;
    ctaSecondaryTo: string;
  };

  keyStats: SectionHeader & { items: StatItem[] };

  about: SectionHeader & {
    body: string;
    body2: string;
    capabilities: string[];
    missionTitle: string;
    missionBody: string;
    valuesTitle: string;
    values: string[];
  };

  business: SectionHeader & { directions: DirectionItem[] };

  brands: SectionHeader & {
    own: BrandItem[];
    exclusive: BrandItem[];
    distributed: BrandItem[];
    categories: string[];
  };

  geography: SectionHeader & {
    rows: LabelValue[];
    factories: { id: string; country: string; role: string }[];
    plants: { id: string; flag: string; title: string; note: string }[];
  };

  why: SectionHeader & { reasons: TextItem[] };

  partnership: SectionHeader & {
    audiences: AudienceItem[];
    formEyebrow: string;
    formTitle: string;
    formLead: string;
    coopTypes: string[];
  };

  careers: SectionHeader & {
    values: TextItem[];
    roles: JobItem[];
    teamImage: string;
    teamCaption: string;
    rolesHeading: string;
  };

  contact: SectionHeader & {
    address: string;
    phone: string;
    email: string;
    hours: string;
    footerBlurb: string;
    copyright: string;
  };

  companiesHero: SectionHeader & { lead: string };
  companies: CompanyItem[];
  news: NewsItem[];

  jib: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    heroSubtitle: string;
    heroImage: string;
    logoUrl: string;
    aboutTitle: string;
    about: string;
    about2: string;
    mission: string;
    aboutImage: string;
    stats: StatItem[];
    history: JibHistoryItem[];
    productsTitle: string;
    productsLead: string;
    products: JibProduct[];
    byproductsTitle: string;
    byproducts: string[];
    capabilitiesTitle: string;
    capabilities: string[];
    standardsTitle: string;
    standards: string[];
    ctaTitle: string;
    ctaLead: string;
    website: string;
    websiteLabel: string;
  };
};
