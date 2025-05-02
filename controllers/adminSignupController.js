exports.signup = async (req, res) => {
  const { email, password, role = "viewer" } = req.body;
  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered", userId: newAdmin._id });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
