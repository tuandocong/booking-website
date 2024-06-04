import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(credentials);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`,
        requestOptions
      );
      const data = await res.json();

      if (!res.ok) {
        // console.log(" >>>>", data);
        throw new Error(data.message);
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate("/");
    } catch (err) {
      // console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-contain">
        <div className="login-form">
          <h1>LOGIN</h1>
          <div className="login">
            <div className="lContainer">
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
              {error && <span className="text-err">{error.message}</span>}
              <button
                disabled={loading}
                onClick={handleClick}
                className="lButton"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
