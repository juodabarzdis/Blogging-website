import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    content_full: "",
    category: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleForm = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put("/api/posts/edit/" + id, post).then((resp) => console.log(resp));
  };

  useEffect(() => {
    Axios.get("/api/posts/" + id)
      .then((res) => {
        if (!res) {
          return navigate("/");
        } else {
          console.log(res);
          setPost(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // useNavigate - jei zmogus neprisijunges, darom userNavigate. Tikrinam kiekvienam komponente ar yra useris, jei nera, nukreipiame i login
    <div className="newPost-wrapper">
      <div className="newPost-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h1>New Post</h1>
          </div>
          <div>
            <div>
              <label>Title</label>
            </div>
            <div>
              <input
                type="text"
                name="title"
                onChange={(e) => handleForm(e)}
                value={post.title}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Category</label>
            </div>
            <div>
              <input
                type="text"
                name="category"
                onChange={(e) => handleForm(e)}
                value={post.category}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Content</label>
            </div>
            <div>
              <textarea
                type="text"
                name="content"
                onChange={(e) => handleForm(e)}
                value={post.content}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Full Content</label>
            </div>
            <div>
              <textarea
                type="text"
                name="content_full"
                onChange={(e) => handleForm(e)}
                value={post.content_full}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Image</label>
            </div>
            <div>
              <input
                type="text"
                name="image"
                onChange={(e) => handleForm(e)}
                value={post.image}
              />
            </div>
          </div>
          <div>
            <button>Submit post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
