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
      /*Flight.belongsTo(models.Airlines, {
        foreignKey: "id_airlines",
        as: "airlines",
      });*/

      Flight.hasMany(models.BookingDetails, {
        foreignKey: 'flight_id',
        as: 'details'
      })
    }
  }
  Flight.init(
    {
      airline: DataTypes.STRING,
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      departure: DataTypes.DATE,
      arrival: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
