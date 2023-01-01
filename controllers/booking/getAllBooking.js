const { Booking } = require("../../models");

const getAllBooking = async (req, res, next) => {
  try {
    const user = req.user;

    const bookings = await Booking.findAll({ where: { user_id: user.id } });

    return res.status(200).json({
      status: true,
      message: "Success Get Data",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBooking;
