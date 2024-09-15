import Head from 'next/head';
import { onlyText } from 'react-children-utilities';
import { formatDate } from '@/lib/formatDate';
import siteConfig from '@/data/siteConfig';
import { Prose } from '@/components/Prose';
import styles from './index.module.scss';
import { Tag } from '../Tag/Tag';

interface PageProps {
  date?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  thumbnail?: string;
  part?: number;
  tags?: string[];
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
  date,
  title,
  description,
  thumbnail,
  part,
  tags,
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
        <h1 className={styles.title}>
          {title}
          {part && <span className={styles.chip}>Part {part}</span>}
        </h1>
        {date ? <time className={styles.time}>{formatDate(date)}</time> : null}
        {tags && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        )}
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
