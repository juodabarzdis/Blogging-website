import React from "react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Axios from "axios";

const Register = () => {
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFrom = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/users/register", form)
      .then((res) => {
        console.log(res);
        setAlert(res.data.message);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data);
      });
  };

  //  VARIANTAS BE AXIOS
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = { username, email, password };
  //   await fetch("http://localhost:3000/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => {
  //       console.log(user);
  //       console.log("response: ", res);
  //     })
  //     .catch((err) => {
  //       console.log("error:", err);
  //     });
  // };

  return (
    <>
      {alert && <div className="alert">{alert}</div>}
      <div className="register">
        <div className="register-wrapper">
          <div className="left-side-wrapper">
            <form onSubmit={handleSubmit} className="form">
              <div>
                <h1>Sign up!</h1>
                <h2>Start blogging today.</h2>
              </div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => {
                  // setUsername(e.target.value);
                  handleFrom(e);
                }}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  // setEmail(e.target.value);
                  handleFrom(e);
                }}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  // setPassword(e.target.value);
                  handleFrom(e);
                }}
              />
              <button
                type="submit"
                className="form-button"
                // onClick={handleSubmit}
              >
                Sign up
              </button>
              <button type="submit" className="form-button google">
                <FaGoogle /> Sign up with Google
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

export default Register;
