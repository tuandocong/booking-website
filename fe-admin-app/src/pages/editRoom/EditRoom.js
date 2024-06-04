import "./editRoom.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditRoom = () => {
  const navigate = useNavigate();
  //lay use tu context de su dung token
  const { user } = useContext(AuthContext);

  //khai bao bien
  const idRoom = useParams().idRoom;
  const [hotel, setHotel] = useState("");
  const [info, setInfo] = useState({
    title: "",
    desc: "",
    price: 0,
    maxPeople: 1,
  });
  const [rooms, setRooms] = useState([]);

  //lay du lieu cho Room
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/rooms/room/${idRoom}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setHotel(result.hotelId);
        const numberArr = result.roomNumbers.map((room) => {
          return room.number;
        });
        setInfo({
          title: result.title,
          desc: result.desc,
          price: result.price,
          maxPeople: result.maxPeople,
        });
        setRooms(numberArr.join(","));
      })
      .catch((error) => console.error(error));
  }, [idRoom]);

  //ham khi thay doi form Input
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //Ham khi Click UPDATE Btn
  const handleClick = async (e) => {
    e.preventDefault();

    //kiem tra xem cac truong co bi bo trong khong?
    const validate =
      info.title.trim() === "" ||
      info.desc.trim() === "" ||
      info.price.toString().trim() === "" ||
      info.maxPeople.toString().trim() === "";
    //dua ra canh bao khi chua full fields
    if (validate) {
      alert("Please fill in all fields");
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", user.token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title: info.title,
        price: +info.price,
        desc: info.desc,
        maxPeople: info.maxPeople,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/rooms/update-room/${idRoom}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          alert("upadated!");
          navigate("/rooms");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="new-er">
      <Sidebar />
      <div className="newContainer-er">
        <div className="top-er">
          <h1>Update Room</h1>
        </div>
        <div className="bottom-er">
          <form>
            <div className="bottom-contain-er">
              <div className="left-er">
                <div className="formInput-er">
                  <label htmlFor="title">Title</label>
                  <div>
                    <input
                      type="text"
                      id="title"
                      value={info.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-er">
                  <label htmlFor="price">Price</label>
                  <div>
                    <input
                      type="number"
                      value={info.price}
                      id="price"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-er">
                  <label htmlFor="rooms">Rooms</label>
                  <div>
                    <input type="text" id="rooms" value={rooms} readOnly />
                  </div>
                </div>
              </div>

              <div className="right-er">
                <div className="formInput-er">
                  <label htmlFor="desc">Description</label>
                  <div>
                    <input
                      type="text"
                      id="desc"
                      value={info.desc}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-er">
                  <label htmlFor="maxPeople">Max People</label>
                  <div>
                    <input
                      min={1}
                      value={info.maxPeople}
                      type="number"
                      id="maxPeople"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-er">
                  <label htmlFor="hotel">Hotel ID :</label>
                  <div>
                    <input type="text" id="hotel" value={hotel} readOnly />
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleClick}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
