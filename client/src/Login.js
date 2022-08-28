import React from "react";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState("");

  const navigate = useNavigate();
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    await Axios.post("api/users/login", user)
      .then((res) => {
        console.log("response: ", res);
        setAlert(res.data.message);
        console.log("alert: ", alert);
        setTimeout(() => {
          navigate("/");
        }, 1000);

        console.log(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/login", {
  //     method: "GET",
  //     credentials: "include",
  //     withCredentials: true,
  //   })
  //     .then((res) => {
  //       let username = req.cookies["sesssion"];
  //       console.log("response: ", res);
  //     })
  //     .catch((err) => {
  //       console.log("error:", err);
  //     });
  // }, []);

  return (
    <>
      {" "}
      {alert && <div className="alert">{alert}</div>}
      <div className="register">
        <div className="register-wrapper">
          <div className="left-side-wrapper">
            <form action="" className="form">
              <div>
                <h1>Login</h1>
                <h2>Login to your account</h2>
              </div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="submit"
                className="form-button"
                onClick={handleSubmit}
              >
                Login
              </button>
              <button type="submit" className="form-button google">
                <FaGoogle /> Sign in with Google
              </button>
            </form>
          </div>
          <div className="right-side-wrapper">
            <div className="right-side-teaser">
              <h2>Today's most popular articles</h2>
              <h3>Pipsum mundum</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                quo consequatur itaque magni porro soluta earum nostrum,
                possimus numquam impedit?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
