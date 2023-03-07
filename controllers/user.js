const jwt = require("jsonwebtoken");

const { user } = require("../models");

/**
 * Register
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, phone_no } = req.body;
    const result = await user.findOrCreate({
      where: { email: email },
      defaults: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        phone_no: phone_no,
      },
    });
    if (result[1] == false) {
      throw new Error("Email Already Exist");
    }
    res.json(result);
  } catch (error) {
    res.json(error);
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
    const result = await user.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (!result) {
      res.status(401).json({
        message: "Invalid email or password",
      });
    } else {
      const token = jwt.sign(
        { id: result.id, uuid: result.uuid, role: "user" },
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

exports.user = {
  register: register,
  login: login,
};
