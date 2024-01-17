import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

const BlogPost = () => {
  const { slug } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const sanityHost = import.meta.env.VITE_SANITY_HOST;
        const query = encodeURIComponent(
          `*[_type == "post" && slug.current == "${slug}"]{
            title,
            "author": author->name,
            publishedAt,
            "categories": categories[]->title,
            "mainImageUrl": mainImage.asset->url,
            body
          }[0]`
        );
        const url = `${sanityHost}/v1/data/query/production?query=${query}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          setPost(data.result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      {/* Render author, categories, etc. */}
      <div>
        {post.mainImageUrl && <img src={post.mainImageUrl} alt={post.title} />}
      </div>
      <BlockContent blocks={post.body} />
      {/* You can pass project ID and dataset to BlockContent if needed */}
    </article>
  );
};

export default BlogPost;
