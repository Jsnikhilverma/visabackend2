const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/adminauth");
const dynamicUpload = require("../middlewares/multer.middleware"); // Or your custom multer config

const {
  createPlatform,
  updatePlatform,
  getAllPlatforms,
  getPlatformById,
  CreateDocument,
  GetAllDocument,
} = require("../controllers/platformController");

router.post(
  "/createPlatform",
  authenticate,
  dynamicUpload("platform").single("platformLogo"),
  createPlatform
);

// router.delete("/deletePlatform/:id", authenticate, deletePlatform);

router.get("/getAllPlatforms", authenticate, getAllPlatforms);
router.get("/getPlatformById/:id", authenticate, getPlatformById);

router.put(
  "/updatePlatform/:id",
  authenticate,
  dynamicUpload("platform").single("platformLogo"),
  updatePlatform
);

router.post(
  "/createDocument",
  authenticate,
  dynamicUpload("platform").single("image"),
  CreateDocument
);

router.get("/getAllDocument", authenticate, GetAllDocument);

module.exports = router;
