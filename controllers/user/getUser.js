const { User, UserBiodata } = require("../../models");

const getUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOne({
      where: { id: user_id },
      include: [
        {
          model: UserBiodata,
          as: "biodata",
        },
      ],
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found!",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Success get user data!",
      data: {
        id: user.id,
        email: user.email,
        roleId: user.role_id,
        userType: user.user_type,
        status: user.status,
        isActive: user.isActive,
        firstName: user.biodata.firstName,
        lastName: user.biodata.lastName,
        gender: user.biodata.gender,
        phoneNumber: user.biodata.phoneNumber,
        address: user.biodata.address,
        nationality: user.biodata.nationality,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
