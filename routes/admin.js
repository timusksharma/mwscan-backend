const express = require("express");
const router = express.Router();

const passport = require("passport");

const AdminController = require("../controllers/admin");

/* Create admin */
router.post("/register", AdminController.admin.register);

/* Login */
router.post("/login", AdminController.admin.login);

module.exports = router;
