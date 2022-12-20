const { Flight } = require("../../models");

const deleteFlight = async () => {
  try {
    await Flight.destroy({ truncate: true, restartIdentity: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteFlightAdmin = async (req, res, next) => {
  try {
    const { flight_id } = req.params;

    const deleted = await Flight.destroy({
      where: { id: flight_id },
    });

    return res.status(200).json({
      status: true,
      message: "Success Delete Flight!",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteFlight, deleteFlightAdmin };
