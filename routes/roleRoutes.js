const express = require("express");
const router = express.Router();
const { assignRole } = require("../controllers/roleController");
const { authenticate, authorizeRole } = require("../middlewares/adminauth");

router.put("/assign-role", authenticate, authorizeRole(["admin"]), assignRole);

module.exports = router;
