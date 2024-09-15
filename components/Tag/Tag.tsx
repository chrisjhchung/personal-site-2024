import Link from 'next/link';
import { cx, slugify } from '@/lib/utils';
import styles from './index.module.scss';

interface TagProps {
  children: string;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
  const href = `/posts?tag=${slugify(children)}`;
  return (
    <Link href={href} className={styles.chip}>
      #{slugify(children)}
    </Link>
  );
};
