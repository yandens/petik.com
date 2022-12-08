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

    const result = [];
    for (const flight of allFlight) {
      const departureDate = flight.departure.toDateString();
      const departureTime = flight.departure.toLocaleTimeString();
      const arrivalDate = flight.arrival.toDateString();
      const arrivalTime = flight.arrival.toLocaleTimeString();
      const showFlight = {
        id: flight.id,
        airline: flight.airline,
        origin: flight.origin,
        destination: flight.destination,
        departure: flight.departure,
        departureDate,
        departureTime,
        arrival: flight.arrival,
        arrivalDate: arrivalDate,
        arrivalTime,
      };

      result.push(showFlight);
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
