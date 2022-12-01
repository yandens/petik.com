const { Avatar } = require("../../models");
const imagekit = require("../../utils/media/imageKit");

const uploadAvatar = async (req, res, next) => {
  try {
    // const user = req.user;
    const file = req.file.buffer.toString("base64");
    const uploadedFile = await imagekit.upload({
      file,
      fileName: req.file.originalname,
    });
    const uploaded = await Avatar.create({
      user_id: 1,
      avatar: uploadedFile.url,
    });
    return res.status(200).json({
      status: true,
      message: "file uploaded!",
      data: uploaded,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatar;
