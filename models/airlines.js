"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airlines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Airlines.hasMany(models.Flight, {
        foreignKey: "id_airlines",
        as: "flight",
      });
    }
  }
  Airlines.init(
    {
      airlines: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Airlines",
    }
  );
  return Airlines;
};
