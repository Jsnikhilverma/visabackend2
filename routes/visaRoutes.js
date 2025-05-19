const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middlewares/authenticate");
const upload = multer({ dest: "uploads/visa/" });
const {
  applyVisa,
  getVisaApplications,
  getVisaApplicationById,
  updateVisaApplicationStatus,
  getAllVisaApplications,
} = require("../controllers/visaController");

// POST /api/visa/apply
router.post(
  "/apply/:passportId", // Assuming passportId is passed as a URL parameter
  auth,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "bankStatement", maxCount: 1 },
    { name: "invitation", maxCount: 1 },
  ]),
  applyVisa
);
router.get("/allapplications/:userId", auth, getVisaApplications);
router.get("/visa/:visaId", auth, getVisaApplicationById);
// router.put(
//   "/visaApplicationId/:visaApplicationId",
//   auth,
//   updateVisaApplicationStatus
// );
router.get("/allapplications", auth, getAllVisaApplications);

module.exports = router;
