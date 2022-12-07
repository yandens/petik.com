const { Flight } = require('../../models');

const deleteFlight = async  (req, res, next) => {
    try {
        const { id } = req.body;
        const deleted = await Flight.destroy(
            { id_airlines,
              departure,
              arrival,
              departureTime,
              arrivalTime
            },
            { where: { id } }
        );

        return res.status(200).json({
            status: true,
            message: "Flight Deleted success",
            data: deleted,
        });
    } catch (err) {
        next(err);
    }
}
module.exports = deleteFlight;