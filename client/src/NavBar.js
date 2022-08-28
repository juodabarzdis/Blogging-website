import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import Logout from "./Logout";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Axios.get("/api/posts/").then((res) => {
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") setLoggedIn(true);
  }, []);

  const handleSubmit = posts.map((post) => {
    if (post.title === search) {
      window.location.href = `/post/${post.id}`;
    }
  });

  const filteredPosts = posts.filter((post) => {
    return (
      search &&
      post.title.toLowerCase().includes(search.toLowerCase()) &&
      post.title !== search
    );
  });

  return (
    <div className="wrapper">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="nav-left link-logo">
            <div className="nav-logo"></div>
            <div>
              <h1>My friggin blog</h1>
            </div>
          </Link>
        </div>
        <div>
          <div className="nav-right">
            <div className="nav-search">
              <div>
                <form>
                  <input
                    value={search}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </div>
              <div>
                <div className="search-options">
                  {filteredPosts.map((post) => {
                    return (
                      <div
                        onClick={() => setSearch(post.title)}
                        className="nav-search-results"
                        key={post.id}
                      >
                        {post.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <ul>
              <li>
                <Link to="/" className="link">
                  Home
                </Link>
              </li>

              {loggedIn ? (
                <>
                  <li>
                    <Link to="/newPost" className="link">
                      New Post
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" className="link logout">
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register" className="link">
                      Sign up
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="link login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
