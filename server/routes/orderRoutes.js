import sendMail from "../utils/sendMail.js";

import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

/* CREATE ORDER */
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save to database
    const order = new Order(req.body);
    await order.save();
    await sendMail(req.body);
    // 2️⃣ Send email
    await sendMail({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    // 3️⃣ Response
    res.status(201).json({
      message: "Order saved and email sent",
      order,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


/* GET ALL ORDERS */
router.get("/", async (req, res) => {

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
