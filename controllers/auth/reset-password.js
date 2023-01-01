const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const Validator = require("fastest-validator");
const v = new Validator()

const resetPassword = async (req, res, next) => {
  try {
    const { newPass, confirmNewPass } = req.body;
    const { token } = req.query;
    const schema = {
      newPass: { type: "string", min: 6 },
      confirmNewPass: { type: "string", min: 6 },
    };
    const check = await v.compile(schema);
    const validate = check({ newPass: `${newPass}`, confirmNewPass: `${confirmNewPass}` });

    if (validate.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Password at least 6 characters!",
        data: null,
      });
    }

    const validUser = jwt.verify(token, JWT_SECRET_KEY);

    if (!validUser) {
      return res.status(401).json({
        status: false,
        message: "Invalid token!",
      });
    }

    const findUser = await User.findOne({ where: { id: validUser.id } });

    if (newPass !== confirmNewPass) {
      return res.status(400).json({
        status: false,
        message: "Password not match!",
      });
    }

    const encryptedPass = await bcrypt.hash(newPass, 10);

    await User.update(
      { password: encryptedPass },
      { where: { id: findUser.id } }
    );

    return res.status(200).json({
      status: true,
      message: "success change password",
      data: {
        id: findUser.id,
        email: findUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = resetPassword;
