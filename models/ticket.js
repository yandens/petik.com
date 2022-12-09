'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.BookingDetails, {
        foreignKey: 'booking_details_id',
        as: 'details'
      })

      Ticket.belongsTo(models.ClassType, {
        foreignKey: 'class_type_id',
        as: 'type'
      })
    }
  }
  Ticket.init({
    class_type_id: DataTypes.INTEGER,
    booking_details_id: DataTypes.INTEGER,
    seatNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
