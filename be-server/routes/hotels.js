const express = require("express");
const router = express.Router();
const hotelControllers = require("../controllers/hotels");
const tokenCheck = require("../middlewares/token");

//CREATE
router.post("/add-hotel", tokenCheck, hotelControllers.getAddHotel);

//GET BY ID
router.get("/hotel/:id", hotelControllers.getHotelById);

//GET ALL
router.get("/", hotelControllers.getHotels);

//UPDATE
router.post("/update-hotel/:id", tokenCheck, hotelControllers.postEditHotel);

//DELETE
router.post("/delete-hotel/:id", tokenCheck, hotelControllers.deleteHotelById);

//Get count by City
router.get("/countByCity", hotelControllers.countByCity);

//get count by Type
router.get("/countByType", hotelControllers.countByType);

//search Hotels
router.post("/search", hotelControllers.searchHotels);

module.exports = router;
