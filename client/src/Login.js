import { useState, useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Axios from "axios";
import MainContext from "./MainContext";

const Login = () => {
  const { setLoggedIn, setUserInfo } = useContext(MainContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    await Axios.post("api/users/login", user)
      .then((res) => {
        // localStorage.setItem("loggedIn", "true");
        setUserInfo(res.data);
        console.log(res);
        setLoggedIn(true);
        setAlert(res.data.message);
        setTimeout(() => {
          if (res.data.role === 1) {
            return navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1000);
      })
      .catch((err) => {
        console.log("error:", err);
        setAlert(err.response.data);
      });
  };

  return (
    <>
      <div className="register">
        <div className="register-wrapper">
          <div className="left-side-wrapper">
            <form action="" className="form" onSubmit={handleSubmit}>
              {alert && <div className="alert">{alert}</div>}
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
              <button type="submit" className="form-button">
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
