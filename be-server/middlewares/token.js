module.exports = (req, res, next) => {
  //lay token trong Header
  const token = req.get("Authorization");

  //kiem tra co token gui den ko
  if (!token) {
    return res.status(401).json({ message: "Token not found!" });
  }

  // kiem tra token gui den co phai tu mot admin khong
  if (token !== "DUMMY_admin_token") {
    // trả về res khi không phai
    return res.status(401).json({ message: "Unauthorized" });
  }

  //chay next() de chuyen den cac middleware phia duoi
  next();
};
