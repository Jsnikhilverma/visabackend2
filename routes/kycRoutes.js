const express = require("express");
const router = express.Router();
const dynamicUpload = require("../middlewares/multer.middleware");
const {
  submitKyc,
  getKycById,
  toggleKyc,
  getAllKyc,
} = require("../controllers/kycController");
const { auth } = require("../middlewares/authenticate");

// Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "./public/temp"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

router.post(
  "/submit",
  auth,
  dynamicUpload("kycDetails").fields([
    { name: "adharFrontImg", maxCount: 1 },
    { name: "adharBackImg", maxCount: 1 },
    { name: "panCardImg", maxCount: 1 },
  ]),
  submitKyc
);
router.get("/details/:kycId", auth, getKycById);
router.get("/alldetails", auth, getAllKyc);

router.put("/approve/:kycId", auth, toggleKyc);

module.exports = router;
