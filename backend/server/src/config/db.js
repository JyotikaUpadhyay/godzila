const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    if (!uri) throw new Error("MONGO_URI missing in .env");
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected:", mongoose.connection.db.databaseName);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
