import "./featuredProperties.css";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data } = useFetch(`${process.env.REACT_APP_SERVER_DOMAIN}/hotels`);

  const listTopRate = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
  // console.log(listTopRate);

  return (
    <div className="fp">
      {listTopRate.map((item) => (
        <div key={item._id} className="fpItem">
          <img src={item.photos[0]} alt="" className="fpImg" />
          <span className="fpName">
            <Link to={`./hotels/${item._id}`}>{item.name}</Link>
          </span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          <div className="fpRating">
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>
              Rating:
            </span>
            <button style={{ padding: "2px 5px" }}>{item.rating}/5</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
