const express = require("express");
const router = express.Router();
const { getOnlyPassports } = require("../controllers/onlyPassportController");
const {
  getAllPassports,
  getPassportById,
} = require("../controllers/passportController");
const { authenticate } = require("../middlewares/adminauth");

router.get("/onlypassport", authenticate, getOnlyPassports);
router.get("/allpassports", authenticate, getAllPassports);
router.get("/getpassport/:passportId", authenticate, getPassportById);

module.exports = router;
