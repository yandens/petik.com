const { Flight, Airlines } = require("../../models");

const createFlight = async (req, res, next) => {
  try {
    const { id_airlines, departure, destination, date, time } = req.body;

    if (!id_airlines || !departure || !destination || !date || !time) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the form",
      });
    }
    const created = await Flight.create({
      id_airlines,
      departure,
      destination,
      date,
      time,
    });

    return res.status(201).json({
      status: true,
      message: "Flight Created",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createFlight;
