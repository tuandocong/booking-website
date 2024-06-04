import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "./reserve.css";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Reserve = ({ data, price, dates }) => {
  const { dispatch } = useContext(SearchContext);
  // console.log(dates);
  const { user } = useContext(AuthContext);
  const [datesInput, setDatesInput] = useState(dates);
  const [openDate, setOpenDate] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [nameRooms, setNameRooms] = useState([]);
  const [pricePerDay, setPricePerDay] = useState(0);

  //info data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [method, setMethod] = useState("Cash");

  //Ham tao mang chua cac ngay o giua 2 gia tri Date
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).toString());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  //tạo mảng các ngày muốn đặt phòng hotel
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  // console.log(alldates);

  //Hàm kiểm tra giá trị unvaiableDate cua roomNumbers có bị trùng với mảng allDate không
  const isAvailable = (roomNumber) => {
    //isFound = true khi ngày bị trùng => không avaiable
    const isFound = roomNumber.unavaiableDate.some((date) => {
      // console.log("date", date, new Date(date).toString());
      return alldates.includes(new Date(date).toString());
    });

    return !isFound;
  };
  // tinh TotalPrice:
  const totalPrice = alldates.length * Number(pricePerDay);

  const handleSelect = (e, price) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const name = +e.target.id;

    //nếu check = true thì thêm, false thi xóa:
    setPricePerDay((prev) => {
      if (checked) {
        return (prev = +prev + Number(price));
      } else {
        return (prev = +prev - Number(price));
      }
    });
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    setNameRooms(
      checked ? [...nameRooms, name] : nameRooms.filter((item) => item !== name)
    );
  };

  const navigate = useNavigate();

  const handleFilter = () => {
    dispatch({
      type: "UPDATE_DATES",
      payload: [
        {
          startDate: new Date(datesInput[0].startDate),
          endDate: new Date(datesInput[0].endDate),
          key: "selection",
        },
      ],
    });
  };

  //Ham Click RESERVER Btn:
  const handleClick = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user: user.username,
      fullName: fullName,
      email: email,
      phoneNumber: phone,
      cardNumber: card,
      hotel: data._id,
      room: nameRooms,
      startDate: new Date(datesInput[0].startDate),
      endDate: new Date(datesInput[0].endDate),
      price: totalPrice,
      payment: method,
      roomNumberID: selectedRooms,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/transaction", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    navigate("/transaction");
  };

  return (
    <div className="reserve">
      <div className="flex-box">
        <div className="contain-date">
          <div className="lsItem">
            <div className="rHeader">Dates</div>
            <span onClick={() => setOpenDate(!openDate)}>{`${format(
              datesInput[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(datesInput[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && (
              <DateRange
                onChange={(item) => setDatesInput([item.selection])}
                minDate={new Date()}
                ranges={datesInput}
              />
            )}
          </div>
          <button className="rfilter-btn" onClick={handleFilter}>
            Filter Rooms
          </button>
        </div>

        <div className="contain-form">
          <div className="rHeader">Reserve Info</div>
          <div className="formInput">
            <label htmlFor="name">Your Full Name:</label>
            <div>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="formInput">
            <label htmlFor="email">Your Email:</label>
            <div>
              <input
                type="text"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="formInput">
            <label htmlFor="phone">Your Phone Number:</label>
            <div>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="formInput">
            <label htmlFor="card">Your Identity Card Number:</label>
            <div>
              <input
                type="text"
                id="card"
                placeholder="Card Number"
                onChange={(e) => setCard(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rHeader" style={{ paddingLeft: "20px" }}>
        Select your rooms:
      </div>
      <div className="rContainer">
        {data.rooms.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo" key={item._id}>
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">${item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                  className="checkbox-room"
                    type="checkbox"
                    id={roomNumber.number}
                    p={item.price}
                    value={roomNumber._id}
                    onChange={(e) => {
                      handleSelect(e, item.price);
                    }}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="total-bill">
        <div className="total-bill-left">
          <div className="price">Total Bill: ${totalPrice}</div>
          <div className="payment">
            <label htmlFor="payment">Select Payment Method</label>
            <div>
              <select
                id="payment"
                placeholder="Select Payment Method"
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value={"Cash"}>Cash</option>
                <option value={"Card"}> Card</option>
                <option value={"Credit"}>Credit </option>
              </select>
            </div>
          </div>
        </div>
        <div className="total-bill-right">
          <button className="rButton" onClick={handleClick}>
            Reserve Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
