const { Avatar } = require("../../models");
const imagekit = require("../../utils/media/imageKit");

const uploadAvatar = async (req, res, next) => {
  try {
    const user = req.user;
    const file = req.file.buffer.toString("base64");
    const uploadedFile = await imagekit.upload({
      file,
      fileName: req.file.originalname,
    });
    const uploaded = await Avatar.update(
      { avatar: uploadedFile.url },
      { where: { user_id: user.id } }
    );
    return res.status(200).json({
      status: true,
      message: "Avatar Uploaded!",
      data: uploaded,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatar;
