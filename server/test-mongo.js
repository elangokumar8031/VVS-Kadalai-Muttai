import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("No MONGO_URI found in environment");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Test: MongoDB Connected");
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Test: MongoDB connection failed:", err.message);
    process.exit(1);
  });
