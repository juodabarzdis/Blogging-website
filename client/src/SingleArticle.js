import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleArticle.css";
import { Link } from "react-router-dom";
import Axios from "axios";

const SingleArticle = () => {
  const params = useParams();
  const navigate = useNavigate(); // This is a hook that allows us to navigate to a different page

  const [post, setPost] = useState({});

  useEffect(() => {
    Axios.get("/api/posts/" + params.id).then((res) => {
      if (!res) {
        // If the post doesn't exist, navigate to the 404 page
        return navigate("/"); // This is how we navigate to a different page
      } else {
        setPost(res.data);
      }
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="single-article">
        <div className="article-image">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="article-text">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{post.content_full}</p>
        </div>
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
