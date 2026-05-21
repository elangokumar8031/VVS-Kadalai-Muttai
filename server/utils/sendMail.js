import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"VVS Kadalai Mittai" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Mail sent to:", to);
  } catch (error) {
    console.error("❌ MAIL ERROR:", error);
    throw error;
  }
};

export default sendMail;
