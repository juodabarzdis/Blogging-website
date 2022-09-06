import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import "./index.css";
import SingleArticle from "./SingleArticle";
import Register from "./Register";
import Login from "./Login";
import NewPost from "./NewPost";
import NavBar from "./NavBar";
import EditPost from "./EditPost";
import Footer from "./Footer";
import Logout from "./Logout";
import Home from "./Home";
import NotFound from "./NotFound";
import MainContext from "./MainContext";
import Admin from "./Admin";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  const contextValues = {
    loggedIn,
    setLoggedIn,
    userInfo,
    setUserInfo,
  };

  useEffect(() => {
    Axios.get("/api/users/check-auth").then((res) => {
      console.log(res);
      setLoggedIn(true);
      setUserInfo(res.data);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <MainContext.Provider value={contextValues}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<SingleArticle />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
            {loggedIn && userInfo.role === 1 && (
              <>
                <Route path="/admin">
                  <Route index element={<Admin />} />
                  <Route path="newpost" element={<NewPost />} />
                  <Route path="edit/:id" element={<EditPost />} />
                </Route>
              </>
            )}
          </Routes>
          <Footer />
        </MainContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
