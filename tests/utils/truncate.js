const { User, Avatar } = require("../../models");

//
module.exports = {
  user: async () => {
    await User.destroy({ truncate: true, restartIdentity: true });
  },
  avatar: async () => {
    await Avatar.destroy({ truncate: true, restartIdentity: true });
  },
};
