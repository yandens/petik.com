'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Booking, {
        foreignKey: 'booking_id',
        as: 'booking'
      })

      Payment.belongsTo(models.PaymentMethod, {
        foreignKey: 'payment_method_id',
        as: 'method'
      })
    }
  }
  Payment.init({
    booking_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
