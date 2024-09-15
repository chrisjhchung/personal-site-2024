import { cx } from '@/lib/utils';
import { Prose } from '../Prose';
import styles from './index.module.scss';

interface NoteProps {
  emoji?: string;
  children: React.ReactNode;
}

export const Note: React.FC<NoteProps> = ({ emoji, children }) => {
  return (
    <aside className={styles.Note}>
      {emoji ? <span>{emoji}</span> : null}
      <Prose>{children}</Prose>
    </aside>
  );
};
