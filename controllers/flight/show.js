const { Flight } = require("../../models");

const showFlight = async (req, res, next) => {
  try {
    const allFlight = await Flight.findAll();

    if (allFlight <= 0) {
      return res.status(400).json({
        status: false,
        message: "No Flight",
      });
    }

    const result = []
    for (const flight of allFlight) {
      const departureDate = flight.departure.split('T')[0]
      const departureTime = flight.departure.split('T')[1].split('.')[0]
      const arrivalDate = flight.arrival.split('T')[0]
      const arrivalTime = flight.arrival.split('T')[1].split('.')[0]
      const showFlight = {
        airline: flight.airline,
        origin: flight.origin,
        destination: flight.destination,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
      }

      result.push(showFlight)
    }
    return res.status(200).json({
      status: true,
      message: "Success Get All Data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFlight;
