const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

//them hotel moi
exports.getAddHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay tat ca hotels
exports.getHotels = async (req, res, next) => {
  // const cityS = req.query.city;
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(err);
  }
};

//lay hotel theo id
exports.getHotelById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id).populate("rooms");
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(err);
  }
};

//update hotel
exports.postEditHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const editHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json(editHotel);
  } catch (error) {
    res.status(500).json(err);
  }
};

//Delete hotel
exports.deleteHotelById = async (req, res, next) => {
  const id = req.params.id;
  try {
    //kiem tra xem co trong Transaction khong?
    const trans = await Transaction.find({ hotel: id });
    console.log(">>>> check :", trans);
    if (trans.length > 0) {
      throw new Error("That hotel was included in a transaction");
    } else {
      await Hotel.findByIdAndRemove(id);
      res.status(200).json("Hotel has been delete");
    }

    // await Hotel.findByIdAndRemove(id);
    // res.status(200).json("Hotel has been delete");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//lay hotel theo city
exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(","); //tao 1 mang gom cac phan tu duoc ngan cach boi giau phay
  try {
    const list = await Promise.all(
      //xu ly dong thoi nhieu tac vu bdb
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(err);
  }
};

//dem hotel theo type
exports.countByType = async (req, res, next) => {
  const types = req.query.types.split(","); //tao 1 mang gom cac phan tu duoc ngan cach boi giau phay
  try {
    const list = await Promise.all(
      //xu ly dong thoi
      types.map((type) => {
        return Hotel.countDocuments({ type: type });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Tìm kiếm các hotel theo các tiêu chí(people, room, avaiable room) từ input Search
exports.searchHotels = async (req, res, next) => {
  const destination = req.body.destination;
  const dates = req.body.dates; //[{startDate...,endDate...}]
  // console.log("controller/hotel.js >> dates:", dates);
  const options = req.body.options; //{adult:...,children:...,room:...}
  const min = req.body.min;
  const max = req.body.max;

  //tính số người yêu cầu cho mỗi phòng
  const peoplePerRoom = options.adult + options.children;

  //hàm lấy các ngày giữa 2 ngày (startDate -> endDate):
  function getDatesArray(date1, date2) {
    const datesArray = [];
    let currentDate = new Date(date1);
    while (currentDate <= date2) {
      datesArray.push(new Date(currentDate).toString());
      // datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return datesArray;
  }

  //tạo mảng các ngày muốn thuê khách sạn
  const date1 = new Date(dates[0].startDate);
  const date2 = new Date(dates[0].endDate);
  const formatDatesArray = getDatesArray(date1, date2);

  //Trường hợp ngày hiện tại có trong các ngày muốn đặt thì phải thay đổi lại giá trị giờ thành (00:00:00)
  const datesArray = formatDatesArray.map((date) => {
    // console.log(date);
    const formatDate = new Date(date);
    const newDate = formatDate.setHours(0, 0, 0, 0);
    return new Date(newDate).toString();
  });
  // console.log(date1, date2);
  // console.log("controller/hotel.js >> cac ngay muon thue:", datesArray);

  try {
    //lọc các room có maxPeople thỏa mãn (>=) số người muốn ở
    const rooms = await Room.find({ maxPeople: { $gte: peoplePerRoom } });

    //lọc các room có roomNumbers(đã được đặt) không nằm trong khoảng thời gian muốn thuê
    const listRoom = rooms.map((room) => {
      //lọc trường roomNumbers của từng room:
      const listRoomAvailable = room.roomNumbers.filter((item) => {
        //kiểm tra mảng unavaiableDate (những ngày đã đặt) có chứa phần tử trong datesArray(những ngày muốn đặt) không?
        const check = item.unavaiableDate.some((date) => {
          // console.log(" ngay da co nguoi dat >>", date.toString());
          return datesArray.includes(date.toString());
        });
        // check = true (có giá trị trùng giữ 2 mảng) => lọc bỏ item này ra khỏi roomNumbers[] nên return gtri false (!check). Và ngược lại...
        return !check;
      });

      return {
        //return của .map()
        id: room._id,
        roomNumbers: listRoomAvailable, //[...]
      };
    });

    //Mảng ID của các Room mà còn phòng trống (roomNumbers khác rỗng)
    const avaiRoomsId = listRoom
      .filter((room) => room.roomNumbers.length > 0)
      .map((room) => room.id.toString());

    //Tìm cac hotels theo city, price và có avaiable Rooms
    const hotels = await Hotel.find(
      destination
        ? {
            city: destination,
            cheapestPrice: { $gte: min | 1, $lte: max || 999 },
            rooms: { $elemMatch: { $in: avaiRoomsId } }, //Sử dụng $elemMatch để kiểm tra từng p/tử trong mảng rooms, chỉ cần có ít nhất một phần tử trùng khớp -> sẽ được trả về
          }
        : {
            cheapestPrice: { $gte: min | 1, $lte: max || 999 },
            rooms: { $elemMatch: { $in: avaiRoomsId } },
          }
    );
    // .populate("rooms");

    //Lọc ra hotel có số phòng thỏa mãn option.room:
    const result = hotels.filter((hotel) => {
      // Xem xét số lượng phòng còn trống của từng khách sạn:
      const roomAvaiInHotel = hotel.rooms.filter((room) => {
        return avaiRoomsId.includes(room.toString());
      });

      //So sánh với giá trị rôm trong options:
      if (roomAvaiInHotel.length >= options.room) {
        //còn đủ phòng:
        return true;
      } else {
        //không đủ phòng:
        return false;
      }
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
