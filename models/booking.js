'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasMany(models.BookingDetails, {
        foreignKey: 'booking_id',
        as: 'details'
      })

      Booking.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      Booking.hasOne(models.Payment, {
        foreignKey: 'booking_id',
        as: 'payment'
      })
    }
  }
  Booking.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
