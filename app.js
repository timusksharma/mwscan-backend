const express = require("express");
require("./middleware/auth");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./routes/index");
const app = express();
const { sequelize } = require("./models");

const PORT = process.env.PORT;
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

sequelize
  .authenticate()
  .then((res) => {
    console.log("Successfully established connection to database");
  })
  .catch((err) => {
    console.log("[ERROR]", err);
  });
