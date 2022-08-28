import "./Articles.css";
import { useState, useEffect } from "react";
import { VscComment } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Axios from "axios";
import Pagination from "./components/Pagination";

function Articles() {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState("");
  const [cookies, setCookie] = useCookies();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await Axios.get("/api/posts/");
      const date = res.data;
      date.map((item) => {
        const date = new Date(item.createdAt);
        item.createdAt = date.toLocaleString("lt-LT");
      });
      setPosts(date);
      setLoading(false);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // Get current posts

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    Axios.delete("/api/posts/delete/" + id).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <div>{alert && <div className="alert">{alert}</div>}</div>
      <div className="articles">
        {currentPosts.map((article, index) => {
          return (
            index < 6 && (
              <div className="box" key={article.id}>
                <div className="box-title">
                  <Link to={"/post/" + article.id}>
                    <h3>{article.title}</h3>
                  </Link>
                </div>
                <div className="box-image">
                  <Link to={"/post/" + article.id}>
                    <img src={article.image} alt={article.title} />
                  </Link>
                  <div className="box-category">{article.category}</div>
                </div>
                <div className="box-timestamp-row">
                  <div className="box-timestamp">{article.createdAt}</div>
                  <div className="box-comments">
                    <VscComment /> {article.comment_count}
                  </div>
                </div>
                <p className="text">{article.content}</p>
                <Link to={"/post/" + article.id}>Continute reading</Link>
                <button onClick={() => handleDelete(article.id)}>delete</button>
                <Link to={"/edit/" + article.id}>Edit</Link>
              </div>
            )
          );
        })}
      </div>
      <div className="pagination-wrapper">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default Articles;
