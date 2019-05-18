const express = require("express");

const controller = require("../controllers/products.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.productDetails);

router.post("/create", controller.postProducts);

module.exports = router;