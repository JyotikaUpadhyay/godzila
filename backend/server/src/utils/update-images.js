const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/Product");

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // ✅ Update each product by _id (from your screenshots)
    const updates = [
      {
        id: "6960e86379d7a9731bfc27f4", // Leather Mini Bag
        images: [
          "/images/products/bag-1.jpg",
          "/images/products/bag-2.jpg",
          "/images/products/bag-3.jpg",
        ],
      },
      {
        id: "6960e86379d7a9731bfc27f5", // Signature Sneakers
        images: [
          "/images/products/sneaker-1.jpg",
          "/images/products/sneaker-2.jpg",
          "/images/products/sneaker-3.jpg",
        ],
      },
      {
        id: "6960e86379d7a9731bfc27f6", // Classic Sunglasses
        images: [
          "/images/products/sunglasses-1.jpg",
          "/images/products/sunglasses-2.jpg",
          "/images/products/sunglasses-3.jpg",
        ],
      },
      {
        id: "6960e86379d7a9731bfc27f7", // Clearance Wool Coat
        images: [
          "/images/products/coat-1.jpg",
          "/images/products/coat-2.jpg",
          "/images/products/coat-3.jpg",
        ],
      },
      {
        id: "6960e86379d7a9731bfc27f8", // Under $50 Accessory
        images: [
          "/images/products/accessory-1.jpg",
          "/images/products/accessory-2.jpg",
          "/images/products/accessory-3.jpg",
        ],
      },
      {
        id: "6960e86379d7a9731bfc27f9", // Designer Picks Item
        images: [
          "/images/products/designer-1.jpg",
          "/images/products/designer-2.jpg",
          "/images/products/designer-3.jpg",
        ],
      },
    ];

    for (const u of updates) {
      const res = await Product.updateOne(
        { _id: u.id },
        { $set: { images: u.images } }
      );
      console.log(`✅ Updated ${u.id}`, res.modifiedCount ? "(changed)" : "(no change)");
    }

    console.log("🎉 Done. Restart frontend and refresh.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

run();
