const { Flight, sequelize } = require("../../models");
const { Op } = require("sequelize");

const showFilter = async (req, res, next) => {
  try {
    const { origin, destination, date } = req.body;

    const filterSearch = await Flight.findAll({
      where: {
        [Op.and]: [
          { origin },
          { destination },
          sequelize.where(sequelize.fn('date', sequelize.col('departure')), '=', date)
        ],
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
        airlineLogo: flightSearch.airline_logo,
        origin: flightSearch.origin,
        originCity: flightSearch.origin_city,
        destination: flightSearch.destination,
        destinationCity: flightSearch.destination_city,
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
