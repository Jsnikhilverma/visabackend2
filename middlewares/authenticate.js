const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded; // You can now access req.user._id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
