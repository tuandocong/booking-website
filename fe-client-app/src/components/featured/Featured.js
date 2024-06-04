import "./featured.css";
import img1 from "../../public/city_Img/Ha Noi.jpg";
import img2 from "../../public/city_Img/HCM.jpg";
import img3 from "../../public/city_Img/Da Nang.jpg";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  // console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/hotels/countByCity?cities=Ha Noi,Ho Chi Minh,Da Nang`
  );

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={img1} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src={img2} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src={img3} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
