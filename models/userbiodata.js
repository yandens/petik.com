"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBiodata.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  UserBiodata.init(
    {
      user_id: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.TEXT,
      nationality: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "UserBiodata",
    }
  );
  return UserBiodata;
};
