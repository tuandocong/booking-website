import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  //biến theo dõi hoạt đông bật/tắt của slide images:
  const [open, setOpen] = useState(false);
  //biến thao dõi hiển thị/ẩn phần reserve modal:
  const [openModal, setOpenModal] = useState(false);

  //lấy id từ params
  const params = useParams();
  const hotelId = params.id;

  //lấy data của hotel theo id
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/hotels/hotel/${hotelId}`
  );

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //lấy số ngày và số lượng room để tính giá tiền
  const { dates, options } = useContext(SearchContext);

  //tính số ngày khách muốn đặt
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY) + 1;
    return diffDays;
  }

  let days;
  if (dates.length === 0) {
    days = 1;
  } else {
    days = dayDifference(dates[0].endDate, dates[0].startDate);
  }

  const price = days * data.cheapestPrice * options.room;
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  //hàm khi nhấn các button dịch chuyển trong slide:
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      //dịch trái
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      //dịch phải
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  //khi click vào "Reserve" button:
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={data.photos[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${price}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        {openModal && <Reserve data={data} price={price} dates={dates} />}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
