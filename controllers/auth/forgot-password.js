const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const sendEmail = require("../../utils/mailer/sendEmail");
const templateHtml = require("../../utils/mailer/templateHtml");

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res.status(401).json({
        status: false,
        message: "Email not found",
      });
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "900s" });
    const link = `<p>http://localhost:3000/auth/reset-password?token=${token}</p>`;
    const htmlEmail = await templateHtml("forgot-password.ejs", {
      email: findUser.name,
      link: link,
    });
    const response = await sendEmail(findUser.email, "Reset Password", htmlEmail);

    return res.status(200).json({
      status: true,
      message: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = forgotPassword;
