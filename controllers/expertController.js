const Expert = require("../models/Expert");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.expertSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      experienceYears,
      expertise,
      countries,
      companyName,
      officeAddress,
      workingHours,
      password,
      confirmPassword,
      termsAccepted,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingExpert = await Expert.findOne({ email });
    if (existingExpert)
      return res.status(400).json({ message: "Expert already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const expert = await Expert.create({
      name: fullName,
      email,
      phone,
      password: hashedPassword,
      experienceYears,
      expertise,
      countries,
      companyName,
      officeAddress,
      workingHours,
      termsAccepted,

      // Handle uploaded file paths
      profilePhoto: req.files?.profilePhoto?.[0]?.path || null,
      governmentId: req.files?.governmentId?.[0]?.path || null,
      idWithSelfie: req.files?.idWithSelfie?.[0]?.path || null,
      certifications: req.files?.certifications?.[0]?.path || null,
    });

    res.status(201).json({ message: "Expert registered successfully", expert });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.expertLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const expert = await Expert.findOne({ email });
    if (!expert)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, expert.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: expert._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // res.json({ message: "Login successful", token });

    res.status(200).json({
      token,
      message: "Login successful",

      id: expert._id,
      name: expert.name,
      email: expert.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find().select("-password"); // exclude password
    res.status(200).json({ experts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch experts", error });
  }
};

exports.getExpertById = async (req, res) => {
  try {
    const { expertId } = req.params;

    const expert = await Expert.findById(expertId).select("-password");
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.status(200).json({ expert });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expert details", error });
  }
};
