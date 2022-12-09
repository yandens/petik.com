const { Booking, BookingDetails, Flight, Ticket } = require("../../models")
const { Op } = require('sequelize')

const printTicket = async (req, res, next) => {
  try {
    const user = req.user

  } catch (err) {
    next(err)
  }
}
