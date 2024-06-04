import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const userData = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/users/count`
  ).data;
  const orderData = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/transaction/count`
  ).data;
  const earning = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/transaction/earnings`
  ).data;
  const balance = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/transaction/balance`
  ).data;
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" value={userData} />
          <Widget type="order" value={orderData} />
          <Widget type="earning" value={earning} />
          <Widget type="balance" value={balance} />
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
