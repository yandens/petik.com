const { Booking, BookingDetails, Flight, Ticket } = require("../../models");
const generateQRCode = require("../../utils/media/generateQrCode");
const imagekit = require("../../utils/media/imageKit");
// const { Op } = require("sequelize");

function subtractHours(numOfHours, date = new Date()) {
  date.setHours(date.getHours() - numOfHours);

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

    const payload = {
      id: getTickets.user_id,
      booking_id: getTickets.id,
      name: getTickets.details[0].passangerName,
      airline: getTickets.details[0].flight.airline,
      from: getTickets.details[0].flight.origin,
      to: getTickets.details[0].flight.destination,
      date: getTickets.details[0].flight.departure.toDateString(),
      departureTime:
        getTickets.details[0].flight.departure.toLocaleTimeString(),
      class: getTickets.details[0].ticket.class,
    };

    const qrCode = generateQRCode(JSON.stringify(payload));
    const uploadQR = await uploadQRCode(qrCode.toString("base64"));

    return res.status(200).json({
      status: true,
      message: "Success",
      data: {
        id: getTickets.user_id,
        booking_id: getTickets.id,
        name: getTickets.details[0].passangerName,
        airline: getTickets.details[0].flight.airline,
        from: getTickets.details[0].flight.origin,
        to: getTickets.details[0].flight.destination,
        date: getTickets.details[0].flight.departure.toDateString(),
        departureTime:
          getTickets.details[0].flight.departure.toLocaleTimeString(),
        class: getTickets.details[0].ticket.class,
        qr_code: uploadQR.url,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = printTicket;
