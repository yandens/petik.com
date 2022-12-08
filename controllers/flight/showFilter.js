const { Flight } = require("../../models");
const { Op } = require("sequelize");

const showFilter = async (req, res, next) => {
  try {
    const { origin, destination } = req.body;

    const filterSearch = await Flight.findAll({
      where: {
        [Op.and]: [{ origin }, { destination }],
      },
    });

    if (filterSearch <= 0) {
      return res.status(400).json({
        status: false,
        message: "Empty Flight",
        data: null,
      });
    }

    const result = [];
    for (const flightSearch of filterSearch) {
      const departureDate = flightSearch.departure.toDateString();
      const departureTime = flightSearch.departure.toLocaleTimeString();
      const arrivalDate = flightSearch.arrival.toDateString();
      const arrivalTime = flightSearch.arrival.toLocaleTimeString();
      const showFlight = {
        id: flightSearch.id,
        airline: flightSearch.airline,
        origin: flightSearch.origin,
        destination: flightSearch.destination,
        departure: flightSearch.departure,
        departureDate,
        departureTime,
        arrival: flightSearch.arrival,
        arrivalDate: arrivalDate,
        arrivalTime,
      };

      result.push(showFlight);
    }

    return res.status(200).json({
      status: true,
      message: "Success Get Data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFilter;
