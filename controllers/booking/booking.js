const { User, UserBiodata, Flight, Booking, BookingDetails, Notification } = require("../../models");
const sendEmail = require("../../utils/mailer/sendEmail");
const templateHtml = require("../../utils/mailer/templateHtml");

const sendingEmail = async (email, date, total, booking_id, flight_id) => {
  const userExist = await User.findOne({
    where: { email: email },
    include: [
      {
        model: UserBiodata,
        as: "biodata",
      },
    ],
  });

  const flightExist = await Flight.findOne({ where: { id: flight_id } });
  const htmlEmail = await templateHtml("booking-email.ejs", {
    firstName: userExist.biodata.firstName,
    lastName: userExist.biodata.lastName,
    origin: flightExist.origin,
    destination: flightExist.destination,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    dateLimit: new Date(date.setDate(date.getDate() + 1)).toLocaleDateString(),
    timeLimit: new Date(date.setDate(date.getDate() + 1)).toLocaleTimeString(),
    phoneNumber: userExist.biodata.phoneNumber,
    total,
    booking_id,
  });

  await sendEmail(email, "Flight Booked", htmlEmail);
};

const createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const { flight_id, body, ticketClass } = req.body;

    const bio = await UserBiodata.findOne({ where: { user_id: user.id } })
    if (!bio) {
      return res.status(400).json({
        status: false,
        message: 'You need to fill your biodata first!',
        data: null
      })
    }

    const booking = await Booking.create({
      user_id: user.id,
      status: "pending",
      date: new Date(),
    });

    body.forEach(async (data) => {
      await BookingDetails.create({
        booking_id: booking.id,
        flight_id: flight_id,
        passangerName: data.passangerName,
        NIK: data.NIK,
        passport: data.passport,
      });
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

    if (booking) {
      await Notification.create({
        user_id: user.id,
        title: "Booking",
        message:
          "You've booked some flight and please pay it before the due time. For further information please check your Email!",
        isRead: false,
        date: new Date(),
      });

      sendingEmail(user.email, booking.date, totalPrice * body.length, booking.id, flight_id)
    }

    return res.status(201).json({
      status: true,
      message: "Booking Created!",
      data: {
        booking: booking,
        total: totalPrice,
        grandTotal: totalPrice * body.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createBooking;
