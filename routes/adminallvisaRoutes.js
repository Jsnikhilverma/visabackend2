const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/adminauth");
const {
  getVisaApplications,
  getAllVisaApplications,
  deleteVisaApplication,
  updateVisaApplication,
  getVisaApplicationById,
  assignExpertToVisa,
  filterVisaApplication,
  updateVisaPriority
} = require("../controllers/visaController");

router.get("/visaapplications", authenticate, getVisaApplications);
router.put("/visaapplications/:id", authenticate, updateVisaApplication);
router.delete("/visaapplications/:id", authenticate, deleteVisaApplication);
router.get("/allvisaapplications", authenticate, getAllVisaApplications);
router.get("/visaapplications/:visaId", authenticate, getVisaApplicationById);
router.put("/assign-visa/:visaId/:expertId", authenticate, assignExpertToVisa);
router.get("/filterApplications", authenticate, filterVisaApplication);
router.patch("/updateVisaPriority/:visaId", authenticate, updateVisaPriority);

module.exports = router;
