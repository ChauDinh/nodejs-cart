const express = require("express");

const controller = require("../controllers/users.controller");
const userValidation = require("../validation/users.validation");

const router = express.Router();

router.get("/create", controller.create);

router.get("/:id", controller.userInfo);

router.post("/create", userValidation.postUsers, controller.postUsers);

module.exports = router;
