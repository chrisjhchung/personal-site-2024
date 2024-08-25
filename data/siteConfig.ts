import type { SiteConfig } from '@/lib/types';
const siteConfig: SiteConfig = {
  siteUrl: 'https://www.chrisjhchung.com',
  siteName: 'Chris Chung',
  siteDescription: "Chris Chung's Personal Website.",
  siteThumbnail: '/og-image.png',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'About', href: '/about' },
  ],
  social: {
    github: 'https://github.com/chrisjhchung',
    twitter: 'https://twitter.com/chrisjhchung',
    linkedin: 'https://www.linkedin.com/in/chrisjhchung/',
    instagram: 'https://www.instagram.com/chrisjhchung/',
  },
};
export default siteConfig;
