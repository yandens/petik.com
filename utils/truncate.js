const { User } = require("../models");

module.exports = {
  user: async () => {
    await User.destroy({ truncate: true, restartIdentity: true });
  },
};
