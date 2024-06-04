const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/users");

//GET BY ID
router.get("/user/:id", userControllers.getUserById);

//GET ALL
router.get("/", userControllers.getUsers);

//UPDATE
router.post("/update-hotel/:id", userControllers.postEditUser);

//DELETE
router.post("/delete-hotel/:id", userControllers.deleteUserById);

//COUNT
router.get("/count", userControllers.countUser);

module.exports = router;
