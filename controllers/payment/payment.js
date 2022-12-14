const {
  Booking,
  BookingDetails,
  Payment,
  PaymentMethod,
  Ticket,
} = require("../../models");

const payment = async (req, res, next) => {
  try {
    const { paymentMethod, grandTotal, seatNumber } = req.body;
    const { booking_id, ticketClass } = req.params;

    const book = await Booking.findOne({ where: { id: booking_id } });

    if (book.status != "pending") {
      return res.status(400).json({
        status: false,
        message: "You can't pay paid booking or canceled booking!",
        data: null,
      });
    }

    const bookingSeat = await BookingDetails.findAll({ where: { booking_id } });
    if (seatNumber.length != bookingSeat.length) {
      return res.status(400).json({
        status: false,
        message: "Input insufficient with number of passenger",
        data: null,
      });
    }

    const result = seatNumber.every((element) => {
      if (element === seatNumber[0]) {
        return true;
      }
    });
    if (result) {
      return res.status(400).json({
        status: false,
        message: "Can't input same Seat Number",
        data: null,
      });
    }

    const payMethod = await PaymentMethod.findOne({
      where: { method: paymentMethod },
    });

    const payment = await Payment.create({
      booking_id,
      payment_method_id: payMethod.id,
      total_price: grandTotal,
      date: new Date(),
    });

    await Booking.update({ status: "paid" }, { where: { id: booking_id } });

    const bookingDetails = await BookingDetails.findAll({
      where: { booking_id },
    });

    let i = 0;
    for (const details of bookingDetails) {
      await Ticket.create({
        booking_details_id: details.id,
        seatNumber: seatNumber[i],
        class: ticketClass,
      });
      i++;
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
