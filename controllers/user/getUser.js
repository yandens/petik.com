const { User, UserBiodata } = require('../../models')

const getUser = async (req, res, next) => {
  const { user_id } = req.params

  const user = await User.findOne({
    where: { id: user_id },
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

module.exports = getUser
