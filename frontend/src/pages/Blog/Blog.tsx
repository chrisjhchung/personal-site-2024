import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Blog = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPosts = async () => {
      const sanityHost = import.meta.env.VITE_SANITY_HOST;
      const start = (currentPage - 1) * postsPerPage;
      const end = start + postsPerPage;
      const query = encodeURIComponent(
        `*[_type == "post"] | order(publishedAt desc)[${start}...${end}] {
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
  }, [currentPage]);

  const handleCardClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    // Assuming you know the total number of posts, you can limit the next page button
    setCurrentPage(currentPage + 1);
  };

  if (posts.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {/* Render list of posts */}
      {posts.map((p, index) => (
        <div
          key={index}
          className="postCard"
          onClick={() => handleCardClick(p.slug)}
        >
          <h2>{p.title}</h2>
          <p>Author: {p.author}</p>
          <p>Published on: {p.publishedAt}</p>
          <p>Categories: {p.categories.join(", ")}</p>
          {p.mainImageUrl && <img src={p.mainImageUrl} alt={p.title} />}
        </div>
      ))}

      {/* Pagination controls */}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button disabled={posts.length <= 10} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
