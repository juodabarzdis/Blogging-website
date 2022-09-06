import "./Articles.css";
import { useState, useEffect, useContext, useRef } from "react";
import { VscComment } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

import Axios from "axios";
import Pagination from "./components/Pagination";
import MainContext from "./MainContext";

const Home = () => {
  // const { loggedIn, userInfo } = useContext(MainContext);
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  //search
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const selectRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword === "") {
      return setRefresh(!refresh);
    }
    Axios.get("api/posts/search/" + keyword)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.message);
        window.scrollTo(0, 0);
      });
  };

  const handleCategory = async (e, category) => {
    e.preventDefault();
    if (category === "All") {
      console.log("all");
      setCurrentPage(1);
      return setRefresh(!refresh);
    }

    await Axios.get("api/posts/category/" + category)
      .then((res) => {
        setCurrentPage(1);
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.message);
        window.scrollTo(0, 0);
      });
    // setCategory("");
  };

  //search end

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Axios.get("/api/posts/");
      const date = res.data;
      date.map((item) => {
        const date = new Date(item.createdAt);
        item.createdAt = date.toLocaleString("lt-LT");
      });
      setPosts(date);
      setPosts(res.data);
    };
    fetchPosts();
  }, [refresh]);

  // Get current posts

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleDelete = (id) => {
  //   if (isNaN(id) || !loggedIn) return;

  //   Axios.delete("/api/posts/delete/" + id)
  //     .then((res) => {
  //       setAlert(res.data);
  //       setRefresh(!refresh);
  //       window.scrollTo(0, 0);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setAlert(err.message);
  //       window.scrollTo(0, 0);

  //       if (err.response.status === 500) {
  //         setTimeout(() => {
  //           navigate("/login");
  //         }, 1000);
  //       }
  //     })
  //     .finally(() => {
  //       setTimeout(() => setAlert(""), 1000);
  //     });
  // };

  console.log(category);

  return (
    <>
      <div>{alert && <div className="alert">{alert}</div>}</div>
      <div className="search-nav">
        <form className="category-input">
          <select
            name="category"
            onChange={(e) => handleCategory(e, e.target.value)}
            ref={selectRef}
            onBlur={(e) => {
              if (keyword === "") {
                selectRef.current.value = "All";
                setRefresh(!refresh);
                setCurrentPage(1);
              }
            }}
          >
            <option value="All">All</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
          </select>
        </form>
        <div className="filter">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setKeyword(e.target.value)}
              onBlur={(e) => {
                if (keyword === "") {
                  selectRef.current.value = "All";
                  setRefresh(!refresh);
                  setCurrentPage(1);
                }
              }}
            />
            <button className="search-button">Search</button>
          </form>
        </div>
      </div>
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
                  <div
                    onClick={(e) => {
                      handleCategory(e, article.category);
                    }}
                    className="box-category"
                  >
                    {article.category}
                  </div>
                </div>
                <div className="box-timestamp-row">
                  <div className="box-timestamp">{article.createdAt}</div>
                  <div className="box-comments">
                    <VscComment /> {article.comment_count}
                  </div>
                </div>
                <p className="text">{article.content}</p>
                <div className="under-article-buttons">
                  <div>
                    <Link to={"/post/" + article.id}>Continute reading</Link>
                  </div>
                  {/* {loggedIn && (
                    <div className="edit-delete-buttons">
                      <div>
                        <Link to="" onClick={() => handleDelete(article.id)}>
                          delete
                        </Link>
                      </div>
                      <div>
                        <Link to={"/edit/" + article.id}>Edit</Link>
                      </div>
                    </div>
                  )} */}
                </div>
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
};

export default Home;
