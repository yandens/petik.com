const { User, Role } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require("sequelize");

const login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    const schema = {
      emailOrUsername: { type: "string" },
    };
    const check = await v.compile(schema);

    const validate = check({ emailOrUsername: `${emailOrUsername}` });

    if (validate.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Email not valid!",
        data: null,
      });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Wrong email or password!",
        data: null,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        status: false,
        message: "Wrong email or password!",
        data: null,
      });
    }

    if (user.status == false) {
      return res.status(400).json({
        status: false,
        message: "Email not verifed!",
      });
    }

    if (user.user_type != "BASIC") {
      return res.status(400).json({
        status: false,
        message:
          "Your account is associated with Google, Please login using that!",
        data: null,
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.role,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({
      status: true,
      message: "login success!",
      data: {
        emailOrUsername,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
