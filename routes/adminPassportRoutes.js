const express = require("express");
const router = express.Router();
const {
  getAllPassportsadmin,
  getPassportById,
  assignExpertToPassport,
} = require("../controllers/passportController");
const { authenticate } = require("../middlewares/adminauth");

router.get("/allpassports", authenticate, getAllPassportsadmin);
router.get("/getpassport/:passportId", authenticate, getPassportById);
router.put(
  "/assign-expert/:passportId/:expertId",
  authenticate,
  assignExpertToPassport
);

module.exports = router;
