const express = require("express");
const router = express.Router();
const roomControllers = require("../controllers/rooms");
const tokenCheck = require("../middlewares/token");

//CREATE
router.post("/add-room", tokenCheck, roomControllers.getAddRoom);

//GET BY ID
router.get("/room/:id", roomControllers.getRoomById);

//GET ALL
router.get("/", roomControllers.getRooms);

//UPDATE
router.post("/update-room/:id", tokenCheck, roomControllers.postEditRoom);

//DELETE
router.post("/delete-room", tokenCheck, roomControllers.deleteRoomById);

module.exports = router;
