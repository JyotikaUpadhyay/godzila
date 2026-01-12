const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/order.controller");

router.post("/", auth, ctrl.create);
router.get("/mine", auth, ctrl.mine);

module.exports = router;
