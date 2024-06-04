import "./editHotel.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditHotel = () => {
  const navigate = useNavigate();
  const idHotel = useParams().idHotel;
  const { user } = useContext(AuthContext);
  //------------------

  //khai bao bien
  const [imgs, setImgs] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    address: "",
    city: "",
    desc: "",
    distance: "",
    title: "",
    type: "",
    price: 0,
    featured: false,
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //lay du lieu cho Hotel
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/hotels/hotel/${idHotel}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setInfo({
          name: data.name,
          address: data.address,
          city: data.city,
          desc: data.desc,
          distance: data.distance,
          title: data.title,
          type: data.type,
          price: data.cheapestPrice,
          featured: Boolean(data.featured),
        });

        setRooms(data.rooms);

        setImgs(data.photos);
      })
      .catch((error) => console.error(error));
  }, [idHotel]);

  //Ham click UPDATE btn
  const handleClick = async (e) => {
    e.preventDefault();

    const validate =
      info.name.trim() === "" ||
      info.city.trim() === "" ||
      info.distance.trim() === "" ||
      info.desc.trim() === "" ||
      info.type.trim() === "" ||
      info.address.trim() === "" ||
      info.title.trim() === "" ||
      info.price.toString().trim() === "";

    if (validate) {
      alert("Please fill in all fields");
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", user.token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: info.name,
        address: info.address,
        city: info.city,
        desc: info.desc,
        distance: info.distance,
        title: info.title,
        type: info.type,
        cheapestPrice: info.price,
        featured: Boolean(info.featured),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/hotels/update-hotel/${idHotel}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          alert("upadated!");
          navigate("/hotels");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="new-eh">
      <Sidebar />
      <div className="newContainer-eh">
        <div className="top-eh">
          <h1>Update Hotel</h1>
        </div>
        <div className="bottom-eh">
          <form>
            <div className="bottom-contain-eh">
              <div className="left-eh">
                <div className="formInput-eh">
                  <label htmlFor="name">Name</label>
                  <div>
                    <input
                      type="text"
                      id="name"
                      value={info.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-eh">
                  <label htmlFor="city">City</label>
                  <div>
                    <input
                      type="text"
                      id="city"
                      value={info.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-eh">
                  <label htmlFor="distance">Distance from City Center</label>
                  <div>
                    <input
                      type="number"
                      id="distance"
                      value={info.distance}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-eh">
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

                <div className="formInput-eh">
                  <label htmlFor="imgs">Images</label>
                  <div style={{ maxWidth: "45vw", overflow: "scroll" }}>
                    <select id="imgs" multiple aria-readonly>
                      {imgs?.map((img, i) => (
                        <option key={i}>{img}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="right-eh">
                <div className="formInput-eh">
                  <label htmlFor="type">Type</label>
                  <div>
                    <input
                      type="text"
                      id="type"
                      value={info.type}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-eh">
                  <label htmlFor="address">Address</label>
                  <div>
                    <input
                      type="text"
                      id="address"
                      value={info.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-eh">
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

                <div className="formInput-eh">
                  <label htmlFor="price">Price</label>
                  <div>
                    <input
                      type="number"
                      id="price"
                      value={info.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="formInput-eh">
                  <label htmlFor="featured">Featured</label>
                  <div>
                    <select
                      id="featured"
                      value={info.featured}
                      onChange={handleChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="selectRooms-eh">
              <label>Rooms</label>
              <div>
                <select id="rooms" multiple aria-readonly>
                  {rooms?.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleClick}>UPDATE HOTEL</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
