const Product = require("../models/Product");

async function seedProducts() {
  const count = await Product.countDocuments();
  if (count > 0) return;

  await Product.insertMany([
    {
      title: "Satin Wrap Dress",
      brand: "MICHAEL KORS",
      price: 8999,
      compareAt: 14999,
      category: "dress",
      collectionSlug: "women",
      tags: ["dress", "party"],
      images: ["/images/placeholder.jpg"],
      inStock: true,
    },
    {
      title: "Leather Sneakers",
      brand: "GUCCI",
      price: 15999,
      compareAt: 24999,
      category: "shoes",
      collectionSlug: "men",
      tags: ["sneakers"],
      images: ["/images/placeholder.jpg"],
      inStock: true,
    },
    {
      title: "Aviator Sunglasses",
      brand: "RAY-BAN",
      price: 4999,
      compareAt: 7999,
      category: "accessories",
      collectionSlug: "accessories",
      tags: ["sunglasses"],
      images: ["/images/placeholder.jpg"],
      inStock: true,
    },
    {
      title: "Clearance Tote Bag",
      brand: "COACH",
      price: 2999,
      compareAt: 9999,
      category: "bags",
      collectionSlug: "clearance",
      tags: ["clearance", "bag"],
      images: ["/images/placeholder.jpg"],
      inStock: true,
    },
  ]);

  console.log("🌱 Seeded demo products");
}

module.exports = { seedProducts };
