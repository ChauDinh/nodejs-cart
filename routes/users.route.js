const express = require("express");
const multer = require("multer");

const controller = require("../controllers/users.controller");
const userValidation = require("../validation/users.validation");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({ dest: "./public/uploads/userAvatar" });

const router = express.Router();

router.get("/create", controller.create);

router.get("/login", controller.login);

router.get("/:id", authMiddleware.requireAuth, controller.userInfo);

router.post("/login", controller.postLogin);

router.post(
  "/create",
  upload.single("avatar"),
  userValidation.postUsers,
  controller.postUsers
);

module.exports = router;
