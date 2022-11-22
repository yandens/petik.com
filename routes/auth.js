const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const changePassword = require("../controllers/auth/change-password");

module.exports = {
  register,
  login,
  changePassword,
};
