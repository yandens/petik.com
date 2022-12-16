"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {}
  }
  Notification.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      message: DataTypes.TEXT,
      isRead: DataTypes.BOOLEAN,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
