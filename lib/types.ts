export type SiteConfig = {
  avatar?: string;
  siteUrl: string;
  siteName: string;
  siteDescription: string;
  siteThumbnail: string;
  nav: Array<{ label: string; href: string }>;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export type MDXFrontMatter = {
  published: boolean;
  slug: string;
  title: string;
  part?: number;
  description?: string;
  date: string;
  tags?: Array<string>;
};
