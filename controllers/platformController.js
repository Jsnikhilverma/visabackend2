const Platform = require("../models/Platform");
const Document = require("../models/Document");
const fs = require("fs");

exports.createPlatform = async (req, res) => {
  try {
    const { brandName, email, mobile, address, tax } = req.body;
    console.log(req.file);

    // Check for uploaded logo
    if (!req.file) {
      return res.status(400).json({ message: "Logo image is required." });
    }
    const logoPath = req.file ? `/uploads/${req.file.filename}` : null;
    // const logoPath = req.file.path;

    if (!brandName || !email || !mobile || !address || !tax) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await Platform.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Platform already exists." });
    }

    const platform = new Platform({
      brandName,
      logo: logoPath,
      email,
      mobile,
      address,
      tax,
    });

    const saved = await platform.save();

    res
      .status(201)
      .json({ message: "Platform created successfully", data: saved });
  } catch (error) {
    console.error("Error creating platform:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// exports.deletePlatform = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const platform = await Platform.findById(id);
//     if (!platform) {
//       return res.status(404).json({ message: "Platform not found" });
//     }

//     await Platform.findByIdAndDelete(id);

//     res.status(200).json({ message: "Platform deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting platform:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.updatePlatform = async (req, res) => {
  try {
    const { id } = req.params;

    const { brandName, email, mobile, address, tax } = req.body;

    const platform = await Platform.findById(id);
    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }

    // Update fields if provided
    if (brandName) platform.brandName = brandName;
    if (email) platform.email = email;
    if (mobile) platform.mobile = mobile;
    if (address) platform.address = address;
    if (tax) platform.tax = tax;

    // Handle logo replacement if uploaded
    // const logoFile = req.files?.platformLogo?.[0];
    const logoFile = req.file ? `/uploads/${req.file.filename}` : null;
    if (logoFile) {
      // Optionally delete the old logo file if needed
      if (platform.logo && fs.existsSync(platform.logo)) {
        fs.unlinkSync(platform.logo); // use with care in production
      }
      platform.logo = logoFile;
    }

    await platform.save();

    res
      .status(200)
      .json({ message: "Platform updated successfully", data: platform });
  } catch (error) {
    console.error("Error updating platform:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/// CreateDocument function

exports.CreateDocument = async (req, res) => {
  try {
    const { document_name } = req.body;

    // Check for uploaded document
    if (!req.file) {
      return res.status(400).json({ message: "Document image is required." });
    }

    const documentPath = req.file.path; // or req.file.filename if you're storing only the name

    if (!document_name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await Document.findOne({ document_name });
    if (existing) {
      return res.status(409).json({ message: "Document already exists." });
    }

    const document = new Document({
      document_name,
      document_url: documentPath,
    });

    const saved = await document.save();

    res
      .status(201)
      .json({ message: "Document created successfully", data: saved });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// exports.GetAllDocument = async (req, res) => {
//   try {
//     const documents = await Document.find();
//     res
//       .status(200)
//       .json({ message: "Documents fetched successfully", data: documents });
//   } catch (error) {
//     console.error("Error fetching documents:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.GetAllDocument = async (req, res) => {
  try {
    const documents = await Document.find();
    res
      .status(200)
      .json({ message: "Documents fetched successfully", data: documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPlatformById = async (req, res) => {
  try {
    const { id } = req.params;

    const platform = await Platform.findById(id);
    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }

    res
      .status(200)
      .json({ message: "Platform fetched successfully", data: platform });
  } catch (error) {
    console.error("Error fetching platform by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find().sort({ createdAt: -1 }); // newest first
    res
      .status(200)
      .json({ message: "Platforms fetched successfully", data: platforms });
  } catch (error) {
    console.error("Error fetching platforms:", error);
    res.status(500).json({ message: "Server error" });
  }
};
