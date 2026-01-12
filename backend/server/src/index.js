const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");
const { seedProducts } = require("./utils/seed");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Health
app.get("/api/v1/health", (req, res) => {
  res.json({ success: true, message: "Bluefly API is healthy ✅" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// Error middleware LAST
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI);
  await seedProducts();

  app.listen(PORT, () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
  });
})();
