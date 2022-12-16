const { Booking } = require("../../models");

const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({ where: { id } });
    if (!booking) {
      return res.status(400).json({
        status: false,
        message: "Booking not found!",
        data: null,
      });
    }

    if (booking.status == "paid") {
      return res.status(400).json({
        status: false,
        message: "You cannot cancel a booking that has already been paid for",
        data: null,
      });
    }

    const cancel = await Booking.update(
      { status: "cancel" },
      { where: { id: booking.id } }
    );
    return res.status(200).json({
      status: true,
      message: "Successful cancellation!",
      data: cancel,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = cancelBooking;
