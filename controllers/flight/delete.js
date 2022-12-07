const { Flight } = require('../../models');

const deleteFlight = async  (req, res, next) => {
    try {
        const { id } = req.body;
        const deleted = await Flight.destroy({ where: { id } });

        return res.status(200).json({
            status: true,
            message: "Flight Deleted!",
            data: deleted,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = deleteFlight;
