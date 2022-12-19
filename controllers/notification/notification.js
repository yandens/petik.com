const { Notification } = require("../../models");
// const server = require("../../app");

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

const getNotifications = async (req, res, next) => {
  try {
    const user = req.user;
    // io.on("connection", async (socket) => {
    //   // socket.on("LOAD_NOTIFICATIONS", async (userID) => {
    //   //   const notifUser = await Notification.findAll({
    //   //     where: { user_id: userID },
    //   //   });
    //   //   io.emit(`NOTIFICATIONS-${userID}`, notifUser);
    //   // });
    //   const notifications = await Notification.findAll({
    //     where: { user_id: user.id },
    //   });

    //   io.emit(`NOTIFICATIONS-${user.id}`, notifications);
    // });
    const loginNotif = await Notification.findAll({
      where: { user_id: user.id },
    });

    const data = [];
    for (const notif of loginNotif) {
      const dataResponse = {
        title: notif.title,
        message: notif.message,
        date: notif.date,
        time: notif.time,
      };
      data.push(dataResponse);
    }
    if (!loginNotif) {
      return res.status(400).json({
        status: false,
        message: "Empty Notifications",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Success Get Notifications",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getNotifications;
