"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone_no: {
        type: DataTypes.STRING,
      },
      remember_token: {
        type: DataTypes.STRING,
      },
      company_name: {
        type: DataTypes.INTEGER,
      },
      verification_token: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "users",
      modelName: "user",
    }
  );
  return User;
};
