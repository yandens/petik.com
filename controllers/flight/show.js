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

    return res.status(200).json({
      status: true,
      message: "Success Get All Data",
      data: allFlight,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFlight;
