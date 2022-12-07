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

      Flight.hasMany(models.Ticket, {
        foreignKey: 'flight_id',
        as: 'ticket'
      })
    }
  }
  Flight.init(
    {
      id_airlines: DataTypes.INTEGER,
      departure: DataTypes.STRING,
      arrival: DataTypes.STRING,
      departureTime: DataTypes.DATE,
      arrivalTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
