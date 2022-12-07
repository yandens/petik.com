const { BookingDetails } = require("../../models");

const sendEmail = () => {};

const createBookingDetail = async (req, res, next) => {
  try {
    const { booking_id, ticket_id, flight_id, passangerName, NIK, passport } =
      req.body;

    const create = await BookingDetails.create({
      booking_id,
      ticket_id,
      flight_id,
      passangerName,
      NIK,
      passport,
    });

    return res.status(200).json({
      status: true,
      message: "We have send booking details to your email",
      data: create,
    });
  } catch (error) {
    next(error);
  }
};
