const { User } = require("../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

const changePassword = async (req, res, next) => {
  const user = req.user;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const schema = {
    oldPassword: { type: "string", min: 6 },
    newPassword: { type: "string", min: 6 },
    confirmNewPassword: { type: "string", min: 6 }
  };
  const check = await v.compile(schema);
  const validate = check({ oldPassword: `${oldPassword}`, newPassword: `${newPassword}`, confirmNewPassword: `${confirmNewPassword}` });

  if (validate.length > 0) {
    return res.status(400).json({
      status: false,
      message: "Password at least 6 characters",
      data: null,
    });
  }

  const existUser = await User.findOne({ where: { id: user.id } });

  if (newPassword != confirmNewPassword) {
    return res.status(400).json({
      status: false,
      message: "Password Doesn't Match",
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
