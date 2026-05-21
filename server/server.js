  import orderRoutes from "./routes/orderRoutes.js";
  import contactRoutes from "./routes/contactRoutes.js";
  import authRoutes from "./routes/auth.js";
  import express from "express";
  import mongoose from "mongoose";
  import cors from "cors";
  import path from "path";
  import { fileURLToPath } from "url";
  import dotenv from "dotenv"; 
  import fetch from "node-fetch";

  const otpStore = {};


  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  dotenv.config({ path: path.join(__dirname, ".env") });



  console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "LOADED" : "NOT LOADED");


  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use("/api/orders", orderRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/auth", authRoutes);
  





  // Test Route
  app.get("/", (req, res) => {
    res.send("Peanut Candy Server is running 🚀");
  });

  // 📩 Send OTP
  app.post("/api/send-otp", async (req, res) => {
    
    try {
      const { phone } = req.body;
      if (!phone) return res.json({ success: false, error: "Phone number is required" });


      // ✅ Clean phone FIRST
      const cleanPhone = phone.replace(/\D/g, "").slice(-10);

      // ✅ Rate limit (correct place)
      if (otpStore[cleanPhone] && Date.now() < otpStore[cleanPhone].expiry) {
        return res.json({
          success: false,
          message: "Please wait before requesting another OTP",
        });
      }

      // ✅ Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // ✅ Store OTP
      otpStore[cleanPhone] = {
        otp,
        expiry: Date.now() + 5 * 60 * 1000,
      };

      // ✅ Send SMS
      const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "otp",
          variables_values: otp,
          numbers: cleanPhone,
        }),
      });

      const data = await response.json();

      if (data.return === true) {
        res.json({ success: true, message: "OTP sent successfully" });
      } else {
        res.json({ success: false, error: data.message });
      }
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  });

  // ✅ Verify OTP
  app.post("/api/verify-otp", (req, res) => {
    const { phone, code } = req.body;

    // ✅ Validate FIRST (after destructuring)
    if (!phone || !code) {
      return res.json({
        success: false,
        message: "Phone and OTP are required",
      });
    }

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    const record = otpStore[cleanPhone];

    if (!record)
      return res.json({ success: false, message: "OTP not requested" });

    if (Date.now() > record.expiry)
      return res.json({ success: false, message: "OTP expired" });

    if (record.otp !== code)
      return res.json({ success: false, message: "Invalid OTP ❌" });

    delete otpStore[cleanPhone];

    res.json({ success: true, message: "OTP Verified ✅" });
  });

  // Port
  const PORT = process.env.PORT || 5000;

  // MongoDB Connection
  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("✅ MongoDB Connected");

      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("❌ MongoDB connection failed");
      console.error(error);
    });
