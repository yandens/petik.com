const { User } = require("../../models");

module.exports = {
  updateUser: async () => {
    await User.update({ status: true }, { where: { id: 1 } });
  },
};
