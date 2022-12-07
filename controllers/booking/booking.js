const { Booking } = require("../../models");

const createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const { user_id, status, date } = req.body;

    const create = await Booking.create({
      user_id: user.id,
      status: true,
      date: new Date(),
    });
  } catch (error) {
    next(error);
  }
};
