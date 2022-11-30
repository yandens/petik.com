const { User, UserBiodata } = require('../../models')

const showBio = async (req, res, next) => {
  try {
    const user = req.user

    const userBio = await User.findOne({
      where: { id: user.id },
      include: [{
        model: UserBiodata,
        as: "biodata"
      }]
    })

    return res.status(200).json({
      status: true,
      message: 'Success get user data!',
      data: userBio
    })
  } catch (err) {
    next(err)
  }
}

module.exports = showBio
