const login = require("./login");
const register = require("./register");
const changePassword = require("./change-password");
const forgotPassword = require("./forgot-password");
const resetPassword = require("./reset-password");
const verifyEmail = require("./verify-email");

module.exports = {
  login,
  register,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
};