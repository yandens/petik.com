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
      Ticket.hasOne(models.BookingDetails, {
        foreignKey: 'ticket_id',
        as: 'details'
      })

      Ticket.belongsTo(models.Flight, {
        foreignKey: 'flight_id',
        as: 'flight'
      })
    }
  }
  Ticket.init({
    flight_id: DataTypes.INTEGER,
    class: DataTypes.STRING,
    price: DataTypes.INTEGER,
    seatNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
