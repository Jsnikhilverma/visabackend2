const CoverLetter = require("../models/CoverLetter");

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

exports.getAllCoverLetters = async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find().sort({ createdAt: -1 });
    res.status(200).json(coverLetters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
};
