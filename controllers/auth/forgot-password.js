const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const Validator = require('fastest-validator')
const { JWT_SECRET_KEY } = process.env;
const sendEmail = require("../../utils/mailer/sendEmail");
const templateHtml = require("../../utils/mailer/templateHtml");
const v = new Validator()

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const schema = {
      email: { type: "email", label: "Email Address" }
    };
    const check = await v.compile(schema);
    const validate = check({ email: `${email}` });

    if (validate.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Email not valid!",
        data: null,
      });
    }

    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res.status(400).json({
        status: false,
        message: "Email not found",
      });
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "900s" });
    const link = `https://petikcom-api-dev.km3ggwp.com/auth/reset-password?token=${token}`;
    const htmlEmail = await templateHtml("forgot-password.ejs", {
      email: findUser.email,
      link: link,
    });
    const response = await sendEmail(
      findUser.email,
      "Reset Password",
      htmlEmail
    );

    return res.status(200).json({
      status: true,
      message: "success send reset password link to email",
      data: findUser.email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = forgotPassword;
