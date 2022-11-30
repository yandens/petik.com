const updateUser = require('./update')
const deleteAccount = require("./delete");
const getAllUser = require("./getAllUser");
const getUser = require('./getUser')

module.exports = {
  deleteAccount,
  getAllUser,
  updateUser,
  getUser
};
