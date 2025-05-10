const VisaApplication = require("../models/VisaApplication");
const User = require("../models/User");

exports.applyVisa = async (req, res) => {
  const userId = req.userId;
  try {
    const {
      country,
      visaType,
      travelDate,
      returnDate,
      travelPurpose,
      accommodation,
      hasInvitation,
      passportId,
    } = req.body;

    const newVisa = new VisaApplication({
      //   userId: req.user.id,
      passportId: req.params.passportId,
      country,
      visaType,
      travelDate,
      returnDate,
      travelPurpose,
      accommodation,
      hasInvitation,
      documents: {
        photo: req.files?.photo?.[0]?.path || "",
        bankStatement: req.files?.bankStatement?.[0]?.path || "",
        invitation: req.files?.invitation?.[0]?.path || "",
      },
    });

    const saved = await newVisa.save();
    const savedPass = saved._id.toString();

    const user = await User.findById(userId);
    const onlyPassport = await VisaApplication.findById(savedPass);

    console.log(onlyPassport, "OnlyPassport");

    user.visaApplicationId = savedPass;
    await user.save();
    console.log(user);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getVisaApplications = async (req, res) => {
  try {
    const visaApplications = await VisaApplication.find({
      userId: req.param.userId,
    });
    res.status(200).json(visaApplications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getVisaApplicationById = async (req, res) => {
  try {
    const id = req.params.visaId; // Correctly get the ID from route params
    console.log("Visa Application ID:", id); // Log the visa ID to verify

    const visaApplication = await VisaApplication.findOne({ _id: id }); // Use extracted ID

    if (!visaApplication) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    res.status(200).json(visaApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateVisaApplication = async (req, res) => {
  try {
    const id = req.params.visaid; // Correctly get the ID from route params
    console.log("Visa Application ID:", id); // Log the visa ID to verify

    const updatedVisa = await VisaApplication.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedVisa) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    res.status(200).json(updatedVisa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteVisaApplication = async (req, res) => {
  try {
    const id = req.params.id; // Correctly get the ID from route params
    console.log("Visa Application ID:", id); // Log the visa ID to verify

    const deletedVisa = await VisaApplication.findByIdAndDelete({ _id: id });

    if (!deletedVisa) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    res.status(200).json({ message: "Visa application deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllVisaApplications = async (req, res) => {
  try {
    const visaApplications = await VisaApplication.find();
    res.status(200).json(visaApplications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVisaApplicationStatus = async (req, res) => {
  const { visaApplicationId } = req.params;
  const status = req.query.status;

  if (!visaApplicationId) {
    return res.status(400).json({ message: "Visa application ID is required" });
  }

  try {
    const visa = await VisaApplication.findById(visaApplicationId);

    if (!visa) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    visa.status = status;
    await visa.save();

    res
      .status(200)
      .json({ message: `Status updated successfully`, data: visa });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
