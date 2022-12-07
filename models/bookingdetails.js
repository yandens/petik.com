'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingDetails.init({
    booking_id: DataTypes.INTEGER,
    ticket_id: DataTypes.INTEGER,
    passangerName: DataTypes.STRING,
    NIK: DataTypes.STRING,
    passport: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookingDetails',
  });
  return BookingDetails;
};