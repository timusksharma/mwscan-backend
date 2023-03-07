"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class triager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  triager.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_no: {
        type: DataTypes.STRING,
      },
      remember_token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "triagers",
      modelName: "triager",
    }
  );
  return triager;
};
