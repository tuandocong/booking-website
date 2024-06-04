const Room = require("../models/room");
const Hotel = require("../models/hotel");
const Transaction = require("../models/transaction");
const { ObjectId } = require("mongodb");

//them room moi
exports.getAddRoom = async (req, res, next) => {
  const hotelId = req.body.hotelId;
  const newRoom = new Room(req.body);
  try {
    //save new room
    const savedRoom = await newRoom.save();
    try {
      // update lai truong rooms trong Hotel
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(500).json(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay tat ca rooms
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay room theo id
exports.getRoomById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update room
exports.postEditRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const editRoom = await Room.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json(editRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete room
exports.deleteRoomById = async (req, res, next) => {
  const id = ObjectId(req.body.id);
  // const id = req.params.id;
  const hotelId = req.body.hotelId;
  try {
    // kiem tra trong Transtion co chua room muon xoa khong
    //lay khach san co trong trans
    const trans = await Transaction.find({ hotel: hotelId });
    //lay cac phong da duoc order trong trans vao 1 array:
    const roomOrder = trans.reduce((acc, curr) => acc.concat(curr.room), []);

    //kiem tra xem roomNumber cua room muon xoa co trong mang tren khong?
    const removeRoom = await Room.findById(id);
    const check = removeRoom.roomNumbers.filter((item) =>
      roomOrder.includes(item.number)
    );
    // console.log(">>>> check :", check);

    if (check.length > 0) {
      //room nam trong Transactions:
      throw new Error("That room was included in a transaction");
    } else {
      //truong hop trans khong chua room can xoa:
      await Room.findByIdAndRemove(id);
      try {
        // xoa id room trong Hotel
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } });
      } catch (error) {
        res.status(500).json(err);
      }
      res.status(200).json("Room has been delete");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
