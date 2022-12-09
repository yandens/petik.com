const { Booking, BookingDetails } = require("../../models");

const createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const { flight_id } = req.params;
    const { passangerName, NIK, passport, ticketClass } = req.body;

    const booking = await Booking.create({
      user_id: user.id,
      status: 'pending',
      date: new Date(),
    });

    const bookingDetails = await BookingDetails.create({
      booking_id: booking.id,
      flight_id,
      passangerName,
      NIK,
      passport
    })

    return res.status(201).json({
      status: true,
      message: 'Booking Created!',
      data: { booking, bookingDetails }
    })
  } catch (error) {
    next(error);
  }
};

module.exports = createBooking
