const { Flight, Airlines } = require("../../models");
const { Op } = require("sequelize");

const createFlight = async (req, res, next) => {
  try {
    const {
      id_airlines,
      origin,
      destination,
      date,
      departureTime,
      arrivalTime,
    } = req.body;

    if (
      !id_airlines ||
      !origin ||
      !destination ||
      !date ||
      !departureTime ||
      !arrivalTime
    ) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the form",
      });
    }

    const flightExist = await Flight.findOne({
      where: {
        [Op.and]: [
          { id_airlines },
          { origin },
          { destination },
          { date },
          { departureTime },
          { arrivalTime },
        ],
      },
    });

    if (flightExist) {
      return res.status(400).json({
        status: false,
        message: "Flight Already Exist",
      });
    }

    const created = await Flight.create({
      id_airlines,
      origin,
      destination,
      date,
      departureTime,
      arrivalTime,
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
