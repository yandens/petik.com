const showBio = require("./showBio");
const createBio = require("./create");
const updateBio = require("./update");
const deleteAccount = require("./delete");
const getAllUser = require("./getAllUser");
const getUser = require("./getUser");
const uploadAvatar = require("./uploadAvatar");
const deleteAvatar = require("./deleteAvatar");

module.exports = {
  deleteAccount,
  getAllUser,
  createBio,
  updateBio,
  getUser,
  showBio,
  uploadAvatar,
  deleteAvatar,
};
