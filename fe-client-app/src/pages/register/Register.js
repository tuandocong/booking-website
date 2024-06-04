import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import "./Register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  });
  const [err, setErr] = useState(false);

  // const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

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
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/sign-up`,
        requestOptions
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Username or Email is already taken");
      }

      // setErr(false);
      alert(data);
      navigate("/login");
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-contain">
        <div className="register-form">
          <h1>REGISTER</h1>
          <p>Create an account</p>
          <div className="register">
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
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="lInput"
              />
              {err && <span className="text-err">{err.message}</span>}

              <button onClick={handleClick} className="lButton">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

//  <div className="errText">{err && <span>{err.message}</span>}</div>
