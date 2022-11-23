const { User, Role } = require("../../models");
const googleOauth2 = require("../../utils/oauth/google");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const google = async (req, res, next) => {
  try {
    const code = req.query.code;

    if (!code) {
      const url = googleOauth2.generateAuthURL();
      return res.redirect(url);
    }

    await googleOauth2.setCredentials(code);

    const { data } = await googleOauth2.getUserData();

    let user = await User.findOne({
      where: { email: data.email },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (user && user.user_type != "GOOGLE") {
      return res.status(400).json({
        status: false,
        message: "Your account is already used",
        data: null,
      });
    }

    const userRole = await Role.findOne({ where: { role: "BUYER" } });

    let payload;
    if (!user) {
      user = await User.create({
        email: data.email,
        password: null,
        role_id: userRole.id,
        status: true,
        user_type: "GOOGLE",
      });
      const role = await Role.findOne({ where: { id: user.role_id } });
      payload = {
        id: user.id,
        email: user.email,
        role: role.role,
      };
    } else {
      payload = {
        id: user.id,
        email: user.email,
        role: user.role.role,
      };
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({
      status: true,
      message: "Success",
      data: {
        user_id: user.id,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = google;
