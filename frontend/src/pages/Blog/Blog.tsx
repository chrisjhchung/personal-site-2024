import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import styles from "./Blog.module.css";
import { client } from "../../api/client"; // Import the Sanity client

interface Post {
  title: string;
  author: string;
  publishedAt: string;
  categories: string[];
  mainImageUrl: string;
  body: any[]; // You might want to define a more specific type for body
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"]{
        title,
        "name": author->name,
        "categories": categories[]->title,
        "authorImage": author->image,
        body,
        slug,
        mainImage
      }`;

      try {
        const result = await client.fetch(query);
        console.log("result", result);
        setPosts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <BlogCard key={post.title || index} post={post} />
      ))}
    </div>
  );
};

export default Blog;
