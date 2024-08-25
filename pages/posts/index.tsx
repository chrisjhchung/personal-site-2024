import type { GetStaticProps, NextPage } from "next";
import { getAllMdx } from "@/lib/mdx";
import { MDXFrontMatter } from "@/lib/types";
import { Page } from "@/components/Page";
import { PostList } from "@/components/PostList";
import styles from "./index.module.scss";
import { Prose } from "@/components/Prose";
interface PostsProps {
  posts: Array<MDXFrontMatter>;
}

const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Page
        title="Posts"
        description="(This is the dump that I was talking about in the home page.)"
      >
        <PostList posts={posts} />
      </Page>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mdxFiles = getAllMdx().map((post) => post["frontMatter"]);
  return {
    props: {
      posts: mdxFiles,
    },
  };
};

export default Posts;
