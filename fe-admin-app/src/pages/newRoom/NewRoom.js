import "./newRoom.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NewRoom = () => {
  //lay use tu context de su dung token
  const { user } = useContext(AuthContext);
  //khai bao bien
  const [hotel, setHotel] = useState("");
  const [info, setInfo] = useState({
    title: "",
    desc: "",
    price: 0,
    maxPeople: 1,
  });
  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState([]);

  //lay du lieu cho Hotel ID
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/hotels`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setHotel(result[0]._id);
      })
      .catch((error) => console.error(error));
  }, []);

  //ham khi thay doi form Input
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //ham lay so phong roomNumbers
  const handleSelect = (e) => {
    const numberArray = e.target.value.split(",").map(Number);
    setRooms(numberArray);
  };

  //Ham khi Click Send Btn
  const handleClick = async (e) => {
    e.preventDefault();

    //kiem tra xem cac truong co bi bo trong khong?
    const validate =
      info.title.trim() === "" ||
      info.desc.trim() === "" ||
      rooms.length === 0 ||
      info.price.toString().trim() === "" ||
      info.maxPeople.toString().trim() === "";

    //dua ra canh bao khi chua full fields
    if (validate) {
      alert("Please fill in all fields");
    } else {
      const roomNb = rooms.map((room) => {
        return { number: room, unavaiableDate: [] };
      });
      const myHeaders = new Headers();
      myHeaders.append("Authorization", user.token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title: info.title,
        price: info.price,
        maxPeople: info.maxPeople,
        desc: info.desc,
        hotelId: hotel,
        roomNumbers: roomNb,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/rooms/add-room`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setInfo({
            title: "",
            desc: "",
            price: 0,
            maxPeople: 1,
          });
          setRooms("");

          alert("Add room success!");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="new-r">
      <Sidebar />
      <div className="newContainer-r">
        <div className="top-r">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom-r">
          <form>
            <div className="bottom-contain-r">
              <div className="left-r">
                <div className="formInput-r">
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

                <div className="formInput-r">
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

                <div className="formInput-r">
                  <label htmlFor="rooms">Rooms</label>
                  <div>
                    <input
                      type="text"
                      id="rooms"
                      value={rooms}
                      placeholder="give comma between room numbers"
                      onChange={handleSelect}
                    />
                  </div>
                </div>
              </div>

              <div className="right-r">
                <div className="formInput-r">
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

                <div className="formInput-r">
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

                <div className="formInput-r">
                  <label htmlFor="hotel">Choose a hotel</label>
                  <div>
                    <select
                      id="hotel"
                      onChange={(e) => setHotel(e.target.value)}
                      value={hotel}
                      style={{ width: "100%", padding: "5px" }}
                    >
                      {data.map((hotel) => (
                        <option value={hotel._id} key={hotel._id}>
                          {hotel.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleClick}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
