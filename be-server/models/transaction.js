const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  room: {
    type: [Number],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Booked",
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
