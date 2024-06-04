import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
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

  const handleClick = (e) => {
    e.preventDefault();
    console.log(credentials.username, credentials.password);
    dispatch({ type: "LOGIN_START" });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.isAdmin) {
          console.log("result:", result);
          dispatch({ type: "LOGIN_SUCCESS", payload: result });
          navigate("/");
        } else if (!result.isAdmin && result.success) {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "You are not allowed!" },
          });
        } else {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: result,
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
      });
  };

  return (
    <div>
      <div className="login-header">
        <div> Booking Website</div>
        <div>for Administrator</div>
      </div>
      <div className="login-contain">
        <div className="login-form">
          <h1>LOGIN</h1>
          <div className="login-text">
            Log in with an administrator account.
          </div>
          <div className="login">
            <div className="lContainer">
              <input
                type="text"
                placeholder="Username (admin001)"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
              <input
                type="password"
                placeholder="Password (123123123)"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
              {/* <button onClick={handleClick} className="lButton"> */}
              {error && <span className="msg-err">{error.message}</span>}
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
