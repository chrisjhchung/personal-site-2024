import { GetStaticProps, NextPage } from 'next';
import { getAllMdx } from '@/lib/mdx';
import { MDXFrontMatter } from '@/lib/types';
import { Page } from '@/components/Page';
import { PostList } from '@/components/PostList';
import styles from './index.module.scss';
import { Prose } from '@/components/Prose';
import { useRouter } from 'next/router';

interface PostsProps {
  posts: Array<MDXFrontMatter>;
}

const Posts: NextPage<PostsProps> = ({ posts }) => {
  const router = useRouter();
  const { tag } = router.query; // Get the tag from query params
  const filteredPosts =
    typeof tag === 'string' && tag
      ? posts.filter((post) =>
          post.tags?.map((tag) => tag.replace(/ /g, '-')).includes(tag),
        )
      : posts;

  return (
    <div className={styles.container}>
      <Page
        title="Posts"
        description="(This is the dump that I was talking about in the home page.)"
      >
        <PostList posts={filteredPosts} />
      </Page>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mdxFiles = getAllMdx().map((post) => post['frontMatter']);
  return {
    props: {
      posts: mdxFiles,
    },
  };
};

export default Posts;
