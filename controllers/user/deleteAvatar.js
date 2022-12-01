const { Avatar } = require("../../models");
const imagekit = require("../../utils/media/imageKit");

const deleteAvatar = async (req, res, next) => {
  try {
    const user = req.user;
    const uploaded = await Avatar.update(
      { avatar: "https://ik.imagekit.io/6v306xm58/user_default.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1669853887793" },
      { where: { user_id: user.id } }
    );
    return res.status(200).json({
      status: true,
      message: "Avatar Deleted!",
      data: uploaded,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteAvatar;
