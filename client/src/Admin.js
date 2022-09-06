import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, matchRoutes } from "react-router-dom";
import Axios from "axios";
import convertDate from "./utils/Date";
import "./Articles.css";
import MainContext from "./MainContext";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { loggedIn } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/api/posts").then((res) => {
      console.log(res);
      setPosts(res.data);
    }); //reikia catchą idet
  }, [refresh]);

  const handleDelete = (id) => {
    if (isNaN(id) || !loggedIn) return;

    Axios.delete("/api/posts/delete/" + id)
      .then((res) => {
        setAlert(res.data);
        setRefresh(!refresh);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.message);
        window.scrollTo(0, 0);

        if (err.response.status === 500) {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .finally(() => {
        setTimeout(() => setAlert(""), 1000);
      });
  };

  return (
    <div className="container">
      <h2>Administrator panel</h2>{" "}
      <div>{alert && <div className="alert">{alert}</div>}</div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date created</th>
            <th>Date modified</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="table-row">
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{convertDate(post.createdAt)}</td>
              <td>{convertDate(post.updatedAt)}</td>
              <td>
                <Link to="" onClick={() => handleDelete(post.id)}>
                  delete
                </Link>
              </td>
              <td>
                <Link to={"/admin/edit/" + post.id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
