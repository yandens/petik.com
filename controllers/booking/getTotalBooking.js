const { Booking, User, UserBiodata } = require('../../models')

const getTotalBooking = async (req, res, next) => {
  try {
    const { user_id } = req.params

    const totalBooking = await Booking.findAll({
      where: { user_id },
      include: [{
        model: User,
        as: 'user',
        include: [{
          model: UserBiodata,
          as: 'biodata'
        }]
      }]
    })

    if (totalBooking.length <= 0) {
      return res.status(204).json({
        status: false,
        message: 'Never made a booking!',
        data: null
      })
    }

    return res.status(200).json({
      status: true,
      message: 'Success get total booking of user',
      data: {
        userId: user_id,
        name: totalBooking.user.biodata.firstName + ' ' + totalBooking.user.biodata.lastName,
        totalBooking: totalBooking.length
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getTotalBooking
