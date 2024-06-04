import "./UserTable.css";
import useFetch from "../../hooks/useFetch";

const UserTable = () => {
  const { data } = useFetch(`${process.env.REACT_APP_SERVER_DOMAIN}/users`);

  return (
    <div className="ut-contain">
      {data.map((i) => (
        <div key={i._id} className="ut-item">
          <div className="ut-item-left">
            <div className="ut-title">ID:</div>
            <div className="ut-title">Username: </div>
            <div className="ut-title">Email: </div>
          </div>
          <div className="ut-item-right">
            <div className="ut-data"> {i._id}</div>
            <div className="ut-data"> {i.username}</div>
            <div className="ut-data"> {i.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
