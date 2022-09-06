import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MainContext from "./MainContext";

const Logout = () => {
  const { setLoggedIn } = useContext(MainContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState();

  useEffect(() => {
    Axios.get("/api/users/logout", {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        // localStorage.clear();
        setLoggedIn(false);
        setAlert(res.data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  }, []);

  return (
    <>
      {alert && (
        <div className="user-logged-out">
          <div className="alert">{alert}</div>
        </div>
      )}
    </>
  );
};

export default Logout;
