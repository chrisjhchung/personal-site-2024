import Head from 'next/head';
import { onlyText } from 'react-children-utilities';
import { formatDate } from '@/lib/formatDate';
import siteConfig from '@/data/siteConfig';
import { Prose } from '@/components/Prose';
import styles from './index.module.scss';

interface PageProps {
  date?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  thumbnail?: string;
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
  date,
  title,
  description,
  thumbnail,
  children,
}) => {
  const metaTitle = onlyText(title);
  const metaDescription = description
    ? onlyText(description)
    : siteConfig.siteDescription;
  const metaThumbnail = thumbnail ? thumbnail : siteConfig.siteThumbnail;
  return (
    <div className={styles.page}>
      <Head>
        <title>{siteConfig.siteName}</title>
        <meta name="og:url" content={siteConfig.siteUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="og:description" content={metaDescription} />
        <meta
          property="og:image"
          content={`${siteConfig.siteUrl}${metaThumbnail}`}
        />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {date ? <time className={styles.time}>{formatDate(date)}</time> : null}
        {description ? (
          <div className={styles.description}>
            <Prose>
              {typeof description === 'string' ? (
                <p>{description}</p>
              ) : (
                description
              )}
            </Prose>
          </div>
        ) : null}
      </header>
      {children}
    </div>
  );
};
