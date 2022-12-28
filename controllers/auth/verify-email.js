const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, FE_LINK } = process.env;

const verify = async (req, res, next) => {
  try {
    const { token } = req.query;

    const validUser = jwt.verify(token, JWT_SECRET_KEY);
    if (!validUser) {
      /*return res.status(401).json({
        status: false,
        message: "Invalid token!",
      });*/
      return res.redirect(`${FE_LINK}/auth/verify/failed`)
    }

    const updateStatus = await User.update(
      { status: true },
      { where: { email: validUser.email } }
    );

    /*return res.status(200).json({
      status: true,
      message: "Email Verified!",
      data: updateStatus,
    });*/
    return res.redirect(`${FE_LINK}/auth/verify/success`)
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
