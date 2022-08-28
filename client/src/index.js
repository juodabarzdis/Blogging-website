import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import Articles from "./Articles";
import SingleArticle from "./SingleArticle";
import Register from "./Register";
import Login from "./Login";
import NewPost from "./NewPost";
import NavBar from "./NavBar";
import EditPost from "./EditPost";
import Footer from "./Footer";
import Logout from "./Logout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="App">
    <CookiesProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/post/:id" element={<SingleArticle />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CookiesProvider>
  </div>
);
