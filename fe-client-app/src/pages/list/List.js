import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useState, useContext, useEffect, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const { destination, dates, options, dispatch } = useContext(SearchContext);
  const [destinationInput, setDestinationInput] = useState(destination);
  const [datesInput, setDatesInput] = useState(dates);
  const [openDate, setOpenDate] = useState(false);
  const [optionsInput, setOptionsInput] = useState(options);
  const [price, setPrice] = useState({ min: 1, max: 999 });
  const inputMinRef = useRef();
  const inputMaxRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("API run...");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      destination: destination,
      dates: dates,
      options: options,
      min: price.min,
      max: price.max,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/hotels/search`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, [price, destination, dates, options]);

  const handleClick = () => {
    // console.log("destination:", destinationInput);
    // console.log("dates:", datesInput);
    // console.log("options:", optionsInput);
    setPrice({
      min: +inputMinRef.current.value || 1,
      max: +inputMaxRef.current.value || 999,
    });
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        destination: destinationInput,
        dates: datesInput,
        options: optionsInput,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destinationInput}
                type="text"
                onChange={(e) => setDestinationInput(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
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
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    ref={inputMinRef}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    ref={inputMaxRef}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={optionsInput.adult}
                    onChange={(e) =>
                      setOptionsInput((prev) => {
                        return { ...prev, adult: +e.target.value };
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={optionsInput.children}
                    onChange={(e) =>
                      setOptionsInput((prev) => {
                        return { ...prev, children: +e.target.value };
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={optionsInput.room}
                    onChange={(e) =>
                      setOptionsInput((prev) => {
                        return { ...prev, room: +e.target.value };
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {data.map((item) => (
              <SearchItem item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "50px",
          paddingLeft: "15%",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default List;
