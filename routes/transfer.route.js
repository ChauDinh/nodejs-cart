const express = require("express");

const controller = require("../controllers/transfer.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/create", authMiddleware.requireAuth, controller.create);

router.post("/create", authMiddleware.requireAuth, controller.postCreate);

module.exports = router;
