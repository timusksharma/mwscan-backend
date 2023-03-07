const jwt = require("jsonwebtoken");

const { admin } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

/**
 * Register
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const register = async (req, res, next) => {
  try {
    const { full_name, email, password } = req.body;
    const result = await admin.findOrCreate({
      where: { email: email },
      defaults: {
        full_name: full_name,
        password: password,
      },
    });
    if (result[1] == false) {
      throw new Error("Email Already Exist");
    }
    res.json(result);
  } catch (error) {
    res.json(error.errors);
  }
};

/**
 * Login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await admin.findOne({
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
        { id: result.id, uuid: result.uuid, role: "admin" },
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

exports.admin = {
  register: register,
  login: login,
};
