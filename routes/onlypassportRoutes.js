const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middlewares/authenticate");
// const upload = multer({ dest: "uploads/" }); // Or your custom multer config
const dynamicUpload = require("../middlewares/multer.middleware"); // Or your custom multer config

const {
  createOnlyPassport,
  getOnlyPassports,
  updateOnlyPassportStatus,
} = require("../controllers/onlyPassportController");

router.post(
  "/onlypassport/:kycId", // Assuming kycId is passed as a URL parameter
  auth,
  dynamicUpload("passports").fields([{ name: "passportFrontImg", maxCount: 1 }]),
  createOnlyPassport
);

router.get("/onlypassport", auth, getOnlyPassports);

router.put(
  "/password-status-update/:passportId",
  auth,
  updateOnlyPassportStatus
);

module.exports = router;
