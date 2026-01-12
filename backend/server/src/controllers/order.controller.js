const ApiError = require("../utils/ApiError");
const Order = require("../models/Order");

function calcTotals(items) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal >= 15000 ? 0 : items.length ? 499 : 0;
  return { subtotal, shipping, grandTotal: subtotal + shipping };
}

exports.create = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!Array.isArray(items) || items.length === 0) throw new ApiError(400, "Cart items required");

    const totals = calcTotals(items);

    const order = await Order.create({
      userId: req.user.id,
      items: items.map((it) => ({
        productId: it.productId,
        title: it.title,
        price: it.price,
        qty: it.qty,
        image: it.image || "",
      })),
      shippingAddress: shippingAddress || {},
      totals,
      status: "placed",
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

exports.mine = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};
