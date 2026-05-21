import express from "express";
import User from "../models/User.js";



const router = express.Router();

// 👉 REGISTER API
router.post("/register", async (req, res) => {
  try {
    console.log("🔥 REGISTER API CALLED");
    console.log("📦 DATA:", req.body);

    const {
      fullName,
      phone,
      email,
      password,
      street,
      city,
      pincode,
      state,
    } = req.body;

    // check existing user
    const existingUser = await User.findOne({
      $or: [{ phone }, { email }],
    });

    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({
        message: "User already exists",
      });
    }

    console.log("💾 Saving user...");   // ✅ BEFORE save

    const newUser = new User({
      fullName,
      phone,
      email,
      password,
      street,
      city,
      pincode,
      state,
    });

    await newUser.save();

    console.log("✅ User saved");       // ✅ AFTER save

    res.json({ message: "Account created successfully" });

  } catch (err) {
    console.error("❌ ERROR:", err);    // ✅ SHOW REAL ERROR
    res.status(500).json({ message: err.message });
  }
});

// 👉 CHECK USER API
router.post("/check-user", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ exists: true, message: "User exists" });
    }

    return res.json({ exists: false, message: "User not found" });
  } catch (err) {
    console.error("❌ ERROR checking user:", err);
    res.status(500).json({ message: err.message });
  }
});

// 👉 LOGIN API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (err) {
    console.error("❌ ERROR logging in:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;