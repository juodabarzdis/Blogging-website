import React, { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import MainContext from "./MainContext";

const NavBar = () => {
  const { loggedIn, userInfo } = useContext(MainContext);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  // const loggedIn = props.loggedIn; -- variantas
  // const { loggedIn } = props; -- variantas

  useEffect(() => {
    Axios.get("/api/posts/").then((res) => {
      setPosts(res.data);
    });
  }, []);

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
            <div className="nav-search"></div>
            <ul>
              <li>
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              {loggedIn && userInfo.role === 1 && (
                <>
                  <li>
                    <Link to="/admin/newpost" className="link">
                      New Post
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/" className="link">
                      Admin
                    </Link>
                  </li>
                </>
              )}
              {loggedIn ? (
                <>
                  <li>
                    <Link to="/logout" className="link logout">
                      Logout
                    </Link>
                  </li>
                  <div className="user-greeting">
                    {loggedIn && <div>Sveiki, {userInfo.username}.</div>}
                  </div>
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
