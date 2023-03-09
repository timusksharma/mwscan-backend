const jwt = require("jsonwebtoken");

const { triager } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

/**
 * Login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await triager.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    console.log(result);
    if (!result) {
      res.status(401).json({
        message: "Invalid email or password",
      });
    } else {
      const token = jwt.sign(
        { id: result.id, uuid: result.uuid, role: "triager" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.json({
        token: token,
        uuid: result.uuid,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.triager = {
  login: login,
};
