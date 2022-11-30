const { User } = require("../../models");

const deleteAccount = async (req, res, next) => {
  try {
    const user = req.user;
    const deleted = await User.update(
      { isActive: false, status: false },
      { where: { id: user.id } }
    );

    return res.status(200).json({
      status: true,
      message: "User Deleted!",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteAccount;
