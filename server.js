const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

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
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://visaadmin-opal.vercel.app",
      // "http://localhost:5173",
      // "http://localhost:3000",
    ], // or your frontend URL
    credentials: true, // if you're using cookies
  })
); // Add this line
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB");
    console.error("👉 MONGO_URI:", process.env.MONGO_URI);
    console.error("📛 Error message:", err.message);
    process.exit(1); // Optional: Exit the app if DB fails
  });

// Ping-Pong Route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// user Routes
app.use("/api/auth", auth);
app.use("/api/kyc", kycRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/onlypassport", onlypassportRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/visa", visaRoutes);

// Admin Routes
app.use("/api/admin", adminSignupRoutes);
app.use("/api/admin/role", roleRoutes);
app.use("/api/admin/kyc", adminkycRoutes);
app.use("/api/admin/allusers", alluser);
app.use("/api/admin/passport", adminonlypassportRoutes);
app.use("/api/admin/visa", adminallvisaRoutes);
app.use("/api/admin/passportuser", adminPassportRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
