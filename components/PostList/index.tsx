import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import type { MDXFrontMatter } from "@/lib/types";
import { Prose } from "@/components/Prose";
import { cx, slugify } from "@/lib/utils";
import { Tag } from "../Tag";
import styles from "./index.module.scss";

interface PostListProps {
  posts: Array<MDXFrontMatter>;
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className={styles.posts}>
      {posts.map((post, index) => {
        return (
          <li key={index}>
            <time className={styles.time}>{formatDate(post.date)}</time>
            <h2 className={styles.title}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
          </li>
        );
      })}
    </ul>
  );
};
