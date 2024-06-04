import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const transactionHandler = () => {
    navigate("/transaction");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="btnHome">
          <div>Booking Website</div>
        </Link>
        {!user && (
          <div className="navItems">
            <Link to={"/register"}>
              <button className="navButton">Register</button>
            </Link>
            <Link to={"/login"}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
        {user && (
          <div className="navItems">
            <div className="userName">{user.email}</div>
            <button className="navButton" onClick={transactionHandler}>
              Transaction
            </button>
            <button className="navButton" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
