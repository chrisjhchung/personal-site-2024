import React from "react";
import styles from "./BlogCard.module.css";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const { title, name, publishedAt, categories, mainImageUrl, slug } = post;
  return (
    <div key={slug?.current}>
      <button
        className={styles.card}
        onClick={() => {
          navigate(`/blog/${slug?.current}`);
        }}
      >
        <img src={mainImageUrl} alt={title} />
        <h3>{title}</h3>
        {categories?.map((category, i) => (
          <span key={`${category}-${i}`} className={styles.categoryTag}>
            {category}
          </span>
        ))}
        <p> Written by: {name ?? "...no one?"}</p>
        <p> Published: {publishedAt ?? "some time"}</p>
      </button>
    </div>
  );
};

export default BlogCard;
