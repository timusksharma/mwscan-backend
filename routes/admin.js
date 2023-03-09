const express = require("express");
const router = express.Router();

const passport = require("passport");

const AdminController = require("../controllers/admin");

/* Create admin */
router.post("/register", AdminController.admin.register);

/* Login */
router.post("/login", AdminController.admin.login);

/* Get triager */
router.post(
  "/triager",
  passport.authenticate("admin", { session: false }),
  AdminController.admin.addTriager
);

/* Get triager */
router.get(
  "/triager",
  passport.authenticate("admin", { session: false }),
  AdminController.admin.getTriager
);

/* Edit triager */
router.put(
  "/triager",
  passport.authenticate("admin", { session: false }),
  AdminController.admin.editTriager
);

// /* Delete triager */
// router.delete(
//   "/triager",
//   passport.authenticate("admin", { session: false }),
//   AdminController.admin.deleteTriager
// );

/*Company Users */
/* Get Users */
router.get(
  "/user",
  passport.authenticate("admin", { session: false }),
  AdminController.admin.getUsers
);

/*Company  */
/* Add User */
router.post(
  "/user",
  passport.authenticate("admin", { session: false }),
  AdminController.admin.addUser
);

module.exports = router;
