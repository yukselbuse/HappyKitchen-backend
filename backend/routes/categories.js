const express = require("express");
const router = express.Router();

const controller = require("../controllers/category_controller");

router.get("/categories/:categoryid", controller.getProductByCategoryId);

module.exports = router;
