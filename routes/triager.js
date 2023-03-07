const express = require("express");
const router = express.Router();

const passport = require("passport");

const TriagerController = require("../controllers/triager");

/* Login */
router.post("/login", TriagerController.admin.login);

/*Users */
/* Get Users */
router.get(
  "/user",
  passport.authenticate("admin", { session: false }),
  AdminController.admin.getUsers
);

module.exports = router;
