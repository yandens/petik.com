const { Booking, Notification } = require("../../models");

const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
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

    if (cancel) {
      await Notification.create({
        user_id: user.id,
        title: "Cancel Booking",
        message:
          "You've canceled your booking. Please check email for further information",
        isRead: false,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }

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
