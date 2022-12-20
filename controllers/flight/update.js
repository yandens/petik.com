const { Flight } = require("../../models");

const updateFlight = async (req, res, next) => {
  try {
    const { flight_id } = req.params;
    const { airline, origin, destination, departure, arrival, logo } = req.body;
    const updated = await Flight.update(
      { airline, origin, destination, departure, arrival, airline_logo: logo },
      { where: { id: flight_id } }
    );

    return res.status(200).json({
      status: true,
      message: "Data Updated!",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFlight;
