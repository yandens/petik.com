const { User } = require("../../models");

const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.findAll({ where: { isActive: true } });

    if (!allUser) {
      return res.status(204).json({
        status: true,
        message: "Empty data",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Success get all users",
      data: allUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUser;
