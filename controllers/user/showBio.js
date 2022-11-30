const { User, UserBiodata } = require('../../models')

const showBio = async (req, res, next) => {
  const user_id = req.user

  const user = await User.findOne({
    where: { id: user.id },
    include: [{
      model: UserBiodata,
      as: "biodata"
    }]
  })

  return res.status(200).json({
    status: true,
    message: 'Success get user data!',
    data: user
  })
}

module.exports = showBio
