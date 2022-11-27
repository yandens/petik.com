const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const verify = async (req, res, next) => {
  try {
    const { token } = req.query;

    const validUser = jwt.verify(token, JWT_SECRET_KEY);
    if (!validUser) {
      return res.status(401).json({
        status: false,
        message: "Invalid token!",
      });
    }

    const updateStatus = await User.update(
      { status: true },
      { where: { email: validUser.email } }
    );

    return res.status(200).json({
      status: true,
      message: "Email Verified!",
      data: updateStatus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
