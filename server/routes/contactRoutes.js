import express from "express";
import sendMail from "../utils/sendMail.js";

const router = express.Router();

/* CONTACT FORM */
  router.post("/", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  try {
    // 1️⃣ MAIL TO ADMIN
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 2️⃣ AUTO-REPLY TO CUSTOMER
    await sendMail({
      to: email,
      subject: "Thank you for contacting VVS Kadalai Mittai 🍬",
      html: `
        <h2>Vanakkam ${name}! 🙏</h2>
        <p>
          Thank you for contacting <strong>VVS Kadalai Mittai</strong>.
        </p>
        <p>
          We have received your message and our team will contact you shortly.
        </p>

        <hr/>

        <p><strong>Your Message:</strong></p>
        <p>${message}</p>

        <br/>

        <p>
          Regards,<br/>
          <strong>VVS Kadalai Mittai</strong><br/>
          Kovilpatti, Tamil Nadu<br/>
          📞 +91 XXXXX XXXXX
        </p>
      `,
    });

    res.status(200).json({ message: "Mail sent successfully" });
 } catch (error) {
  console.error("❌ MAIL ERROR:", error);
  res.status(500).json({
    message: "Mail failed to send",
    error: error.message,
  });
}
});

export default router;
