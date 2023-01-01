const { Flight } = require("../../models");

const getFlightId = async (req, res, next) => {
  try {
    const { flight_id } = req.params;

    const getFlight = await Flight.findOne({ where: { id: flight_id } });

    return res.status(200).json({
      status: true,
      mesage: "Success Get Data",
      data: {
        airline: getFlight.airline,
        airlineLogo: getFlight.airline_logo,
        origin: getFlight.origin,
        originCity: getFlight.origin_city,
        destination: getFlight.destination,
        destinationCity: getFlight.destination_city,
        departure: getFlight.departure,
        arrival: getFlight.arrival,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getFlightId;
