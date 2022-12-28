const { Booking, BookingDetails, Flight, Ticket } = require("../../models");
const generateQRCode = require("../../utils/media/generateQrCode");
const imagekit = require("../../utils/media/imageKit");

function subtractHours(date, hours) {
  date.setHours(date.getHours() - hours);

  return date;
}

const uploadQRCode = async (file) => {
  try {
    const uploadedFile = await imagekit.upload({
      file,
      fileName: `qrCode`,
    });
    const data = {
      title: uploadedFile.name,
      url: uploadedFile.url,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

const printTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getTickets = await Booking.findOne({
      where: { id },
      include: [
        {
          model: BookingDetails,
          as: "details",
          include: [
            {
              model: Flight,
              as: "flight",
            },
            {
              model: Ticket,
              as: "ticket",
            },
          ],
        },
      ],
    });

    const data = [];
    for (const ticket of getTickets.details) {
      const departureTime = ticket.flight.departure;
      const payload = {
        id: getTickets.user_id,
        booking_id: getTickets.id,
        name: ticket.passangerName,
        airline: ticket.flight.airline,
        airlineLogo: ticket.flight.airline_logo,
        from: ticket.flight.origin,
        to: ticket.flight.destination,
        date: ticket.flight.departure.toDateString(),
        departureTime: ticket.flight.departure.toLocaleTimeString(),
        seatNumber: ticket.ticket.seatNumber,
        class: ticket.ticket.class,
      };

      const qrCode = generateQRCode(JSON.stringify(payload));
      const uploadQR = await uploadQRCode(qrCode.toString("base64"));

      const dataResponse = {
        id: getTickets.user_id,
        booking_id: getTickets.id,
        name: ticket.passangerName,
        airline: ticket.flight.airline,
        airlineLogo: ticket.flight.airline_logo,
        from: ticket.flight.origin,
        to: ticket.flight.destination,
        date: ticket.flight.departure.toDateString(),
        departureTime: departureTime.toLocaleTimeString(),
        boardingTime: subtractHours(departureTime, 1).toLocaleTimeString(),
        seatNumber: ticket.ticket.seatNumber,
        class: ticket.ticket.class,
        qr_code: uploadQR.url,
      };

      data.push(dataResponse);
    }

    return res.status(200).json({
      status: true,
      message: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = printTicket;
