const { User } = require("../../models");
const { Role } = require("../../models");
const sendEmail = require("../../utils/mailer/sendEmail");
const templateHtml = require("../../utils/mailer/templateHtml");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password, confirm_password, status = false } = req.body;
    console.log(email);
    console.log(password);
    console.log(confirm_password);
    // check password
    if (password != confirm_password) {
      return res.status(400).json({
        status: false,
        message: "Password doesn't match!",
        data: null,
      });
    }

    // check user exist
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "Email already used!",
        data: null,
      });
    }

    // get user role
    const userRole = await Role.findOne({ where: { role: "BUYER" } });

    // hash password
    const passwordHashed = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      email,
      password: passwordHashed,
      role_id: userRole.id,
      status,
    });

    const payload = {
      email: newUser.email,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "900s" });
    const link = `http://localhost:3000/auth/verify?token=${token}`;
    const htmlEmail = await templateHtml("verify-email.ejs", {
      email: newUser.email,
      link: link,
    });
    await sendEmail(newUser.email, "Verification Email", htmlEmail);

    return res.status(201).json({
      status: true,
      message: "Register Success!",
      data: {
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
