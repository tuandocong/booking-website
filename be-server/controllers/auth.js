const User = require("../models/user");
const { use } = require("../routes/hotels");
const createError = require("../util/error");
//SIGN-UP
exports.signUpUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json("User was created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//LOGIN
exports.loginUser = async (req, res, next) => {
  const usernameCheck = req.body.username;
  const passwordCheck = req.body.password;
  try {
    const user = await User.findOne({
      username: usernameCheck,
      password: passwordCheck,
    });
    // console.log(!user);

    if (!user) {
      // return res.status(404).json("Username or password is incorrect!!");
      return next(createError(404, "Username or password is incorrect!!"));
    }

    //loai bo truong Password, isAdmin
    const { password, ...ortherDetails } = user._doc;

    //kiem tra xem user co phai Admin khong
    let result;
    if (user._doc.isAdmin) {
      result = { ...ortherDetails, token: "DUMMY_admin_token", success: true };
    } else {
      result = { ...ortherDetails, token: "DUMMY_client_token", success: true };
    }

    res.status(200).json(result);
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
};
