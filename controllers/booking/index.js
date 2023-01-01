const booking = require("./booking");
const getAllBooking = require("./getAllBooking");
const cancelBooking = require("./cancelBooking");
const getTotalBooking = require('./getTotalBooking')
const listSeat = require('./dataSeat')

module.exports = {
  booking,
  cancelBooking,
  getAllBooking,
  getTotalBooking,
  listSeat
};
