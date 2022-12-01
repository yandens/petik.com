const { User, UserBiodata } = require('../../models')

const getUser = async (req, res, next) => {
  try {
    const { user_id } = req.params

    const user = await User.findOne({
      where: { id: user_id },
      include: [{
        model: UserBiodata,
        as: "biodata"
      }]
    })

    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'User not found!',
        data: null
      })
    }

    return res.status(200).json({
      status: true,
      message: 'Success get user data!',
      data: user
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getUser
