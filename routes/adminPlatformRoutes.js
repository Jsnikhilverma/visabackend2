const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authenticate } = require("../middlewares/adminauth");
const upload = multer({ dest: "uploads/platform" }); // Or your custom multer config

const {
  createPlatform, deletePlatform, updatePlatform
} = require("../controllers/platformController");

router.post(
  "/createPlatform",
  authenticate,
  upload.single("platformLogo"),
  createPlatform
);

router.delete("/deletePlatform/:id", authenticate, deletePlatform);

router.put(
    "/updatePlatform/:id",
    authenticate,
    upload.single("platformLogo"),
    updatePlatform
);


module.exports = router;
