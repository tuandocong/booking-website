import "./newHotel.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NewHotel = () => {
  const { user } = useContext(AuthContext);
  //------------------
  const [imgs, setImgs] = useState([]);
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

  const imgHandler = (e) => {
    const imgArr = e.target.value.trim().split(",").map(String);
    setImgs(imgArr);
  };

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
        cheapestPrice: +info.price,
        featured: Boolean(info.featured),
        rooms: [],
        photos: imgs,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/hotels/add-hotel`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setInfo({
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
          setImgs([]);
          alert("Add Hotel success!");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="new-h">
      <Sidebar />
      <div className="newContainer-h">
        <div className="top-h">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom-h">
          <form>
            <div className="bottom-contain-h">
              <div className="left-h">
                <div className="formInput-h">
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

                <div className="formInput-h">
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

                <div className="formInput-h">
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

                <div className="formInput-h">
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

                <div className="formInput-h">
                  <label htmlFor="img">Images </label>
                  <div>
                    <input
                      type="text"
                      id="img"
                      value={imgs}
                      placeholder="give comma between image url"
                      onChange={imgHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="right-h">
                <div className="formInput-h">
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

                <div className="formInput-h">
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

                <div className="formInput-h">
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

                <div className="formInput-h">
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

                <div className="formInput-h">
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

            <button onClick={handleClick}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
