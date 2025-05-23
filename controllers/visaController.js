const VisaApplication = require("../models/VisaApplication");
const User = require("../models/User");
const Expert = require("../models/Expert");
const { sendEmail } = require("../utils/mail");

exports.applyVisa = async (req, res) => {
  const userId = req.userId;
  console.log(userId, "UserId");

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
      userId: userId,
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

    await sendEmail(
      user.email,
      "Visa Application Submitted",
      `Your Visa application has been submitted successfully. Your Visa ID is ${saved._id.toString()}`
    );
    console.log(user);
    res.status(201).json(saved);
  } catch (err) {
    console.log(err, "d");

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
    const useridd = VisaApplication.userId;
    const uu = await User.findById(useridd);
    const email = uu.email;

    const updatedVisa = await VisaApplication.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedVisa) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    await sendEmail(
      email,
      "Status update successfully",
      `Your KYC Status has been Upadated successfully. Your status is ${kyc.status.toString()}`
    );

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
  const reason = req.body; // ✅ Extract reason from body

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
      .json({ message: "Status updated successfully", data: visa });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.assignExpertToVisa = async (req, res) => {
  const { visaId, expertId } = req.params;

  if (!visaId || !expertId) {
    return res
      .status(400)
      .json({ message: "Visa ID and Expert ID are required" });
  }

  try {
    const Visa = await VisaApplication.findById(visaId);

    if (!Visa) {
      return res.status(404).json({ message: "Visa not found" });
    }

    Visa.expertId = expertId; // Assuming this field exists in the model
    await Visa.save();

    res.status(200).json({
      message: "Expert assigned to Visa successfully",
      data: Visa,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all KYCs assigned to a specific expert
exports.getVisaByExpertId = async (req, res) => {
  const { expertId } = req.params;

  if (!expertId) {
    return res.status(400).json({ message: "Expert ID is required" });
  }

  try {
    const visa = await VisaApplication.find({ expertId });

    if (!visa || visa.length === 0) {
      return res.status(404).json({ message: "No Visa found for this expert" });
    }

    res
      .status(200)
      .json({ message: "Visa Application fetched successfully", data: visa });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateVisaStatus = async (req, res) => {
  const { visaId } = req.params;
  const { status } = req.query;
  const { reason } = req.body;

  // Basic validation
  if (!visaId || !status) {
    return res.status(400).json({ message: "Visa ID and status are required" });
  }

  // Validate status value
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Status must be either pending, approved, or rejected",
    });
  }

  // Require reason in all cases
  if (!reason || reason.trim() === "") {
    return res.status(400).json({
      message: "Reason is required for status update",
    });
  }

  try {
    const updateData = {
      status,
      reason,
    };

    const updatedVisa = await VisaApplication.findByIdAndUpdate(
      visaId,
      updateData,
      { new: true }
    );

    if (!updatedVisa) {
      return res.status(404).json({ message: "Visa not found" });
    }

    res.status(200).json({
      message: `Visa status updated to ${status}`,
      data: updatedVisa,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateVisaStatus = async (req, res) => {
  const { visaId } = req.params;
  const { status } = req.query;
  const { reason } = req.body;

  // Basic validation
  if (!visaId || !status) {
    return res.status(400).json({ message: "Visa ID and status are required" });
  }

  // Validate status value
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Status must be either pending, approved, or rejected",
    });
  }

  // Require reason in all cases
  if (!reason || reason.trim() === "") {
    return res.status(400).json({
      message: "Reason is required for status update",
    });
  }

  try {
    const updateData = {
      status,
      reason,
    };

    const updatedVisa = await VisaApplication.findByIdAndUpdate(
      visaId,
      updateData,
      { new: true }
    );

    if (!updatedVisa) {
      return res.status(404).json({ message: "Visa not found" });
    }

    res.status(200).json({
      message: `Visa status updated to ${status}`,
      data: updatedVisa,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.filterVisaApplication = async (req, res) => {
  try {
    const {
      status,
      startDate,
      endDate,
      country,
      expertName,
      clientName,
      clientEmail,
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (country) filter.country = country;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const userMatch = {};
    if (clientName) userMatch.name = { $regex: clientName, $options: "i" };
    if (clientEmail) userMatch.email = { $regex: clientEmail, $options: "i" };

    const expertMatch = {};
    if (expertName) expertMatch.name = { $regex: expertName, $options: "i" };

    const applications = await VisaApplication.find(filter)
      .populate({
        path: "userId",
        match: Object.keys(userMatch).length > 0 ? userMatch : undefined,
        select: "name email",
      })
      .populate({
        path: "expertId",
        match: Object.keys(expertMatch).length > 0 ? expertMatch : undefined,
        select: "name",
      });

    // Dynamically filter only if match was applied
    let filteredApplications = applications;

    if (Object.keys(userMatch).length > 0) {
      filteredApplications = filteredApplications.filter((app) => app.userId);
    }

    if (Object.keys(expertMatch).length > 0) {
      filteredApplications = filteredApplications.filter((app) => app.expertId);
    }

    res.status(200).json({ data: filteredApplications });
  } catch (err) {
    console.error("Error filtering visa applications:", err);
    res.status(500).json({ message: "Failed to filter visa applications" });
  }
};

exports.updateVisaPriority = async (req, res) => {
  try {
    const id = req.params.visaId; // Visa application ID from the route
    const { priority, priorityReason } = req.body;

    // Validate required field
    if (typeof priority !== "boolean") {
      return res
        .status(400)
        .json({ message: "Priority field must be a boolean." });
    }

    const updateFields = { priority };

    // Only add priorityReason if it was sent
    if (priorityReason !== undefined) {
      updateFields.priorityReason = priorityReason;
    }

    const updatedVisa = await VisaApplication.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (!updatedVisa) {
      return res.status(404).json({ message: "Visa application not found." });
    }

    res
      .status(200)
      .json({ message: "Priority updated successfully.", data: updatedVisa });
  } catch (error) {
    console.error("Error updating priority:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.userFilterVisaApplication = async (req, res) => {
  try {
    const { status, country, priority, startDate, endDate, clientName } =
      req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (country) {
      query.country = { $regex: new RegExp(country, "i") }; // case-insensitive
    }

    if (priority !== undefined) {
      query.priority = priority === "true";
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    // If filtering by client name, find matching user IDs first
    if (clientName) {
      const matchedUsers = await User.find({
        name: { $regex: new RegExp(clientName, "i") },
      }).select("_id");

      const userIds = matchedUsers.map((u) => u._id);
      query.userId = { $in: userIds };
    }

    const applications = await VisaApplication.find(query)
      .populate("userId", "name email") // include user info
      .populate("expertId", "name") // optional: include expert info
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({ count: applications.length, data: applications });
  } catch (error) {
    console.error("Error filtering visa applications:", error);
    res.status(500).json({ message: "Server error." });
  }
};
