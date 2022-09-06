import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleArticle.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import MainContext from "./MainContext";
import axios from "axios";

const SingleArticle = () => {
  const params = useParams();
  const navigate = useNavigate(); // This is a hook that allows us to navigate to a different page
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const { loggedIn } = useContext(MainContext);
  const { id } = useParams();

  useEffect(() => {
    Axios.get("/api/posts/" + id).then((res) => {
      if (!res) {
        // If the post doesn't exist, navigate to the 404 page
        return navigate("/"); // This is how we navigate to a different page
      } else {
        setPost(res.data);
      }
    });
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    axios.post("/api/comments/", { comment, postId: id }).then((res) => {
      try {
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
    console.log("veikia");
  };

  console.log(comment);

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
        {loggedIn ? (
          <div className="comment-form">
            <h3>Leave a comment</h3>
            <form onSubmit={(e) => handleForm(e)}>
              <div className="form-group">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  name="comment"
                  value={comment}
                ></textarea>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        ) : (
          <h3>Login to comment</h3>
        )}
        {post.comments && (
          <div className="comments">
            {post.comments.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))}
          </div>
        )}
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
