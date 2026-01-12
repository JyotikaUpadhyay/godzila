const ApiError = require("../utils/ApiError");
const User = require("../models/User");
const { signToken } = require("../utils/token");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new ApiError(400, "Name, email, password are required");

    const exists = await User.findOne({ email });
    if (exists) throw new ApiError(409, "Email already registered");

    const user = await User.create({ name, email, password });

    const token = signToken({ id: user._id.toString() });

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new ApiError(400, "Email and password are required");

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ApiError(401, "Invalid credentials");

    const ok = await user.comparePassword(password);
    if (!ok) throw new ApiError(401, "Invalid credentials");

    const token = signToken({ id: user._id.toString() });

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};
