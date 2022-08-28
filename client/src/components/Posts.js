import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="">
      {posts.map((post) => (
        <li key={post.id} className="">
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
