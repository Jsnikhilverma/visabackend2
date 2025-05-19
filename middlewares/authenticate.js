const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "secret");
    // console.log(decoded);
    

    req.userId = decoded.id; // You can now access req.user._id
    next();
  } catch (err) {
    console.log(err);
    next(err);
    res.status(401).json({ message: "Invalid token" });
  }
};
