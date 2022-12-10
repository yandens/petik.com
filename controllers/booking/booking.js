const { Booking, BookingDetails } = require("../../models");

const createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const { flight_id } = req.params;
    const { passangerName, NIK, passport, ticketClass } = req.body;

    const booking = await Booking.create({
      user_id: user.id,
      status: "pending",
      date: new Date(),
    });

    const bookingDetails = await BookingDetails.create({
      booking_id: booking.id,
      flight_id,
      passangerName,
      NIK,
      passport,
    });

    let totalPrice, different;
    if (ticketClass == "economy") {
      different = 321.37 - 64.27;
      totalPrice = Math.floor(Math.random() * different + 64.27);
    } else if (ticketClass == "business") {
      different = 642.74 - 321.37;
      totalPrice = Math.floor(Math.random() * different + 321.37);
    } else {
      different = 1606.84 - 642.74;
      totalPrice = Math.floor(Math.random() * different + 642.74);
    }

    return res.status(201).json({
      status: true,
      message: "Booking Created!",
      data: {
        booking: booking,
        booking_details: bookingDetails,
        total_price: totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createBooking;
