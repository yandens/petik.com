const { User } = require("../../models");
const bcrypt = require("bcrypt");

const changePassword = async (req, res, next) => {
  const user = req.user;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const existUser = await User.findOne({ where: { id: user.id } });

  if (newPassword != confirmNewPassword) {
    return res.status(400).json({
      status: false,
      message: "Password Does't Match",
      data: null,
    });
  }
  const correct = await bcrypt.compare(oldPassword, existUser.password);
  if (!correct) {
    return res.status(400).json({
      status: false,
      message: "Old Password Doesn't Match!",
      data: null,
    });
  }

  const passwordHashed = await bcrypt.hash(newPassword, 10);
  const passwordUpdated = await User.update(
    { password: passwordHashed },
    { where: { id: user.id } }
  );
  if (!passwordUpdated) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    message: "Password Updated!",
    data: passwordUpdated,
  });
};

module.exports = changePassword;
