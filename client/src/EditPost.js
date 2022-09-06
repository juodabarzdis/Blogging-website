import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

// NEVEIKIA NUOTRAUKOS REDAGAVIMAS

const EditPost = () => {
  const [alert, setAlert] = useState("");
  const { id } = useParams();
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    content_full: "",
    category: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleForm = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    for (const key in postForm) {
      form.append(key, postForm[key]);
    }

    Axios.put("/api/posts/edit/" + id, form).then((res) => {
      setTimeout(() => {
        setAlert(res.data);
        navigate("/");
      }, 1000);
    });
  };

  useEffect(() => {
    Axios.get("/api/posts/" + id)
      .then((res) => {
        if (!res) {
          return navigate("/");
        } else {
          console.log(res);
          setPostForm(res.data);
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
          {alert && <div className="alert">{alert}</div>}
          <div>
            <h1>Edit Post</h1>
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
                value={postForm.title}
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
                value={postForm.category}
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
                value={postForm.content}
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
                value={postForm.content_full}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Image</label>
            </div>
            <div>
              <input
                type="file"
                name="image"
                onChange={(e) => handleForm(e)}
                // value={postForm.image}
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
