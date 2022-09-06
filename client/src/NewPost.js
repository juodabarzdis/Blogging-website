import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import Axios from "axios";

const NewPost = () => {
  const navigate = useNavigate();

  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    content_full: "",
    image: "",
    category: "",
    comment_count: 0,
  });

  const handleForm = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // CHANGE
    const form = new FormData();

    for (const key in postForm) {
      form.append(key, postForm[key]);
    }
    // CHANGE
    Axios.post("/api/posts/", form).then((resp) =>
      setTimeout(() => {
        navigate("/");
      }, 1000)
    );
  };

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
              <input type="text" name="title" onChange={(e) => handleForm(e)} />
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
              />
            </div>
          </div>
          <div>
            <div>
              <label>Image</label>
            </div>
            <div>
              <input type="file" name="image" onChange={(e) => handleForm(e)} />
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

export default NewPost;
