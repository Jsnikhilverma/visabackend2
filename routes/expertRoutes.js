const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  expertSignup,
  expertLogin,
  getAllExperts,
  getExpertById,
} = require("../controllers/expertController");
const {
  getKycByExpertId,
  getKycById,
  // toggleKyc,
} = require("../controllers/kycController");
const expertMiddleware = require("../middlewares/expertMiddleware");
const { authenticate } = require("../middlewares/adminauth");

const {
  getPassportByExpertId,
  getPassportById,
  updatePassportStatus,
} = require("../controllers/passportController");
const {
  getVisaByExpertId,
  getVisaApplicationById,
  updateVisaApplicationStatus,
  updateVisaStatus,
} = require("../controllers/visaController");

const coverLetterController = require("../controllers/coverLetterController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/temp"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
}); 

const upload = multer({ storage });

// Public routes
router.post(
  "/signup",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "governmentId", maxCount: 1 },
    { name: "idWithSelfie", maxCount: 1 },
    { name: "certifications", maxCount: 1 },
  ]),
  authenticate,
  expertSignup
);
router.post("/login", expertLogin);
router.get("/allexperts", authenticate, getAllExperts);
router.get("/experts/:expertId", authenticate, getExpertById);
router.get("/by-expert/:expertId", expertMiddleware, getKycByExpertId);
router.get("/passport/:expertId", expertMiddleware, getPassportByExpertId);
router.get("/visa/:expertId", expertMiddleware, getVisaByExpertId);

//kycs
router.get("/expertkyc/:kycId", expertMiddleware, getKycById);
// router.put("/status/:kycId", expertMiddleware, toggleKyc);

//passportss
router.get("/expertpasport/:passportId", expertMiddleware, getPassportById);
router.put("/passport-status-update/:passportId", updatePassportStatus);

//visa
router.get("/expertvisa/:visaId", expertMiddleware, getVisaApplicationById);
router.put(
  "/visaApplicationId/:visaApplicationId",
  expertMiddleware,
  updateVisaApplicationStatus
);
router.put("/visa-status/:visaId", updateVisaStatus);

// coverletter
router.put(
  "/coverletter",
  upload.single("file"),
  expertMiddleware,
  coverLetterController.createCoverLetter
);

// GET all cover letters
router.get(
  "/allcoverletter",
  expertMiddleware,
  coverLetterController.getAllCoverLetters
);

// Protected test route
router.get("/dashboard", expertMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Expert Dashboard", expertId: req.expertId });
});

module.exports = router;
