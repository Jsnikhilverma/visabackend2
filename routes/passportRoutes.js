const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middlewares/authenticate");
const path = require("path");
const {
  applyPassport,
  getAllPassports, // Add this function in your controller
  // updatePassportStatus,
  // getPassportById, // Add this function in your controller
} = require("../controllers/passportController");
// your auth middleware

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/passport/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// POST API to apply for a passport
router.post(
  "/apply/:kycId", // Assuming kycId is passed as a URL parameter
  auth,
  upload.fields([
    { name: "userImg", maxCount: 1 },
    { name: "adharFrontImg", maxCount: 1 },
    { name: "adharBackImg", maxCount: 1 },
    { name: "panCardImg", maxCount: 1 },
  ]),
  applyPassport
);

// GET API to fetch all passport applications
router.get("/passports", auth, getAllPassports);
// router.put("/passport-status-update/:passportId", auth, updatePassportStatus);

// GET API to fetch a specific passport application by ID
// router.get("/:id", authenticate, getPassportById);

module.exports = router;
