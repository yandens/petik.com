const { Notification } = require("../../models");
const io = require("../../utils/socket/socket")

const getNotifications = async (req, res, next) => {
  try {
    const user = req.user;

    const userNotif = await Notification.findAll({
      where: { user_id: user.id },
    });

    if (!loginNotif) {
      return res.status(400).json({
        status: false,
        message: "Empty Notifications",
      });
    }

    const data = [];
    for (const notif of userNotif) {
      const dataResponse = {
        title: notif.title,
        message: notif.message,
        date: notif.date.toDateString(),
        time: notif.date.toLocaleTimeString()
      };
      data.push(dataResponse);
    }

    io.emit(`NOTIFICATIONS-${user.id}`, data)

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
