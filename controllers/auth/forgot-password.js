const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const Validator = require('fastest-validator')
const { JWT_SECRET_KEY, FE_LINK } = process.env;
const sendEmail = require("../../utils/mailer/sendEmail");
const templateHtml = require("../../utils/mailer/templateHtml");
const v = new Validator()

const sendingEmail = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "900s" });
  const link = `${FE_LINK}/auth/resetpassword?token=${token}`;
  const htmlEmail = await templateHtml("forgot-password.ejs", {
    email: user.email,
    link: link,
  });
  await sendEmail(user.email, "Reset Password", htmlEmail);
}

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

    sendingEmail(findUser)
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
