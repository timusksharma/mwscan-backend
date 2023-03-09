var express = require("express");
var router = express.Router();

const AdminRouter = require("./admin");
const UserRouter = require("./user");
const TriagerRouter = require("./triager");
router.use("/admin", AdminRouter);
router.use("/user", UserRouter);
router.use("/triager", TriagerRouter);

module.exports = router;
