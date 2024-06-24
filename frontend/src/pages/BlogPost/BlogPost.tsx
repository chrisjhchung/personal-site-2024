import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import { client } from "../../api/client"; // Update this path

interface Post {
  title: string;
  author: string;
  publishedAt: string;
  categories: string[];
  mainImageUrl: string;
  body: any[]; // You might want to define a more specific type for body
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const result = await client.fetch<Post>(
            `
            *[_type == "post" && slug.current == $slug][0]{
              title,
              "author": author->name,
              publishedAt,
              "categories": categories[]->title,
              "mainImageUrl": mainImage.asset->url,
              body
            }
          `,
            { slug }
          );

          setPost(result);
        } catch (error) {
          console.error("Error fetching post:", error);
          setError("Failed to fetch the blog post. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author}</p>
      <p>Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
      <p>Categories: {post.categories.join(", ")}</p>
      <div>
        {post.mainImageUrl && <img src={post.mainImageUrl} alt={post.title} />}
      </div>
      <BlockContent
        blocks={post.body}
        projectId={client.config().projectId}
        dataset={client.config().dataset}
      />
    </article>
  );
};

export default BlogPost;
