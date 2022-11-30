const showBio = require('./showBio')
const createUser = require('./create')
const updateUser = require('./update')
const deleteAccount = require("./delete");
const getAllUser = require("./getAllUser");
const getUser = require('./getUser')

module.exports = {
  deleteAccount,
  getAllUser,
  createUser,
  updateUser,
  getUser,
  showBio
};
