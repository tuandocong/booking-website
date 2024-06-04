const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String], //['http://abc', 'http://img', ...]
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  rooms: {
    // type: [String],
    // required: true,

    type: [Schema.Types.ObjectId],
    ref: "Room",
    // required: true,
  }, //--------------------------eg : ['idRoom1','idRoom2',...]
});

module.exports = mongoose.model("Hotel", hotelSchema);
