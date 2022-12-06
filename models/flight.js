"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Flight.belongsTo(models.Airlines, {
        foreignKey: "id_airlines",
        as: "airlines",
      });
    }
  }
  Flight.init(
    {
      id_airlines: DataTypes.INTEGER,
      departure: DataTypes.STRING,
      destination: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
