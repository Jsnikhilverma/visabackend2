const CoverLetter = require("../models/CoverLetter");
const Noc = require("../models/Noc");
const SponsorshipLetter = require("../models/SponsorshipLetter");

// POST - Create Cover Letter
exports.createCoverLetter = async (req, res) => {
  try {
    if (req.file) {
      // File upload mode
      const newCoverLetter = new CoverLetter({
        uploadedFile: {
          filename: req.file.originalname,
          fileType: req.file.mimetype,
          filePath: req.file.path, // Cloudinary URL
        },
      });

      await newCoverLetter.save();
      return res
        .status(201)
        .json({ message: "File uploaded to Cloudinary", data: newCoverLetter });
    } else {
      // Form mode
      const { name, email, phone, jobTitle, company, letter } = req.body;

      const newCoverLetter = new CoverLetter({
        name,
        email,
        phone,
        jobTitle,
        company,
        letter,
      });

      await newCoverLetter.save();
      return res
        .status(201)
        .json({ message: "Cover letter saved", data: newCoverLetter });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.createNoc = async (req, res) => {
  try {
    if (req.file) {
      // File upload mode
      const newNoc = new Noc({
        uploadedFile: {
          filename: req.file.originalname,
          fileType: req.file.mimetype,
          filePath: req.file.path, // Cloudinary URL
        },
      });

      await newNoc.save();
      return res
        .status(201)
        .json({ message: "File uploaded to Cloudinary", data: newNoc });
    } else {
      // Form mode
      const { name, address, purpose, issueDate, authority, designation, remarks } = req.body;

      const newNoc = new Noc({
        name,
        address,
        purpose,
        issueDate,
        authority,
        designation,
        remarks
      });

      await newNoc.save();
      return res
        .status(201)
        .json({ message: "Cover letter saved", data: newNoc });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.createSponsorshipLetter = async (req, res) => {
  try {
    if (req.file) {
      // File upload mode
      const newSponsorshipLetter = new SponsorshipLetter({
        uploadedFile: {
          filename: req.file.originalname,
          fileType: req.file.mimetype,
          filePath: req.file.path, // Cloudinary URL
        },
      });

      await newSponsorshipLetter.save();
      return res
        .status(201)
        .json({ message: "File uploaded to Cloudinary", data: newSponsorshipLetter });
    } else {
      // Form mode
      const { name, address, phone, email, relationship, applicantName, visaPurpose, sponsorshipDetails, issueDate, notes } = req.body;

      const newSponsorshipLetter = new SponsorshipLetter({
        name,
        address,
        phone,
        email,
        relationship,
        applicantName,
        visaPurpose,
        sponsorshipDetails,
        issueDate,
        notes
      });

      await newSponsorshipLetter.save();
      return res
        .status(201)
        .json({ message: "Cover letter saved", data: newSponsorshipLetter });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.getAllCoverLetters = async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find().sort({ createdAt: -1 });
    res.status(200).json(coverLetters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
};
