const express = require("express");
const router = express.Router();
const {
  getAllPassportsadmin,
  getPassportById,
} = require("../controllers/passportController");
const { authenticate } = require("../middlewares/adminauth");

router.get("/allpassports", authenticate, getAllPassportsadmin);
router.get("/getpassport/:passportId", authenticate, getPassportById);

module.exports = router;
