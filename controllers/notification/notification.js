const { Notification } = require("../../models");
const server = require("../../app");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const getNotifications = async (req, res, next) => {
  try {
    const user = req.user;
    io.on("connection", async (socket) => {
      // socket.on("LOAD_NOTIFICATIONS", async (userID) => {
      //   const notifUser = await Notification.findAll({
      //     where: { user_id: userID },
      //   });
      //   io.emit(`NOTIFICATIONS-${userID}`, notifUser);
      // });
      const notifications = await Notification.findAll({
        where: { user_id: user.id },
      });

      io.emit(`NOTIFICATIONS-${user.id}`, notifications);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getNotifications;
