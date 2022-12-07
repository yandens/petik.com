const {Flight, Airlines} = require('../../models');

const deleteFlight = async  (req, res, next) => {
    try {
        const airlines = req.airlines;
        const deleted = await Flight.update(
            { id_airlines },
            { departure },
            { destination },
            { date },
            { time },
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