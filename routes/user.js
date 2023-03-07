const express = require("express");
const router = express.Router();

const passport = require("passport");

const UserController = require("../controllers/user");

/* Create admin */
router.post("/register", UserController.user.register);

/* Login */
router.post("/login", UserController.user.login);

module.exports = router;
