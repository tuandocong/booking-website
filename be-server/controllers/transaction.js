const Transaction = require("../models/transaction");
const Room = require("../models/room");
const transaction = require("../models/transaction");
const { ObjectId } = require("mongoose").Types;

//Thêm Transaction mới:
exports.addTransaction = async (req, res, next) => {
  //tách lấy roomNumberID để update Room.roomNumbers.unavaiableDate
  const { roomNumberID, startDate, endDate, ...others } = req.body;

  //Trường hợp ngày hiện tại có trong các ngày muốn đặt thì phải thay đổi lại giá trị giờ thành (00:00:00)
  const formatStartDate = new Date(startDate).setHours(0, 0, 0, 0);
  const formatEndDate = new Date(endDate).setHours(0, 0, 0, 0);

  //Tạo new Transaction
  const newTrans = new Transaction({
    ...others,
    startDate: new Date(formatStartDate),
    endDate: new Date(formatEndDate),
  });

  //mảng các ngày muốn thuê
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

  // function getDatesArray(date1, date2) {
  //   const datesArray = [];
  //   let currentDate = new Date(date1);
  //   while (currentDate <= date2) {
  //     datesArray.push(new Date(currentDate).toString());
  //     // datesArray.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   return datesArray;
  // }
  const alldates = getDatesInRange(req.body.startDate, req.body.endDate);
  //Trường hợp ngày hiện tại có trong các ngày muốn đặt thì phải thay đổi lại giá trị giờ thành (00:00:00)
  const formatDatesArray = alldates.map((date) => {
    // console.log(date);
    const formatDate = new Date(date);
    const newDate = formatDate.setHours(0, 0, 0, 0);
    return new Date(newDate).toString();
  });

  try {
    //add Trans
    const saveTrans = await newTrans.save();
    //thay doi unvaiableDate cua room da dat
    roomNumberID.map(async (roomId) => {
      await Room.updateOne(
        { "roomNumbers._id": ObjectId(roomId) },
        {
          $push: {
            "roomNumbers.$.unavaiableDate": formatDatesArray,
          },
        }
      );
    });

    res.status(200).json("Create Transaction success!");
  } catch (err) {
    res.status(500).json(err);
  }
};
//lay tat ca Transactions
exports.getAllTrans = async (req, res, next) => {
  try {
    const trans = await Transaction.find().populate("hotel");
    res.status(200).json(trans);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay theo username
exports.userTrans = async (req, res, next) => {
  const username = req.query.name;
  try {
    const trans = await Transaction.find({ user: username }).populate("hotel");
    res.status(200).json(trans);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Lay cac transaction gan nhat
exports.getLatestTrans = async (req, res, next) => {
  try {
    const trans = await Transaction.find().populate("hotel");
    latestTrans = trans.slice(-8).reverse();
    res.status(200).json(latestTrans);
  } catch (err) {
    res.status(500).json(err);
  }
};

//dem transaction
exports.countTransaction = async (req, res, next) => {
  try {
    const trans = await Transaction.countDocuments();
    res.status(200).json(trans);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay Earnings
exports.getEarnings = async (req, res, next) => {
  try {
    const trans = await Transaction.find();
    const earnings = trans.reduce((total, item) => {
      return (total = total + item.price);
    }, 0);
    res.status(200).json(earnings);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay Balance
exports.getBalance = async (req, res, next) => {
  //Hàm lấy cac ngày ở giữa 2 Date:
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  try {
    const trans = await Transaction.find();

    //tính tổng doanh thu của tất cả các tháng
    const totalPrice = trans.reduce((total, item) => {
      return (total = total + item.price);
    }, 0);

    // lấy ra các tháng của mỗi transaction
    const newArr = trans.map((item) => {
      const alldates = getDatesInRange(item.startDate, item.endDate);
      const monthYears = alldates.map((date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(
          date
        ).getFullYear()}`;
      });
      return monthYears;
    });

    //gộp các transaction lại
    const months = newArr.reduce((acc, curr) => acc.concat(curr), []);
    //loại bỏ các tháng bị lặp, mỗi tháng là duy nhất
    const monthSet = new Set(months);
    const monthUnique = Array.from(monthSet);

    //tính doanh thu trung bình
    let balance = 0;
    if (monthUnique.length > 0) {
      balance = (totalPrice / monthUnique.length).toFixed();
    }

    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json(err);
  }
};
