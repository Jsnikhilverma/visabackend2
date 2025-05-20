const Platform = require("../models/Platform");
const fs = require('fs');

exports.createPlatform = async (req, res) => {
    try {
      const { brandName, contactInfo, tax } = req.body;
      console.log(req.file)
  
      // Check for uploaded logo
      if (!req.file) {
        return res.status(400).json({ message: "Logo image is required." });
      }
  
      const logoPath = req.file.path; // or req.file.filename if you're storing only the name
  
      if (!brandName || !contactInfo || !tax) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const existing = await Platform.findOne({ brandName });
      if (existing) {
        return res.status(409).json({ message: "Platform already exists." });
      }
  
      const platform = new Platform({
        brandName,
        logo: logoPath,
        contactInfo,
        tax,
      });
  
      const saved = await platform.save();
  
      res.status(201).json({ message: "Platform created successfully", data: saved });
    } catch (error) {
      console.error("Error creating platform:", error);
      res.status(500).json({ message: "Server error." });
    }
};

exports.deletePlatform = async (req, res) => {
    try {
      const { id } = req.params;
  
      const platform = await Platform.findById(id);
      if (!platform) {
        return res.status(404).json({ message: "Platform not found" });
      }
  
      await Platform.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Platform deleted successfully" });
    } catch (error) {
      console.error("Error deleting platform:", error);
      res.status(500).json({ message: "Server error" });
    }
};

exports.updatePlatform = async (req, res) => {
    try {
      const { id } = req.params;
      const { brandName, contactInfo, tax } = req.body;
  
      const platform = await Platform.findById(id);
      if (!platform) {
        return res.status(404).json({ message: "Platform not found" });
      }
  
      // Update fields if provided
      if (brandName) platform.brandName = brandName;
      if (contactInfo) platform.contactInfo = contactInfo;
      if (tax) platform.tax = tax;
  
      // Handle logo replacement if uploaded
      const logoFile = req.files?.platformLogo?.[0];
      if (logoFile) {
        // Optionally delete the old logo file if needed
        if (platform.logo && fs.existsSync(platform.logo)) {
          fs.unlinkSync(platform.logo); // use with care in production
        }
        platform.logo = logoFile.path;
      }
  
      await platform.save();
  
      res.status(200).json({ message: "Platform updated successfully", data: platform });
    } catch (error) {
      console.error("Error updating platform:", error);
      res.status(500).json({ message: "Server error" });
    }
};

exports.getAllPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ message: "Platforms fetched successfully", data: platforms });
  } catch (error) {
    console.error("Error fetching platforms:", error);
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

    res.status(200).json({ message: "Platform fetched successfully", data: platform });
  } catch (error) {
    console.error("Error fetching platform by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};