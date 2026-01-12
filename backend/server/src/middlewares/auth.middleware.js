const ApiError = require("../utils/ApiError");
const { verifyToken } = require("../utils/token");
const User = require("../models/User");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      throw new ApiError(401, "Unauthorized: Missing Bearer token");
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) throw new ApiError(401, "Unauthorized: User not found");

    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (err) {
    next(new ApiError(401, "Unauthorized: Invalid or expired token"));
  }
};
