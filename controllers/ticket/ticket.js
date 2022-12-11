const { Booking, BookingDetails, Flight, Ticket } = require("../../models");
const generateQRCode = require("../../utils/media/generateQrCode");
const imagekit = require("../../utils/media/imageKit");
// const { Op } = require("sequelize");

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
    const user = req.user;
    const { id } = req.params;

    const getTickets = await Booking.findOne(
      {
        where: { id },
      },
      {
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
      }
    );

    const payload = {
      id: getTickets.details.booking_id,
      name: getTickets.details.passangerName,
      airline: getTickets.details.flight.airline,
      from: getTickets.details.flight.origin,
      to: getTickets.details.flight.destination,
      date: getTickets.details.flight.departure.toDateString(),
      boarding_time: getTickets.details.flight.departure.toLocaleTimeString(),
      class: getTickets.details.ticket.class,
    };

    const qrCode = generateQRCode(JSON.stringify(payload));
    const uploadQR = await uploadQRCode(qrCode.toString("base64"));

    return res.status(200).json({
      status: true,
      message: "Success",
      data: {
        id: getTickets.details.booking_id,
        name: getTickets.details.passangerName,
        airline: getTickets.details.flight.airline,
        from: getTickets.details.flight.origin,
        to: getTickets.details.flight.destination,
        date: getTickets.details.flight.departure.toDateString(),
        boarding_time: getTickets.details.flight.departure.toLocaleTimeString(),
        class: getTickets.details.ticket.class,
        qr_code: uploadQR.url,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = printTicket;
