const express = require("express");
const transactionControllers = require("../controllers/transaction");

const router = express.Router();

//Create Transaction
router.post("/", transactionControllers.addTransaction);

//Get All Transaction
router.get("/", transactionControllers.getAllTrans);

//get latest Transaction
router.get("/latest", transactionControllers.getLatestTrans);

//get Transactions by name
router.get("/user", transactionControllers.userTrans);

//count Transaction
router.get("/count", transactionControllers.countTransaction);

//get earnings
router.get("/earnings", transactionControllers.getEarnings);

//get balance
router.get("/balance", transactionControllers.getBalance);

module.exports = router;
