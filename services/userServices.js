const { user } = require("../models");

/**
 * Get Users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUsers = async (userObject) => {
  try {
    const result = await user.findAll({
      where: userObject.where,
      attributes: userObject.where,
      include: userObject.include,
      limit: userObject.limit,
      offset: (userObject.pageNo - 1) * userObject.limit,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

//Need To SET ATTRIBUTES
const getUsersByCondition = async (userObject) => {
  try {
    const result = await user.findAll({
      attributes: userObject.attributes,
      where: userObject.where,
      include: userObject.include,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Edit User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const editUsers = async (userObject) => {
  try {
    const result = await user.findOne({
      where: {
        uuid: userObject.uuid,
      },
    });

    if (!result) {
      return { message: "user not found" };
    } else {
      result.update(userObject.userEditData); //{status:deactivated}
      return { message: "User updated successfully" };
    }
  } catch (error) {
    throw error;
  }
};

//users
exports.userServices = {
  getUsers: getUsers,
  editUsers: editUsers,
  getUsersByCondition: getUsersByCondition,
};
