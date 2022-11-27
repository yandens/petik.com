const { User } = require("../../models");
const { Role } = require("../../models");
const sendEmail = require("../../utils/mailer/sendEmail");
const templateHtml = require("../../utils/mailer/templateHtml");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
const v = new Validator();
const { JWT_SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password, confirm_password, status = false } = req.body;

    const schema = {
      email: { type: "email", label: "Email Address" },
      password: { type: "string", min: 6 },
    };
    const check = await v.compile(schema);

    const validate = check({ email: `${email}`, password: `${password}` });

    if (validate.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Email not valid / Password at least 6 characters",
        data: null,
      });
    }
    // return res.send("mantap");
    if (password != confirm_password) {
      // check password
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
      user_type: "BASIC",
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
