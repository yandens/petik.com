const { Flight } = require("../../models");
const { Op } = require("sequelize");

const showFilter = async (req, res, next) => {
  try {
    const { origin, destination } = req.body;

    const filterSearch = await Flight.findAll({
      where: {
        [Op.and]: [{ origin }, { destination }],
      },
    });

    if (filterSearch <= 0) {
      return res.status(400).json({
        status: false,
        message: "Empty Flight",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Success Get Data",
      data: filterSearch,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFilter;
