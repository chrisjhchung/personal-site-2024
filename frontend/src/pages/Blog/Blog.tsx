// ./frontend/pages/Blog.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../api/client";

const Blog = () => {
  const { slug } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      console.log("slug", slug);
      if (slug) {
        const fetchedPost = await client.fetch(
          `*[_type == "post" && slug.current == $slug][0]`,
          { slug }
        );
        setPost(fetchedPost);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.slug.current}</h1>
    </div>
  );
};

export default Blog;
