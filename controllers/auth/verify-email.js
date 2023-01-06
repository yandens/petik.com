const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, FE_LINK } = process.env;

const verify = async (req, res, next) => {
  try {
    const { token } = req.query;

    const validUser = jwt.verify(token, JWT_SECRET_KEY);
    if (!validUser) return res.redirect(`${FE_LINK}/auth/verify/failed`);

    await User.update({ status: true }, { where: { email: validUser.email } });

    return res.redirect(`${FE_LINK}/auth/verify/success`);
  } catch (error) {
    if (err.message == 'jwt expired') return res.redirect(`${FE_LINK}/auth/verify/failed`);
    next(error);
  }
};

module.exports = verify;
