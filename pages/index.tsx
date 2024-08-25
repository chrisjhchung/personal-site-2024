import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { getAllMdx } from '@/lib/mdx';
import { MDXFrontMatter } from '@/lib/types';
import { ArrowRight } from 'react-feather';
import styles from './index.module.scss';
import { Page } from '@/components/Page';
import { Prose } from '@/components/Prose';

interface HomeProps {
  posts: Array<MDXFrontMatter>;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <Page
        title="Chris Chung."
        description="Yep, you guessed it — I'm Chris. Don't worry, I kept the title simple
            just for you."
      >
        <Prose>
          <p>Now, you're probably wondering one or all of the following:</p>
          <ul>
            <li>"How did I get here?"</li>
            <li>"What is this website even for?"</li>
            <li>"Who let the dogs out?"</li>
          </ul>
          <p>
            Great questions! I wish I knew the answer. Until I figure it out,
            this is where I’ll be dumping things I’ve learned, random stuff I
            find interesting, and whatever else I feel like oversharing.
          </p>
          <p>
            So go ahead, poke around! If you find something that's broken (which
            is highly likely), or if you just want to say hello, feel free to
            reach out using the social links at the bottom of the page. I'll try
            my best to pretend I know what I'm doing.
          </p>
        </Prose>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mdxFiles = getAllMdx().map((post) => post['frontMatter']);
  return {
    props: {
      posts: mdxFiles.slice(0, 5),
    },
  };
};

export default Home;
