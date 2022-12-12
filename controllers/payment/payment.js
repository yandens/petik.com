const {
  Booking,
  BookingDetails,
  Flight,
  Payment,
  PaymentMethod,
  Ticket,
} = require("../../models");
const { Op } = require("sequelize");

const payment = async (req, res, next) => {
  try {
    const user = req.user;
    const { paymentMethod, totalPrice } = req.body;
    const { booking_id, ticketClass } = req.params;

    const book = await Booking.findOne({ where: { id: booking_id } });

    if (book.status != "pending") {
      return res.status(400).json({
        status: false,
        message: "You can't pay paid booking or canceled booking!",
        data: null,
      });
    }

    const payMethod = await PaymentMethod.findOne({
      where: { method: paymentMethod },
    });

    const payment = await Payment.create({
      booking_id,
      payment_method_id: payMethod.id,
      total_price: totalPrice,
      date: new Date(),
    });

    await Booking.update({ status: "paid" }, { where: { id: booking_id } });
    const booking = await Booking.findOne({
      where: {
        [Op.and]: [{ user_id: user.id }, { status: "paid" }],
      },
    });
    const bookingDetails = await BookingDetails.findAll({
      where: { booking_id: booking.id },
    });

    for (const details of bookingDetails) {
      await Ticket.create({
        booking_details_id: details.id,
        seatNumber: null,
        class: ticketClass,
      });
    }

    return res.status(201).json({
      status: true,
      message: "Successful Payment",
      data: payment,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = payment;
