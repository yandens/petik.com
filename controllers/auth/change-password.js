const { User } = require("../../models");
const bcrypt = require("bcrypt");

const changePassword = async (req, res, next) => {
  const user = req.user;

  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (newPassword != confirmNewPassword) {
    return res.status(400).json({
      status: false,
      message: "Password Does't Match",
      data: null,
    });
  }

  const passwordUpdated = await User.update(
    { password: newPassword },
    { where: { id: user.id } }
  );
};

module.exports = { changePassword };
