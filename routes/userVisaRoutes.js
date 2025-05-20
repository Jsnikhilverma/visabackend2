const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authenticate");
const {
  userFilterVisaApplication
} = require("../controllers/visaController");

// Protected Routes

router.get("/userFilterVisaApplications", auth, userFilterVisaApplication);


module.exports = router;
