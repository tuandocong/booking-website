import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="top-sb">
        <div>
          <span className="logo-sb">Admin Page</span>
        </div>
      </div>
      <hr />
      <div className="center-sb">
        <ul>
          <p className="title-sb">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon-sb" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title-sb">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon-sb" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon-sb" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon-sb" />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon-sb" />
              <span>Transactions</span>
            </li>
          </Link>
          <p className="title-sb">NEW</p>
          <Link to="/hotels/new" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon-sb" />
              <span>New Hotel</span>
            </li>
          </Link>
          <Link to="/rooms/new" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon-sb" />
              <span>New Room</span>
            </li>
          </Link>

          <p className="title-sb">USER</p>
          <li>
            <ExitToAppIcon className="icon-sb" />
            <span onClick={logoutHandler}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
