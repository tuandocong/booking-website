import "./list.css";
import Sidebar from "../../components/sidebar/Sidebar";
import TransTable from "../../components/transTable/transTable";
import HotelTable from "../../components/hotelTable/HotelTable";
import RoomTable from "../../components/roomTable/RoomTable";
import UserTable from "../../components/userTable/UserTable";

const List = (props) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        {props.type === "user" && (
          <div>
            <div className="listTitle">Users List</div>
            <UserTable />
          </div>
        )}

        {props.type === "hotel" && (
          <div>
            <div className="listTitle">Hotels List</div>
            <HotelTable />
          </div>
        )}

        {props.type === "room" && (
          <div>
            <div className="listTitle">Rooms List</div>
            <RoomTable />
          </div>
        )}

        {props.type === "trans" && (
          <div>
            <div className="listTitle">Transactions List</div>
            <TransTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
