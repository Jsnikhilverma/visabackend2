const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import CSV import function

// Routes
const auth = require("./routes/auth");
const kycRoutes = require("./routes/kycRoutes");
const passportRoutes = require("./routes/passportRoutes");
const onlypassportRoutes = require("./routes/onlypassportRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const visaRoutes = require("./routes/visaRoutes");
const roleRoutes = require("./routes/roleRoutes");
const adminSignupRoutes = require("./routes/adminSignupRoutes");
const adminkycRoutes = require("./routes/adminkycRoutes");
const alluser = require("./routes/alluserRoutes");
const adminonlypassportRoutes = require("./routes/adminonlypassportRoutes");
const adminallvisaRoutes = require("./routes/adminallvisaRoutes");
const adminPassportRoutes = require("./routes/adminPassportRoutes");
const expertRoutes = require("./routes/expertRoutes");
const userVisaRoutes = require("./routes/userVisaRoutes");
const importCSVFiles = require("./importAllCsv");
const paymentRoutes = require("./routes/paymentRoutes");
const adminPlatformRoutes = require("./routes/adminPlatformRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://visabackend2-production.up.railway.app",
      "https://visa2-c6vn.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "https://visaadmin-opal.vercel.app",
    ],
    credentials: true,
  })
);

// Static files
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Optional: Import CSV if environment variable is set
    if (process.env.IMPORT_CSV === "true") {
      console.log("📥 Starting CSV import...");
      await importCSVFiles();
    }
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB");
    console.error("👉 MONGO_URI:", process.env.MONGO_URI);
    console.error("📛 Error message:", err.message);
    process.exit(1);
  });

// Ping Route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// User Routes
app.use("/api/auth", auth);
app.use("/api/kyc", kycRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/onlypassport", onlypassportRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/visa", visaRoutes);
app.use("/api/user", userVisaRoutes);
app.use("/api/payment", paymentRoutes);
// Admin Routes
app.use("/api/admin", adminSignupRoutes);
app.use("/api/admin/role", roleRoutes);
app.use("/api/admin/kyc", adminkycRoutes);
app.use("/api/admin/allusers", alluser);
app.use("/api/admin/passport", adminonlypassportRoutes);
app.use("/api/admin/visa", adminallvisaRoutes);
app.use("/api/admin/passportuser", adminPassportRoutes);
app.use("/api/admin/user", adminPassportRoutes);
app.use("/api/admin/platform", adminPlatformRoutes);

// Expert Routes
app.use("/api/expert", expertRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
