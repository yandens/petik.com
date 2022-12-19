const { Booking, BookingDetails, Payment, PaymentMethod, Ticket } = require("../../models");

const payment = async (req, res, next) => {
  try {
    const { booking_id, ticketClass, paymentMethod, grandTotal, seatNumber } = req.body;

    const book = await Booking.findOne({ where: { id: booking_id } });
    if (book.status !== "pending") {
      return res.status(400).json({
        status: false,
        message: "You can't pay paid booking or canceled booking!",
        data: null,
      });
    }

    const bookingSeat = await BookingDetails.findAll({ where: { booking_id } });
    if (seatNumber.length !== bookingSeat.length) {
      return res.status(400).json({
        status: false,
        message: "Input insufficient with number of passenger",
        data: null,
      });
    }

    const result = seatNumber.filter((item, index) => seatNumber.indexOf(item) !== index);

    if (result.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Can't input same Seat Number",
        data: null,
      });
    }

    const seatData = await BookingDetails.findAll({
      where: { flight_id: bookingSeat[0].flight_id },
      include: [
        {
          model: Ticket,
          as: "ticket",
        },
        {
          model: Booking,
          as: "booking",
          where: { status: "paid" },
        },
      ],
    });

    const listSeat = [];
    for (const seat of seatData) listSeat.push(seat.ticket.seatNumber);

    const sameSeat = [];
    for (const seat of listSeat) {
      if (seatNumber.includes(seat)) sameSeat.push(seat);
    }

    if (sameSeat.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Seats are reserved!",
        data: null,
      });
    }

    const payMethod = await PaymentMethod.findOne({ where: { method: paymentMethod } });
    const payment = await Payment.create({
      booking_id,
      payment_method_id: payMethod.id,
      total_price: grandTotal,
      date: new Date(),
    });

    const updateBooking = await Booking.update({ status: "paid" }, { where: { id: booking_id } });
    const bookingDetails = await BookingDetails.findAll({
      where: { booking_id },
    });

    let i = 0;
    for (const details of bookingDetails) {
      var createTicket = await Ticket.create({
        booking_details_id: details.id,
        seatNumber: seatNumber[i],
        class: ticketClass,
      });
      i++;
    }

    if (updateBooking && createTicket && payment) {
      await Notification.create({
        user_id: user.id,
        title: "Payment",
        message:
          "Your payment has been confirmed!. Please make sure you check your Email for further detail",
        isRead: false,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
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
