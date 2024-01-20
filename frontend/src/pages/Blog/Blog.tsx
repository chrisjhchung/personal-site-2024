import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import styles from "./Blog.module.css";

const Blog = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const sanityHost = import.meta.env.VITE_SANITY_HOST;
      const query = encodeURIComponent(
        `*[_type == "post"] | order(publishedAt desc) {
          title,
          "author": author->name,
          publishedAt,
          "categories": categories[]->title,
          "mainImageUrl": mainImage.asset->url,
          "slug": slug.current 
        }`
      );
      const url = `${sanityHost}/v1/data/query/production?query=${query}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* Render list of posts */}
      {posts.map((p, index) => (
        <BlogCard key={index} post={p} />
      ))}
    </div>
  );
};

export default Blog;
