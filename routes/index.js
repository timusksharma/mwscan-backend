var express = require("express");
var router = express.Router();

const AdminRouter = require("./admin");
const UserRouter = require("./user");

router.use("/admin", AdminRouter);
router.use("/user", UserRouter);

module.exports = router;
