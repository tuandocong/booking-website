const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const usersRoute = require("./routes/users");
const transactionRoute = require("./routes/transaction");
require("dotenv").config();

//
//
const app = express();

//---------------middlewares-------------
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);
app.use("/transaction", transactionRoute);

//ERROR 404 PAGE
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "No Found Page!",
  });
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected !!!");
    return result;
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("SERVER start....");
    });
  })
  .catch((err) => {
    console.log(err);
  });
