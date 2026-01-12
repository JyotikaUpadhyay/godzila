const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, default: "BRAND", trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },      // store in cents or INR paise (consistent)
    compareAt: { type: Number, default: null },
    category: { type: String, default: "general" },
    collectionSlug: { type: String, default: "women", index: true },
    tags: [{ type: String }],
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
