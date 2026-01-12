const ApiError = require("../utils/ApiError");
const Product = require("../models/Product");

exports.list = async (req, res, next) => {
  try {
    const {
      collectionSlug,
      q,
      brand,
      minPrice,
      maxPrice,
      sort = "new",
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (collectionSlug) filter.collectionSlug = collectionSlug;

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ];
    }

    if (brand) filter.brand = { $regex: brand, $options: "i" };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortObj =
      sort === "price_low"
        ? { price: 1 }
        : sort === "price_high"
        ? { price: -1 }
        : { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const items = await Product.find(filter).sort(sortObj).skip(skip).limit(Number(limit));

    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) throw new ApiError(404, "Product not found");
    res.json({ success: true, item });
  } catch (err) {
    next(err);
  }
};
