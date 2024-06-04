import "./widget.css";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type, value }) => {
  let data;

  //temporary
  const amount = value;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,

        icon: (
          <PersonOutlinedIcon
            className="icon-w"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,

        icon: (
          <ShoppingCartOutlinedIcon
            className="icon-w"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,

        icon: (
          <MonetizationOnOutlinedIcon
            className="icon-w"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,

        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon-w"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left-w">
        <span className="title-w">{data.title}</span>
        <span className="counter-w">
          {data.isMoney && "$"} {amount}
        </span>
      </div>
      <div className="right-w">{data.icon}</div>
    </div>
  );
};

export default Widget;
