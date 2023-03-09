const jwt = require("jsonwebtoken");

const { admin } = require("../models");
const { user } = require("../models");
const { triager } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { userServices } = require("../services/userServices");

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

/*Users  --START----------------------------------------------------------*/
const getUsers = async (req, res, next) => {
  try {
    let pageNo = 1;
    let limit = 10;

    if (req.query.hasOwnProperty("pg")) {
      pageNo = parseInt(req.query.pg);
    }
    const result = await userServices.getUsers({
      where: {},
      pageNo: pageNo,
      limit: limit,
    });
    res.json({
      users: result,
      // currentPage: pageNo,
      // lastPage: Math.ceil(result.count / limit),
    });
  } catch (error) {
    res.json(error);
  }
};

/**Users --END----------------------------------------------------------*/

/**
 * Add User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addUser = async (req, res, next) => {
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
 * Add Triager
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addTriager = async (req, res, next) => {
  try {
    const { full_name, email, password, phone_no } = req.body;
    const result = await triager.findOrCreate({
      where: { email: email },
      defaults: {
        full_name: full_name,
        email: email,
        password: password,
        phone_no: phone_no,
      },
    });
    if (result[1] == false) {
      throw new Error("Email Already Exist for triager.");
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

/**
 * get Triagers
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getTriager = async (req, res, next) => {
  try {
    let pageNo = 1;
    let limit = 10;

    if (req.query.hasOwnProperty("pg")) {
      pageNo = parseInt(req.query.pg);
    }

    const result = await triager.findAll({
      where: {},
      limit: limit,
      offset: (pageNo - 1) * limit,
    });
    res.json({
      triagers: result,
      // currentPage: pageNo,
      // lastPage: Math.ceil(result.count / limit),
    });
  } catch (error) {
    res.json(error);
  }
};

/**
 * edit Triagers
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const editTriager = async (req, res, next) => {
  try {
    let { id, triagerEditObject } = req.body;
    const result = await triager.findOne({
      where: {
        uuid: id,
      },
    });

    if (!result) {
      res.json({ message: "Triager not found" });
    } else {
      await result.update(triagerEditObject);
      res.send({ message: "Triager updated successfully" });
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Add Company
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addCompany = async (req, res, next) => {
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

exports.admin = {
  register: register,
  login: login,
  getUsers: getUsers,
  addTriager: addTriager,
  getTriager: getTriager,
  editTriager: editTriager,
  addUser: addUser,
};
