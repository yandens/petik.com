const { Flight } = require("../../models");

const updateFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      id_airlines,
      origin,
      destination,
      date,
      departureTime,
      arrivalTime,
    } = req.body;

    const update = await Flight.update(
      {
        id_airlines,
        origin,
        destination,
        date,
        departureTime,
        arrivalTime,
      },
      { where: { id } }
    );

    return res.status(200).json({
      status: true,
      message: "Flight Updated",
      data: update,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFlight;
