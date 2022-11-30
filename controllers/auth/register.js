const { User, Role } = require("../../models");
const sendEmail = require("../../utils/mailer/sendEmail");
const templateHtml = require("../../utils/mailer/templateHtml");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require("sequelize");
const { JWT_SECRET_KEY } = process.env;

const sendingEmail = async (email) => {
  const payload = {
    email: email,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "900s" });
  const link = `http://localhost:3000/auth/verify?token=${token}`;
  const htmlEmail = await templateHtml("verify-email.ejs", {
    email: email,
    link: link,
  });
  await sendEmail(email, "Verification Email", htmlEmail);
};

const register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      confirm_password,
      status = false,
      isActive = true,
    } = req.body;

    const schema = {
      username: { type: "string" },
      email: { type: "email", label: "Email Address" },
      password: { type: "string", min: 6 },
    };
    const check = await v.compile(schema);

    const validate = check({
      username: `${username}`,
      email: `${email}`,
      password: `${password}`,
    });

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
    const userExist = await User.findOne({
      where: { [Op.or]: [{ email: email }, { username: username }] },
    });

    if (userExist) {
      if (userExist.isActive == false) {
        await User.update({ isActive: true }, { where: { id: userExist.id } });

        sendingEmail(userExist.email);
        return res.status(201).json({
          status: true,
          message: "Register Success!",
          data: {
            email: userExist.email,
          },
        });
      }

      return res.status(400).json({
        status: false,
        message: "Email / username already used!",
        data: null,
      });
    }

    // get user role
    const userRole = await Role.findOne({ where: { role: "BUYER" } });

    // hash password
    const passwordHashed = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      username,
      email,
      password: passwordHashed,
      role_id: userRole.id,
      user_type: "BASIC",
      status,
      isActive,
    });

    sendingEmail(newUser.email);
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
