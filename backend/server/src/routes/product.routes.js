const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/product.controller");

router.get("/", ctrl.list);
router.get("/:id", ctrl.getById);

module.exports = router;
